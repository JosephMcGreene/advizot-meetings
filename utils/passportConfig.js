import { config } from "dotenv";
import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { uuid } from "uuidv4";
//Internal Modules
import User from "../models/User.js";
import { userRoles, groups } from "./userRoles.js";

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
        const existingUser = await User.findOne({ providerID: profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = await new User({
          providerID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          linkedin_email: profile.emails[0].value,
          photo: profile.photos[0].value,
          advizotID: uuid(),
          role: userRoles.MEMBER,
          group: groups.GUEST,
          hasMeetingCode: false,
        });
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
        const existingUser = await User.findOne({ providerID: profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = await new User({
          providerID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          google_email: profile.emails[0].value,
          photo: profile.photos[0].value,
          advizotID: uuidv4(),
          role: userRoles.MEMBER,
          group: groups.GUEST,
          hasMeetingCode: false,
        });
        await newUser.save();

        return done(null, newUser);
      } catch (err) {
        done(err);
        throw err;
      }
    }
  )
);
