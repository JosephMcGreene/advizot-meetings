require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const dbo = require("./db/conn");
const coachRoutes = require("./routes/coachAccountableRoutes");

//=====MIDDLEWARE=====
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.use("/newMetric", coachRoutes);
app.use("/deleteMetric", coachRoutes);

//=====ROUTES TO COACH ACCOUNTABLE=====

if (process.env.NODE_ENV === "production") {
	app.use(express.static("./client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
	});
}

//=====SERVER START=====
app.listen(PORT, () => {
	dbo.connectToServer((error) => {
		if (error) console.log(error);
		console.log("Connected to MongoDB!");
	});
	console.log(`Server is listening at http://localhost:${PORT}`);
});
