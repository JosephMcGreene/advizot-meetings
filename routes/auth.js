import { Router } from "express";
import passport from "passport";
import "../lib/passportConfig.js";

const authRouter = Router();

// Passport Strategies, since passport.js is the controller
authRouter.route("/linkedin").get(passport.authenticate("linkedin"));
authRouter.route("/linkedin/callback").get(
  passport.authenticate("linkedin", {
    successRedirect: "/handleRoomCode",
    failureRedirect: "/",
  })
);

authRouter.route("/google").get(passport.authenticate("google"));
authRouter
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/handleRoomCode");
    }
  );

// Logout & Current User
authRouter.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/");
});

authRouter.route("/current_user").get((req, res) => {
  res.json(req.user);
});

export default authRouter;
