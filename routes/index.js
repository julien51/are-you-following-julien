var express = require("express");
var ethers = require('ethers')
var router = express.Router();
var TWITTER_ID = require('../constants').TWITTER_ID
var WEBSITE = require('../constants').WEBSITE
var NAME = require('../constants').NAME
var lock = require("../utils/lock")
var baseUrl = require("../utils/baseUrl")
var KEY_GRANTER_PRIVATE_KEY = require('../constants').KEY_GRANTER_PRIVATE_KEY
var EXPLORER_TX_BASE = require('../constants').EXPLORER_TX_BASE
var BASE_DURATION_ENGLISH = require('../constants').BASE_DURATION_ENGLISH

var wallet = new ethers.Wallet(KEY_GRANTER_PRIVATE_KEY)

var domain = new URL(baseUrl).host

/**
 * Main route
 */
var baseVars = {
  TWITTER_ID,
  NAME,
  WEBSITE,
  EXPLORER_TX_BASE,
  GRANTER: wallet.address,
  BASE_DURATION_ENGLISH
}

router.get("/", async function (req, res, next) {
  if (!req.user) {
    res.render("index", { user: req.user, ...baseVars });
  } else if (req.user.following && !req.user.wallet) {
    res.render("following", { user: req.user, domain, baseUrl, ...baseVars });
  } else if (req.user.following && req.user.wallet) {
    // Let's see if the user has a membership already?
    const expiration = await lock.keyExpirationFor(req.user.wallet)
    if (expiration * 1000 > new Date().getTime()) {
      res.render("already", { user: req.user, expiration: new
        Date(1000*expiration), ...baseVars });
    } else {
      const tx = await lock.grant(req.user.wallet)
      res.render("done", { user: req.user, tx, ...baseVars });
    }
  } else {
    res.render("notfollowing", { user: req.user, ...baseVars });
  }
});

/** Redirect once the wallet is connected! */
router.get("/wallet-connected", function (req, res, next) {
  if (req.query.code) {
    let buff = Buffer.from(req.query.code, 'base64');
    let text = buff.toString('ascii');
    const x = JSON.parse(text)
    req.user.wallet = ethers.utils.verifyMessage(x.d, x.s)
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
