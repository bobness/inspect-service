var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require('bcryptjs');

/* GET authenticated user. */
router.get('/', auth, async function (req, res, next) {
  const followers = await req.client.query("SELECT * FROM followers WHERE user_id=" + req.user.user_id);
  const summaries = await req.client.query("SELECT * FROM summaries WHERE user_id=" + req.user.user_id);
  req.user.followers = followers.rows;
  req.user.summaries = summaries.rows;
  res.send(req.user);
});

/* GET user information by Id. */
router.get('/:user_id', auth, async function (req, res, next) {
  const result = await req.client.query('SELECT * FROM users WHERE id=' + req.params.user_id);
  let user = result.rows[0];
  const followers = await req.client.query("SELECT * FROM followers WHERE user_id=" + req.params.user_id);
  const summaries = await req.client.query("SELECT * FROM summaries WHERE user_id=" + req.params.user_id);
  user.followers = followers.rows;
  user.summaries = summaries.rows;
  res.send(user);
});

/* PUT authenticated user. */
router.put('/', auth, async function (req, res, next) {
  // Get user input
  const { username, email, password } = req.body;
  encryptedPassword = await bcrypt.hash(password, 10);
  // Create user in our database
  await req.client.query("UPDATE users SET username='" + username + "', email='" + email.toLowerCase() + "', password='" + encryptedPassword + "' WHERE id=" + req.user.user_id);
  const followers = await req.client.query("SELECT * FROM followers WHERE user_id=" + req.user.user_id);
  const summaries = await req.client.query("SELECT * FROM summaries WHERE user_id=" + req.user.user_id);
  req.user.followers = followers.rows;
  req.user.summaries = summaries.rows;
  res.send(req.user);
});

module.exports = router;
