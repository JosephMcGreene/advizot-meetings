require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const userID = await User.findById(id);
	await done(null, userID);
});

passport.use(
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_KEY,
			clientSecret: process.env.LINKEDIN_SECRET,
			callbackURL: "/auth/linkedin/callback",
			scope: ["r_liteprofile"],
			state: true,
		},
		async function (accessToken, refreshToken, profile, done) {
			try {
				const existingUser = await User.findOne({ linkedinID: profile.id });

				if (existingUser) {
					done(null, existingUser);
				} else {
					const newUser = await new User({
						linkedinID: profile.id,
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
					});
					await newUser.save();
					done(null, newUser);
				}
			} catch (error) {
				console.error(error);
			}
		}
	)
);
