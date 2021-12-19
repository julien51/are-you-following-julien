var express = require("express");
var ethers = require('ethers')
var router = express.Router();
var JULIENS_ID = require('../constants').JULIENS_ID
var lock = require("../utils/lock")

/**
 * Main route
 */
router.get("/", async function (req, res, next) {
  if (!req.user) {
    res.render("index", { user: req.user });
  } else if (req.user.following && !req.user.wallet) {
    res.render("following", { user: req.user });
  } else if (req.user.following && req.user.wallet) {
    // Let's see if the user has a membership already?
    const expiration = await lock.keyExpirationFor(req.user.wallet)
    if (expiration * 1000 > new Date().getTime()) {
      res.render("already", { user: req.user, expiration: new
        Date(1000*expiration) });
    } else {
      await lock.grant(req.user.wallet)
      res.render("done", { user: req.user });
    }
  } else {
    res.render("notfollowing", { user: req.user });
  }
});

/** Redirect once the wallet is connected! */
router.get("/wallet-connected", function (req, res, next) {
  let buff = Buffer.from(req.query.code, 'base64');
  let text = buff.toString('ascii');
  const x = JSON.parse(text)
  req.user.wallet = ethers.utils.verifyMessage(x.d, x.s)
  res.redirect("/");
});

module.exports = router;
