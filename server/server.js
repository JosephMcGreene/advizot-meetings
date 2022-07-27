require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const coachRoutes = require("./routes/coachRoutes");

//=====MIDDLEWARE=====
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

// app.use("/newMetric", coachRoutes);
// app.use("/deleteMetric", coachRoutes);

app.post("/newMetric", cors(), (req, res) => {
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
app.delete("/deleteMetric", cors(), (req, res) => {
	// axios
	// 	.request({
	// 		method: "post",
	// 		url: coachAccountableURL,
	// 		params: params.deleteParams,
	// 	})
	// 	.then((response) => console.log(response))
	// 	.catch((error) => console.error(error));
	console.log("Will Delete!");
});

//=====Connect MongoDB=====
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB!");
	})
	.catch((error) => console.error(error));

//To serve in prod
if (process.env.NODE_ENV === "production") {
	app.use(express.static("./client/build"));
	app.get("*", cors(), (req, res) => {
		res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
	});
}

//=====SERVER START=====
app.listen(process.env.PORT || 8080, () => {
	console.log(
		`Server is listening at http://localhost:${process.env.PORT || 8080}`
	);
});
