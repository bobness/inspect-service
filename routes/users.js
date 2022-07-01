var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const { getUserData, getSourceData } = require("../middleware/functions");

/* GET authenticated user. */
router.get("/", auth, async function (req, res, next) {
  try {
    const result = await req.client.query(
      "SElECT * FROM users WHERE id = " + req.authUser.user_id
    );
    const baseUser = result.rows[0];
    const result1 = await req.client.query(
      "SELECT * FROM followers WHERE user_id=" + req.authUser.user_id
    );
    const followers = result1.rows;
    await Promise.all(
      followers.map((follower) =>
        getUserData(req, follower.follower_id, "avatar_uri", "username").then(
          ([avatar_uri, username]) => {
            follower.avatar_uri = avatar_uri;
            follower.username = username;
          }
        )
      )
    );
    const result2 = await req.client.query(
      "SELECT * FROM summaries WHERE user_id=" + req.authUser.user_id
    );
    const summaries = result2.rows;
    await Promise.all(
      summaries.map((summary) =>
        getSourceData(req, summary.source_id, "logo_uri").then(([logo_uri]) => {
          summary.logo_uri = logo_uri;
        })
      )
    );
    await Promise.all(
      summaries.map((summary) =>
        getUserData(req, summary.user_id, "avatar_uri").then(
          ([avatar_uri]) => (summary.avatar_uri = avatar_uri)
        )
      )
    );
    res.send({
      ...baseUser,
      followers,
      summaries,
    });
  } catch (err) {
    next(err);
  }
});

/* GET user information by Id. */
router.get("/:user_id", auth, async function (req, res, next) {
  const result = await req.client.query(
    "SELECT * FROM users WHERE id=" + req.params.user_id
  );
  let user = result.rows[0];
  const followers = await req.client.query(
    "SELECT * FROM followers WHERE user_id=" + req.params.user_id
  );
  const summaries = await req.client.query(
    "SELECT * FROM summaries WHERE user_id=" + req.params.user_id
  );
  user.followers = followers.rows;
  user.summaries = summaries.rows;
  res.send(user);
});

/* PUT authenticated user. */
router.put("/", auth, async function (req, res, next) {
  await Promise.all(
    Object.keys(req.body).map(async (attribute) => {
      let value = String(req.body[attribute]);
      if (attribute === "email") {
        value = value.toLowerCase();
      } else if (attribute === "password") {
        value = await bcrypt.hash(value, 10);
      }
      // console.log(`*** updating ${attribute} to ${value}`);
      return req.client.query(
        `UPDATE users SET ${attribute}='${value}'
        WHERE id=${req.authUser.user_id}`
      );
    })
  );
  req.client.end();
  res.sendStatus(200);
});

module.exports = router;
