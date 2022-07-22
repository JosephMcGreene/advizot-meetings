require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 8080;

//=====MIDDLEWARE=====
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

//=====ROUTES=====

//POST Routes
app.post("/postMetric", cors(), (req, res) => {
	console.log(req.body);
});

//GET Routes
if (process.env.NODE_ENV === "production") {
	app.use(express.static("./client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
	});
}

//=====SERVER START=====
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
