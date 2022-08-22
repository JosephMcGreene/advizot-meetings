require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const session = require("express-session");
const dbRouter = require("./routes/db");
const authRouter = require("./routes/auth");
require("./utils/passportConfig");

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
	cookieSession({
		// cookie expires in 40 days
		maxAge: 1000 * 60 * 60 * 24 * 40,
		keys: [uuidv4()],
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

//=====IN PROD=====
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}
// app.use(express.static(path.join(__dirname, "../client/build")));

//=====MOUNT ROUTES=====
app.use("/db", dbRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
	if (req.user) {
		res.send(req.user);
	} else {
		res.send("No one is logged in!");
	}
});

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//=====SERVER START=====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
