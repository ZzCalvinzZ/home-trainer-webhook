var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/", function(req, res, next) {
  res.json({ welcomeMessage: "hi!" });
});

module.exports = router;
