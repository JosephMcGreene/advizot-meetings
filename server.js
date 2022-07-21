require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const publicPath = path.join(__dirname, "client/build/index.html");
//Middleware
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "build")));

//Routes
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.post("/post", cors(), (req, res) => {
	console.log(req.body);
});

//Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
