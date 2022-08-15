require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dbRoutes = require("./routes/db");

//=====CONNECT MONGODB=====
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB!");
	})
	.catch((error) => console.error(error));

//=====MIDDLEWARE=====
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	next();
});

//=====TO SERVE=====
// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static("client/build"));
// }
app.use(express.static(path.join(__dirname, "/views/")));

//=====MOUNT ROUTES=====
app.use("/db", dbRoutes);

app.get("*", async function (req, res) {
	res.sendFile(path.join(__dirname, "/views/", "index.html"));
});

//=====SERVER START=====
const PORT = process.env.PORT || 8080;
app.listen(PORT, async function () {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
