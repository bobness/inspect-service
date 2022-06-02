const createError = require("http-errors");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res, next) => {
  const result = await req.client.query({
    text: `
        select * from summaries limit ${req.query.from || 0}, ${
      req.query.count || 20
    }`,
  });
  let summaries = result.rows;
  for (let i = 0; i < summaries.length; i++) {
    const result2 = await req.client.query({
      text: `select value from snippets where summary_id = ${summary.id}`,
    });
    summaries[i].snippets = result2.rows;
  }
  req.client.end();
  return res.json(snippets);
});

router.get("/:article_id", async (req, res, next) => {
  const result = await req.client.query({
    text: `
        select * from summaries where id = '${decodeURIComponent(
          req.params.article_id
        )}'
        `,
  });
  const summary = result.rows[0];
  const result2 = await req.client.query({
    text: `select value from snippets where summary_id = ${summary.id}`,
  });
  const snippets = result2.rows;
  const result3 = await req.client.query({
    text: `select value from comments where summary_id = ${summary.id}`,
  });
  const comments = result3.rows;
  const result4 = await req.client.query({
    text: `select value from reactions where summary_id = ${summary.id}`,
  });
  const reactions = result4.rows;
  req.client.end();
  return res.json({
    ...summary,
    snippets,
    comments,
    reactions,
  });
});

// TODO: add email column, then use it below

router.get("/:article_url", async (req, res, next) => {
  const result = await req.client.query({
    text: `
        select * from summaries  where url = '${decodeURIComponent(
          req.params.article_url
        )}'
        `,
  });
  const summary = result.rows[0];
  const result2 = await req.client.query({
    text: "select value from snippets where summary_id = $1::integer",
    values: [summary.id],
  });
  const snippets = result2.rows;
  req.client.end();
  return res.json({
    ...summary,
    snippets,
  });
});

router.post("/", (req, res, next) =>
  req.client
    .query({
      text: "insert into summaries (url, title) values($1::text, $2::text, $3::text) returning *",
      values: [req.body.url, req.body.title],
    })
    .then((result) => {
      const newSummary = result.rows[0];
      return Promise.all(
        req.body.snippets.map((newSnippet) =>
          req.client.query({
            text: "insert into snippets (summary_id, value) values($1::integer, $2::text)",
            values: [newSummary.id, newSnippet.value],
          })
        )
      ).then(() => {
        req.client.end();
        return res.json(newSummary);
      });
    })
);

router.put("/:article_id", (req, res, next) => {
  if (req.params.article_id == req.body.id) {
    return req.client
      .query({
        text: "update summaries set url = $1::text, title = $2::text where id=$3::bigint returning *",
        values: [req.body.url, req.body.title, req.params.article_id],
      })
      .then((result) => {
        const summary = result.rows[0];
        return Promise.all(
          req.body.snippets.map((newSnippet) =>
            req.client.query({
              text: "insert into snippets (summary_id, value) values ($1::integer, $2::text) on conflict do nothing",
              values: [summary.id, newSnippet.value],
            })
          )
        ).then(() => {
          req.client.end();
          res.sendStatus(200);
        });
      });
  } else {
    next(createError(400, `${req.params.article_id} != ${req.body.id}`));
  }
});

module.exports = router;
