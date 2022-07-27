require("dotenv").config();
const express = require("express");
const coachRoutes = express.Router();
const axios = require("axios");
const cors = require("cors");
const params = require("./coachParams");

//VARS
const coachAccountableURL = "https://www.coachaccountable.com/API/";
const josephCoachID = process.env.COACH_ID;
const josephID = process.env.CLIENT_ID;

coachRoutes.post("/newMetric", (req, res) => {
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

coachRoutes.delete("/deleteMetric", cors(), (req, res) => {
	axios
		.request({
			method: "post",
			url: coachAccountableURL,
			params: params.deleteParams,
		})
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
});

module.exports = coachRoutes;
