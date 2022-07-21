require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const publicPath = path.join(__dirname, "../meeting-sign-in", "public");

//Middleware
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());
app.use(express.static(publicPath));

//Routes
app.get("*", (req, res) => {
	res.sendFile(path.join(publicPath, "index.html"));
});

app.post("/post", cors(), (req, res) => {
	console.log(req.body);
	console.log(res.body);
});

//Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
