require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const dbRoutes = require("./routes/db");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

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

passport.use(
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_KEY,
			clientSecret: process.env.LINKEDIN_SECRET,
			callbackURL: "/auth/linkedin/callback",
			scope: ["r_liteprofile"],
			state: true,
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(profile.id);
			return done(null, profile);
		}
	)
);

passport.serializeUser((user, callback) => {
	callback(null, user);
});

passport.deserializeUser((user, callback) => {
	callback(null, user);
});

//=====TO SERVE=====
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}
// app.use(express.static(path.join(__dirname, "../client/build")));

//=====MOUNT ROUTES=====
app.use("/db", dbRoutes);

app.get("/auth/linkedin", passport.authenticate("linkedin"));

app.get(
	"/auth/linkedin/callback",
	passport.authenticate("linkedin", {
		successRedirect: "/protected",
		failureRedirect: "/login",
	})
);

app.get("/protected", (req, res) => {
	res.send("Oh Hai!");
});

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//=====SERVER START=====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
