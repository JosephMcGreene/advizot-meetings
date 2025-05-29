import { config } from "dotenv";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
// Internal Modules
import userQueries from "../controllers/users.queries.js";

config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const userID = await userQueries.getOneUserByID(id);
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
        // prettier-ignore
        const existingUser = await userQueries.getOneUser(profile.emails[0].value);

        if (existingUser?.googleID && !existingUser?.linkedinID) {
          const updatedUser = await userQueries.addProviderID(
            existingUser.email,
            "linkedinID",
            profile.id
          );
          return done(null, updatedUser);
        }

        if (existingUser?.linkedinID) return done(null, existingUser);

        const newUser = userQueries.saveNewUser(profile, "linkedinID");
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
        // prettier-ignore
        const existingUser = await userQueries.getOneUser(profile.emails[0].value);

        if (existingUser?.linkedinID && !existingUser?.googleID) {
          const updatedUser = await userQueries.addProviderID(
            existingUser.email,
            "googleID",
            profile.id
          );
          return done(null, updatedUser);
        }

        if (existingUser?.googleID) return done(null, existingUser);

        const newUser = userQueries.saveNewUser(profile, "googleID");
        return done(null, newUser);
      } catch (err) {
        done(err);
        throw err;
      }
    }
  )
);
