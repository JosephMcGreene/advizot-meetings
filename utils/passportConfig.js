require("dotenv").config();
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
			proxy: true,
			scope: ["r_liteprofile"],
			state: true,
		},
		async function (accessToken, refreshToken, profile, done) {
			try {
				const existingUser = await User.findOne({ providerID: profile.id });

				if (existingUser) {
					return done(null, existingUser);
				}

				const newUser = await new User({
					providerID: profile.id,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
				});
				await newUser.save();
				return done(null, newUser);
			} catch (error) {
				console.error(error);
			}
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: "/auth/google/callback",
			scope: "https://www.googleapis.com/auth/userinfo.profile",
		},
		async function (accessToken, refreshToken, profile, done) {
			try {
				const existingUser = await User.findOne({ providerID: profile.id });

				if (existingUser) {
					return done(null, existingUser);
				}

				const newUser = await new User({
					providerID: profile.id,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
				});
				await newUser.save();
				return done(null, newUser);
			} catch (error) {
				console.error(error);
			}
		}
	)
);
