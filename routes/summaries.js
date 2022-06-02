const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

router.get("/", auth, async (req, res, next) => {
  const result = await req.client.query({
    text: `
        select * from summaries limit ${req.query.from || 0}, ${req.query.count || 20}`,
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
    text: `select value from snippets where summary_id = ${summary.id}`,
  });
  const snippets = result2.rows;
  req.client.end();
  return res.json({
    ...summary,
    snippets,
  });
});

router.post("/", (req, res, next) => {
  req.client
    .query({
      text: "insert into summaries (url, title, snippets) values($1::text, $2::text, $3::text, $4::json) returning *",
      values: [
        req.body.summary.url,
        req.body.summary.title,
        req.body.summary.snippets,
      ],
    })
    .then((result) => {
      const newSummary = result.rows[0];
      req.client.end();
      return res.json(newSummary);
    });
});

router.put("/:article_url", (req, res, next) =>
  req.client
    .query({
      text: "update summaries set email = $1::text, url = $2::text, title = $3::text, snippets = $4::json where id=$5::bigint",
      values: [
        req.body.email,
        job.body.summary.url,
        job.body.summary.title,
        job.body.summary.snippets,
        req.body.summary.id,
      ],
    })
    .then(() => {
      req.client.end();
      res.sendStatus(200);
    })
);

module.exports = router;
