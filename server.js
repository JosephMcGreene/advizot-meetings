require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

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

//Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
