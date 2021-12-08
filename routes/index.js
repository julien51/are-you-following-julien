var express = require("express");
var router = express.Router();

const JULIENS_ID = 5381582;

router.get("/", function (req, res, next) {
  const hasUser = !!req?.user;
  if (hasUser && req.user?.id === JULIENS_ID) {
    res.render("julien", { user: req.user });
  }
  if (hasUser) {
    res.render("following", { user: req.user });
  } else {
    res.render("index", { user: req.user });
  }
});

module.exports = router;
