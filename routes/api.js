const express = require("express");
const apiRouter = express.Router();
const passport = require("passport");

apiRouter.route("/logout").get((req, res) => {
	req.logout();
	res.redirect("/");
});

apiRouter.route("/current_user").get((req, res) => {
	res.json(req.user);
});

apiRouter.route("/loggedIn").get((req, res) => {
	if (req.user) {
		return res.send(`${req.user.firstName} ${req.user.lastName} is logged in!`);
	}

	res.send("No one is logged in right now.");
});

module.exports = apiRouter;
