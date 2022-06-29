var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

/* GET authenticated user. */
router.get("/", auth, async function (req, res, next) {
  try {
    const result = await req.client.query(
      "SElECT * FROM users WHERE id = " + req.authUser.user_id
    );
    const baseUser = result.rows[0];
    const followers = await req.client.query(
      "SELECT * FROM followers WHERE user_id=" + req.authUser.user_id
    );
    const summaries = await req.client.query(
      "SELECT * FROM summaries WHERE user_id=" + req.authUser.user_id
    );
    res.send({
      ...baseUser,
      followers: followers.rows,
      summaries: summaries.rows,
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
