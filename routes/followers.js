var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

/* GET follower for current user. */
router.get('/current', auth, function(req, res, next) {
  req.client
    .query({
      text: "select * from followers where user_id=$1",
      values: [ req.user.user_id ],
    })
    .then((result) => {
      const followers = result.rows;
      req.client.end();
      return res.json(followers);
    });
});

/* POST follower. */
router.post('/', auth, function(req, res, next) {
  req.client
    .query({
      text: "insert into followers (user_id, follower_id, created_at) values($1::numeric, $2::numeric, $3::date) returning *",
      values: [
        req.body.user_id ?? req.user.user_id,
        req.body.follower_id,
        req.body.created_at ?? new Date(),
      ],
    })
    .then((result) => {
      const newFollower = result.rows[0];
      req.client.end();
      return res.json(newFollower);
    });
});

/* DELETE follower by Id. */
router.delete('/:follower_id', auth, function(req, res, next) {
  req.client
    .query({
      text: "DELETE FROM followers WHERE id=$1",
      values: [
        req.params.follower_id,
      ],
    })
    .then(() => {
      return res.json(req.params.follower_id);
    });
});

module.exports = router;
