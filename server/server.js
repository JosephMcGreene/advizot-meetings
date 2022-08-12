require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mongoRoutes = require("./routes/mongoRoutes");

//=====MIDDLEWARE=====
app.use(
	express.urlencoded({
		extended: false,
	})
);

app.use(express.json());

//=====ROUTES=====

//To serve in prod
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.use(mongoRoutes);

//=====SERVER START=====
const PORT = process.env.PORT || 8080;
app.listen(PORT, async function () {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => {
			console.log("Connected to MongoDB!");
		})
		.catch((error) => console.error(error));

	console.log(`Server is listening at http://localhost:${PORT}`);
});
