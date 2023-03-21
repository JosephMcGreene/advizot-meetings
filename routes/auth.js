const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
//Internal Modules
const { userRoles } = require("../utils/userRoles");
const { generatePasscode } = require("../utils/helpers");
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
authRouter
  .route("/code")
  .get((req, res) => {
    const passcode = generatePasscode();
    res.json({ passcode });
  })
  .post((req, res) => {
    if (req.body.enteredCode === "123456") {
      req.user.hasMeetingCode = true;
      res.json(req.user);
    } else {
      console.log("wrong code!");
    }
  });

module.exports = authRouter;
