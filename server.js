require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const passport = require("passport");
//Internal Modules
const dbRouter = require("./routes/db");
const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
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
		// cookie expires in 14 days
		maxAge: 1000 * 60 * 60 * 24 * 14,
		keys: [uuidv4()],
	})
);

app.use(
	cors({
		origin: ["http://localhost:3000", "https://advizot-meetings.herokuapp.com"],
		credentials: true,
	})
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//=====IN PROD=====
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/build")));
}

//=====MOUNT ROUTES=====
app.use("/db", dbRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

//=====SERVER START=====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
