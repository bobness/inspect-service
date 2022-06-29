var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");

/* POST reaction. */
router.post("/", auth, function (req, res, next) {
  req.client
    .query({
      text: "insert into reactions (summary_id, snippet_id, reaction, user_id, created_at) values($1::numeric, $2::numeric, $3::text, $4::numeric, $5::date) returning *",
      values: [
        req.body.summary_id,
        req.body.snippet_id,
        req.body.reaction,
        req.body.user_id ?? req.authUser.user_id,
        req.body.created_at ?? new Date(),
      ],
    })
    .then((result) => {
      const newReaction = result.rows[0];
      req.client.end();
      return res.json(newReaction);
    });
});

/* DELETE reaction by Id. */
router.delete("/:reaction_id", auth, function (req, res, next) {
  req.client
    .query({
      text: "DELETE FROM reactions WHERE id=$1",
      values: [req.params.reaction_id],
    })
    .then(() => {
      return res.json(req.params.reaction_id);
    });
});

module.exports = router;
