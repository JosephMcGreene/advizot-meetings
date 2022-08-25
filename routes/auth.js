const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
require("../utils/passportConfig");

authRouter.route("/linkedin").get(passport.authenticate("linkedin"));
authRouter.route("/linkedin/callback").get(
	passport.authenticate("linkedin", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

authRouter.route("/google").get(passport.authenticate("google"));
authRouter
	.route("/google/callback")
	.get(
		passport.authenticate("google", { failureRedirect: "/login" }),
		(req, res) => {
			res.redirect("/");
		}
	);

authRouter.route("/logout").get((req, res) => {
	req.logout();
	res.redirect("/");
});

authRouter.route("/loggedIn").get((req, res) => {
	if (req.user) {
		return res.send(`${req.user.firstName} ${req.user.lastName} is logged in!`);
	}

	res.send("No one is logged in right now.");
});

module.exports = authRouter;
