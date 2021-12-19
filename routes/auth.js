var express = require("express");
var passport = require("passport");
var Twit = require("twit");
var JULIENS_ID = require('../constants').JULIENS_ID


var router = express.Router();

// Twitter auth route!
router.get("/login/federated/twitter.com", passport.authenticate("twitter"));

// When
router.get(
  "/oauth/callback/twitter.com",
  passport.authenticate("twitter", {
    assignProperty: "federatedUser",
    failureRedirect: "/",
  }),
  function (req, res, next) {
    var T = new Twit({
      consumer_key: process.env["TWITTER_CONSUMER_KEY"], //get this from developer.twitter.com where your app info is
      consumer_secret: process.env["TWITTER_CONSUMER_SECRET"], //get this from developer.twitter.com where your app info is
      access_token: req.federatedUser.token,
      access_token_secret: req.federatedUser.tokenSecret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    // We need the list of people that this current user follows
    T.get(
      "friends/ids",
      { screen_name: req.federatedUser.username },
      function (err, data, response) {

        var user = {
          id: req.federatedUser.id,
          username: req.federatedUser.username,
          displayName: req.federatedUser.displayName,
          following: data?.ids?.includes(JULIENS_ID),
        };

        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      }
    );
  }
);

// LOG OUT!
router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
