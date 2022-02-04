var express = require("express");
var passport = require("passport");
var Twit = require("twit");
var TWITTER_CONSUMER_KEY = require("../constants").TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = require("../constants").TWITTER_CONSUMER_SECRET;
var TWITTER_ID = require("../constants").TWITTER_ID;

var router = express.Router();

// Twitter auth route!
router.get("/login/federated/twitter.com", passport.authenticate("twitter"));

// When
router.get(
  "/oauth/callback/twitter.com",
  passport.authenticate("twitter", {}),
  function (req, res, next) {
    var T = new Twit({
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      access_token: req.user.token,
      access_token_secret: req.user.tokenSecret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    // We need the list of people that this current user follows
    T.get(
      "friendships/lookup",
      { user_id: [TWITTER_ID] },
      function (err, data, response) {
        var user = {
          id: req.user.id,
          username: req.user.username,
          displayName: req.user.displayName,
          following: data[0].connections.indexOf("following") > -1,
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
