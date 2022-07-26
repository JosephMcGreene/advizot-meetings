require("dotenv").config();
const format = require("date-fns/format");

let todayDate = format(Date.now(), "MM/dd/yyyy");
coachAccountableURL = "https://www.coachaccountable.com/API/";
const josephCoachID = 14865;
const josephID = 87337;

const postParams = {
	APIID: process.env.COACH_ID,
	APIKey: process.env.COACH_KEY,
	a: "Metric.add",
	ClientID: 87337,
	name: "Joseph McGreene",
	units: "happies",
	startDate: todayDate,
	endDate: todayDate,
	doTarget: false,
	repeatRule: "monthlyDOM",
	setReminders: false,
};
const deleteParams = {
	APIID: process.env.COACH_ID,
	APIKey: process.env.COACH_KEY,
	a: "Metric.delete",
	MetricID: 285626,
};

module.exports = {
	postParams,
	deleteParams,
};
