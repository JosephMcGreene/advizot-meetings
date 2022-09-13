const express = require("express");
const Response = require("../models/Response");
const dbRouter = express.Router();

dbRouter
	.route("/responses")
	// The only time a user needs to GET info is when they need all of it:
	.get(async function (req, res) {
		try {
			const responses = await Response.find();
			res.json(responses);
		} catch (error) {
			console.error(error);
		}
	})
	//Used to post both new responses and edit existing responses if there is already one in the db with a matching _id
	.post(async function (req, res) {
		try {
			if (req.body._id) {
				await Response.deleteOne({ _id: req.body._id });
			}

			const newUserResponse = new Response({
				userName: req.body.userName,
				business: req.body.business,
				personal: req.body.personal,
				relationships: req.body.relationships,
				monthlyIssue: req.body.monthlyIssue,
				priority: req.body.priority,
				monthlyGoal: req.body.monthlyGoal,
				date: req.body.date,
			});
			await newUserResponse.save();

			res.json(newUserResponse);
		} catch (error) {
			console.error(error);
		}
	})
	.delete(async function (req, res) {
		try {
			const deletionRes = await Response.deleteOne({ _id: req.body._id });
			res.json(deletionRes);
		} catch (error) {
			console.error(error);
		}
	});

module.exports = dbRouter;
