require("dotenv").config();
const express = require("express");
const coachRouter = express.Router();
const axios = require("axios");
const cors = require("cors");
const format = require("date-fns/format");

const coachAccountableURL = "https://www.coachaccountable.com/API/";
let todayDate = format(Date.now(), "MM/dd/yyyy");

const postParams = {
	APIID: process.env.COACH_APIID,
	APIKey: process.env.COACH_KEY,
	a: "Metric.add",
	ClientID: process.env.CLIENT_ID,
	name: "Joseph McGreene",
	units: "happies",
	startDate: todayDate,
	endDate: todayDate,
	doTarget: false,
	repeatRule: "monthlyDOM",
	setReminders: false,
};
const deleteParams = {
	APIID: process.env.COACH_APIID,
	APIKey: process.env.COACH_KEY,
	a: "Metric.delete",
	MetricID: 285626,
};

//VARS
const josephCoachID = process.env.COACH_ID;
const josephID = process.env.CLIENT_ID;

coachRouter.post("/newMetric", (req, res) => {
	// axios
	// 	.request({
	// 		method: "post",
	// 		url: coachAccountableURL,
	// 		params: params.postParams,
	// 	})
	// 	.then((response) => console.log(response))
	// 	.catch((error) => console.error(error));
	console.log("Got it!");
});

coachRouter.delete("/deleteMetric", cors(), (req, res) => {
	axios
		.request({
			method: "post",
			url: coachAccountableURL,
			params: params.deleteParams,
		})
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
});

module.exports = coachRouter;
