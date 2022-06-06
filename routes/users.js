var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

/* GET authenticated user. */
router.get('/', auth, async function(req, res, next) {
  const followers = await req.client.query("SELECT * FROM followers WHERE user_id=" + req.user.user_id);
  const summaries = await req.client.query("SELECT * FROM summaries WHERE user_id=" + req.user.user_id);
  req.user.followers = followers.rows;
  req.user.summaries = summaries.rows;
  res.send(req.user);
});

/* GET user information by Id. */
router.get('/:user_id', auth, async function(req, res, next) {
  const result = req.client.query('SELECT * FROM users id=' + req.params.user_id);
  let user = result.rows[0];
  const followers = await req.client.query("SELECT * FROM followers WHERE user_id=" + req.params.user_id);
  const summaries = await req.client.query("SELECT * FROM summaries WHERE user_id=" + req.params.user_id);
  user.followers = followers.rows;
  user.summaries = summaries.rows;
  res.send(user);
});

module.exports = router;
