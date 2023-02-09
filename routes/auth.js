const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
require("../utils/passportConfig");

//Passport Strategies
authRouter.route("/linkedin").get(passport.authenticate("linkedin"));
authRouter.route("/linkedin/callback").get(
  passport.authenticate("linkedin", {
    successRedirect: "/meeting",
    failureRedirect: "/",
  })
);

authRouter.route("/google").get(passport.authenticate("google"));
authRouter
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/meeting");
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
    req.user.hasMeetingCode = true;
    console.log(req.user);
    res.json(req.user);
  } else {
    console.log("incorrect Code");
  }
});

module.exports = authRouter;
