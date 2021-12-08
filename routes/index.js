var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const hasUser = !!req?.user;
  if (hasUser) {
    res.render("following", { user: req.user });
  } else {
    res.render("index", { user: req.user });
  }
});

module.exports = router;
