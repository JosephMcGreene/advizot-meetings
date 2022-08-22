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
	// For now, deletes *ALL* db entries. Will later only delete individual entries
	.delete(async function (req, res) {
		try {
			const deleteRes = await Response.deleteMany({ monthlyGoal: /[A-Za-z]/g });
			await res.json(deleteRes);
			console.log("Deleted!");
		} catch (error) {
			console.error(error);
		}
	});

module.exports = dbRouter;
