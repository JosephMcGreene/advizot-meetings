const express = require("express");
const coachRoutes = express.Router();
const axios = require("axios");
const cors = require("cors");
const params = require("./params");

//VARS
const coachAccountableURL = "https://www.coachaccountable.com/API/";
const josephCoachID = 14865;
const josephID = 87337;

coachRoutes.post("/newMetric", cors(), (req, res) => {
	axios
		.request({
			method: "post",
			url: coachAccountableURL,
			params: params.postParams,
		})
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
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
