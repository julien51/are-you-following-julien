var express = require("express");
var passport = require("passport");

var router = express.Router();
const JULIENS_ID = 5381582;

router.get("/login/federated/twitter.com", passport.authenticate("twitter"));

router.get(
  "/oauth/callback/twitter.com",
  passport.authenticate("twitter", {
    assignProperty: "federatedUser",
    failureRedirect: "/",
  }),
  function (req, res, next) {
    var Twit = require("twit");

    var T = new Twit({
      consumer_key: process.env["TWITTER_CONSUMER_KEY"], //get this from developer.twitter.com where your app info is
      consumer_secret: process.env["TWITTER_CONSUMER_SECRET"], //get this from developer.twitter.com where your app info is
      access_token: req.federatedUser.token,
      access_token_secret: req.federatedUser.tokenSecret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    T.get(
      "followers/ids",
      { screen_name: req.federatedUser.username },
      function (err, data, response) {
        var followsJulien = false;
        if (data.ids?.length) followsJulien = data?.ids?.includes(JULIENS_ID);

        var user = {
          id: req.federatedUser.id,
          username: req.federatedUser.username,
          displayName: req.federatedUser.displayName,
          following: followsJulien,
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

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
