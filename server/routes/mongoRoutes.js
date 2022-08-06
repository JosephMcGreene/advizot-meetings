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
			response: {
				businessHealth: req.body.business,
				personalHealth: req.body.personal,
				relationshipHealth: req.body.relationships,
				monthlyIssue: req.body.monthlyIssue,
				priority: req.body.priority,
				monthlyGoal: req.body.monthlyGoal,
			},
		});
		await newMember.save();
		await res.json(newMember);
	} catch (error) {
		console.error(error);
	}
	console.log(req.body);
});

mongoRoutes.post("/newResponse", cors(), async function (req, res) {
	try {
		const newResponse = new Response({
			businessHealth: req.body.businessHealth,
			personalHealth: req.body.personalHealth,
			relationshipHealth: req.body.relationshipHealth,
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
		const members = await Member.find();
		res.json(members);
	} catch (error) {
		console.error(error);
	}
});

module.exports = mongoRoutes;
