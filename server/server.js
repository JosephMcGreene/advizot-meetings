require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const dbRouter = require("./routes/db");
const authRouter = require("./routes/auth");

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
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: "SECRET",
	})
);
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, callback) => {
	callback(null, user);
});

passport.deserializeUser((user, callback) => {
	callback(null, user);
});

//=====IN PROD=====
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}
// app.use(express.static(path.join(__dirname, "../client/build")));

//=====MOUNT ROUTES=====
app.use("/db", dbRouter);
app.use("/auth", authRouter);

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//=====SERVER START=====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
