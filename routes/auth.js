const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
require("../utils/passportConfig");

//Passport Strategies
authRouter.route("/linkedin").get(passport.authenticate("linkedin"));
authRouter.route("/linkedin/callback").get(
	passport.authenticate("linkedin", {
		successRedirect: "/",
		failureRedirect: "/",
	})
);

authRouter.route("/google").get(passport.authenticate("google"));
authRouter
	.route("/google/callback")
	.get(
		passport.authenticate("google", { failureRedirect: "/" }),
		(req, res) => {
			res.redirect("/");
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

module.exports = authRouter;
