const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
require("../utils/passportConfig");

authRouter.route("/linkedin").get(passport.authenticate("linkedin"));

authRouter.route("/linkedin/callback").get(
	passport.authenticate("linkedin", {
		successRedirect: "http://localhost:3000/",
		failureRedirect: "/login",
	})
);

module.exports = authRouter;
