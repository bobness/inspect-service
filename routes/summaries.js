const express = require("express");
const router = express.Router();

router.get("/:user_id", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/:user_id/new", (req, res, next) => {
  res.send("respond with a resource");
});

module.exports = router;
