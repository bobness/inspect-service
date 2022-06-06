var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

/* POST comment. */
router.post('/', auth, function(req, res, next) {
  req.client
    .query({
      text: "insert into comments (summary_id, snippet_id, comment, user_id, created_at) values($1::numeric, $2::numeric, $3::text, $4::numeric, $5::date) returning *",
      values: [
        req.body.summary_id,
        req.body.snippet_id,
        req.body.comment,
        req.body.user_id ?? req.user.user_id,
        req.body.created_at ?? new Date(),
      ],
    })
    .then((result) => {
      const newComment = result.rows[0];
      req.client.end();
      return res.json(newComment);
    });
});

/* DELETE comment by Id. */
router.delete('/:comment_id', auth, function(req, res, next) {
  req.client
    .query({
      text: "DELETE FROM comments WHERE id=$1",
      values: [
        req.params.comment_id,
      ],
    })
    .then(() => {
      return res.json(req.params.comment_id);
    });
});

module.exports = router;
