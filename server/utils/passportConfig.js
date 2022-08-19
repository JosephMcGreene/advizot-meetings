require("dotenv").config();
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

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
			console.log("ACCESS: " + accessToken);
			console.log("REFRESH: " + refreshToken);
			console.log("PROFILE ID: " + profile.id);
			// return done(null, profile);
		}
	)
);
