const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const { userRoles, generateMeetingCode } = require("../utils/helpers");
require("../utils/passportConfig");

//Passport Strategies
authRouter.route("/linkedin").get(passport.authenticate("linkedin"));
authRouter.route("/linkedin/callback").get(
  passport.authenticate("linkedin", {
    successRedirect: "/meetingCode",
    failureRedirect: "/",
  })
);

authRouter.route("/google").get(passport.authenticate("google"));
authRouter
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/meetingCode");
    }
  );

//Logout & Current User
authRouter.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/");
});

authRouter.route("/current_user").get((req, res) => {
  res.json(req.user);
});

//Meeting Access Passcode
//TODO Replace dummy code with a randomly generated one
authRouter.route("/code").post((req, res) => {
  if (req.body.enteredCode === "123456") {
    res.redirect("/meeting");
  } else {
    res.redirect("/meeting");
  }
});

module.exports = authRouter;
