const cors = require("cors");
const express = require("express");
const Member = require("../models/member");
const Response = require("../models/response");
const mongoRoutes = express.Router();

mongoRoutes.post("/newUser", cors(), async function (req, res) {
	try {
		const newMember = new Member({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			coachID: req.body.coachID,
		});
		await newMember.save();
		await res.json(newMember);
	} catch (error) {
		console.error(error);
	}
});

mongoRoutes.post("/newResponse", cors(), async function (req, res) {
	try {
		const newResponse = new Response({
			business: req.body.business,
			personal: req.body.personal,
			relationships: req.body.relationships,
			monthlyIssue: req.body.monthlyIssue,
			priority: req.body.priority,
			monthlyGoal: req.body.monthlyGoal,
		});
		await newResponse.save();
		await res.json(newResponse);
	} catch (error) {
		console.error(error);
	}
});

mongoRoutes.get("/getResponses", cors(), async function (req, res) {
	try {
		const responses = await Response.find();
		res.json(responses);
	} catch (error) {
		console.error(error);
	}
});

module.exports = mongoRoutes;
