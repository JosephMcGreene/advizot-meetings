import { config } from "dotenv";
import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
//Internal Modules
import { createNewUser } from "../lib/helpers.js";
import User from "../models/User.js";

config();

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
      scope: ["r_liteprofile", "r_emailaddress"],
      state: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // TODO Link accounts!!
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });
        // const existingUser = await User.findOne().or([
        //   { email: profile.emails[0].value },
        //   { firstName: profile.name.givenName },
        //   { lastName: profile.name.familyName },
        // ]);

        if (existingUser?.googleID && !existingUser?.linkedinID) {
          const updatedUser = await User.findOneAndUpdate(
            { email: existingUser.email },
            { linkedinID: profile.id },
            { new: true }
          );
          return done(null, updatedUser);
        }

        if (existingUser?.firstName || existingUser?.lastName)
          return done(null, existingUser);

        if (existingUser?.linkedinID) return done(null, existingUser);

        const newUser = await createNewUser(profile, "linkedinID");
        await newUser.save();

        return done(null, newUser);
      } catch (err) {
        done(err);
        throw err;
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
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // TODO Link accounts!!
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });
        // const existingUser = await User.findOne().or([
        //   { email: profile.emails[0].value },
        //   { firstName: profile.name.givenName },
        //   { lastName: profile.name.familyName },
        // ]);

        if (existingUser?.linkedinID && !existingUser?.googleID) {
          const updatedUser = await User.findOneAndUpdate(
            { email: existingUser.email },
            { googleID: profile.id },
            { new: true }
          );
          return done(null, updatedUser);
        }

        if (existingUser?.googleID) return done(null, existingUser);

        const newUser = await createNewUser(profile, "googleID");
        await newUser.save();

        return done(null, newUser);
      } catch (err) {
        done(err);
        throw err;
      }
    }
  )
);
