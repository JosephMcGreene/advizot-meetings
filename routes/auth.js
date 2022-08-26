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

module.exports = authRouter;
