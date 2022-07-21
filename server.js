require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 8080;

//Middleware
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

//Routes
app.post("/post", cors(), (req, res) => {
	console.log(req.body);
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "./client/build")));
	app.get("*", (req, res) => {
		req.sendFile(path.join(__dirname, "./client/build/index.html"));
	});
}

//Server Start
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
