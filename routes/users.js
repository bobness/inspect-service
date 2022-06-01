var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

/* GET authenticated user. */
router.get('/', auth, function(req, res, next) {
  const followers = await req.client.query("SELECT * FROM followers WHERE user_id=" + req.user.id).rows;
  const summaries = await req.client.query("SELECT * FROM followers WHERE user_id=" + req.user.id).rows;
  res.send(req.user);
});

/* GET user information by Id. */
router.get('/:user_id', auth, function(req, res, next) {
  const result = req.client.query('SELECT * FROM users id=' + req.params.user_id);
  const user = result.rows[0];
  res.send(user);
});

module.exports = router;
