require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoRoutes = require("./routes/mongoRoutes");

//=====MIDDLEWARE=====
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

//=====ROUTES=====
app.use(mongoRoutes);

//To serve in prod
if (process.env.NODE_ENV === "production") {
	app.use(express.static("./client/build"));
	app.get("*", cors(), (req, res) => {
		res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
	});
}

//=====SERVER START=====
app.listen(process.env.PORT || 8080, function () {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => {
			console.log("Connected to MongoDB!");
		})
		.catch((error) => console.error(error));

	console.log(
		`Server is listening at http://localhost:${process.env.PORT || 8080}`
	);
});
