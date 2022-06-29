const createError = require("http-errors");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const imageTo64 = async (url) => {
  const blob = await fetch(url).then((response) => response.blob());
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

router.get("/", auth, async (req, res, next) => {
  const thisId = req.authUser?.user_id ?? 1;
  const result = await req.client.query({
    text: `select user_id from followers where follower_id = ${thisId}`,
  });
  const newIds = result.rows.map((row) => row.user_id);
  const userIds = [thisId, ...newIds].join(",");
  const result1 = await req.client.query({
    text: `
        select * from summaries where user_id in (${userIds}) limit ${
      req.query.count || 20
    } offset ${req.query.from || 0}`,
  });
  let summaries = await Promise.all(
    result1.rows.map((row) => (row.avatar = imageTo64(row.avatar_url)))
  );
  await Promise.all(
    summaries.map((summary) =>
      req.client
        .query({
          text: `select * from snippets where summary_id = ${summary.id}`,
        })
        .then((result) => {
          summary.snippets = result.rows;
        })
    )
  );
  req.client.end();
  return res.json(summaries);
});

// FIXME: invalid input syntax for type integer: "https://www.npr.org/2022/05/18/1099733752/famine-africa-ukraine-invasion-drought"
router.post("/", (req, res, next) => {
  console.log("*** POSTing...", req.body);
  req.client
    .query({
      text: "insert into summaries (url, title) values($1::text, $2::text) returning *",
      values: [req.body.url, req.body.title],
    })
    .then((result) => {
      const newSummary = result.rows[0];
      console.log("inserted summary; not inserting snippets");
      console.log(req.body);
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
    });
});

router.get("/id/:article_id", async (req, res, next) => {
  const result = await req.client.query({
    text: `
        select * from summaries where id = '${decodeURIComponent(
          req.params.article_id
        )}'
        `,
  });
  const summary = result.rows[0];
  const result2 = await req.client.query({
    text: `select * from snippets where summary_id = ${summary.id}`,
  });
  const snippets = result2.rows;
  const result3 = await req.client.query({
    text: `select * from comments where summary_id = ${summary.id}`,
  });
  const comments = result3.rows;
  const result4 = await req.client.query({
    text: `select * from reactions where summary_id = ${summary.id}`,
  });
  const reactions = result4.rows;

  const authData = await req.client.query({
    text: `select * from users where id = ${summary.user_id}`,
  });
  let author = null;
  if (authData && authData.rows) {
    author = authData.rows[0];
  }
  req.client.end();
  return res.json({
    ...summary,
    snippets,
    comments,
    reactions,
    author,
  });
});

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
