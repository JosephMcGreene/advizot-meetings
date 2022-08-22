require("dotenv").config();
const { default: mongoose } = require("mongoose");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/User");

passport.use(
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_KEY,
			clientSecret: process.env.LINKEDIN_SECRET,
			callbackURL: "/auth/linkedin/callback",
			scope: ["r_liteprofile"],
			state: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(profile.id);
			try {
				const newUser = await new User({
					firstName: profile.givenName,
					lastName: profile.familyName,
					linkedinID: profile.id,
				});
				await newUser.save();
				await res.json(newUser);
			} catch (error) {
				console.error(error);
			}
		}
	)
);
