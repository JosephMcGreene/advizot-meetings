require("dotenv").config();
const format = require("date-fns/format");

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

module.exports = {
	postParams,
	deleteParams,
};
