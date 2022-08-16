const express = require("express");
const Member = require("../models/member");
const Response = require("../models/response");
let dbRouter = express.Router();

dbRouter.route("/members").post(async function (req, res) {
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

dbRouter
	.route("/responses")
	.get(async function (req, res) {
		try {
			const responses = await Response.find();
			res.json(responses);
		} catch (error) {
			console.error(error);
		}
	})
	.post(async function (req, res) {
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
	})
	.delete(async function (req, res) {
		try {
			await Response.deleteMany({ monthlyGoal: /[A-Za-z]/g });
		} catch (error) {
			console.error(error);
		}
		console.log(res.body);
	});

module.exports = dbRouter;
