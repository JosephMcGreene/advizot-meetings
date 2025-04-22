import { config } from "dotenv";
import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { v4 as uuidv4 } from "uuid";
//Internal Modules
import User from "../models/User.js";
import { userRoles, groups } from "./userRoles.js";
import { addProviderID, getOneUser } from "../controllers/users.queries.js";

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
        const existingUser = await getOneUser(profile.emails[0].value);

        if (existingUser?.googleID && !existingUser?.linkedinID) {
          const updatedUser = await addProviderID(
            existingUser.email,
            "linkedinID",
            profile.id
          );
          return done(null, updatedUser);
        }

        if (existingUser?.linkedinID) return done(null, existingUser);

        const newUser = await new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          linkedinID: profile.id,
          email: profile.emails[0].value,
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
        const existingUser = await getOneUser(profile.emails[0].value);

        if (existingUser?.linkedinID && !existingUser?.googleID) {
          const updatedUser = await addProviderID(
            existingUser.email,
            "googleID",
            profile.id
          );
          return done(null, updatedUser);
        }

        if (existingUser?.googleID) return done(null, existingUser);

        const newUser = await new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          googleID: profile.id,
          email: profile.emails[0].value,
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
