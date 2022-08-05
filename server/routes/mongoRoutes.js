const cors = require("cors");
const express = require("express");
const Member = require("../models/member");
const mongoRoutes = express.Router();

mongoRoutes.post("/newUser", cors(), async function (req, res) {
	// try {
	// 	const newMember = new Member({
	// 		firstName: req.body.firstName,
	// 		lastName: req.body.lastName,
	// 		coachID: req.body.coachID,
	// 	});
	// 	await newMember.save();
	// 	await res.json(newMember);
	// } catch (error) {
	// 	console.error(error);
	// }
	console.log(req.body);
});

module.exports = mongoRoutes;
