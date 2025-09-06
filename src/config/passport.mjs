import "dotenv/config";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/UserModel.mjs";

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) =>
  done(null, await User.findById(id))
);

// Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/oauth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        providerId: profile.id,
        provider: "google",
      });
      if (!user)
        user = await User.create({
          provider: "google",
          providerId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0].value,
        });
      done(null, user);
    }
  )
);

// GitHub
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       let user = await User.findOne({
//         providerId: profile.id,
//         provider: "github",
//       });
//       if (!user)
//         user = await User.create({
//           provider: "github",
//           providerId: profile.id,
//           email: profile.emails[0].value,
//           name: profile.displayName || profile.username,
//           avatar: profile.photos[0].value,
//         });
//       done(null, user);
//     }
//   )
// );

export default passport;
