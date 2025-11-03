import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js"; 
import dotenv from "dotenv";

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value.toLowerCase();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: profile.displayName,
        email,
        googleId: profile.id,
        provider: "google",
        role: "User"
      });
    } else if (!user.googleId) {
      user.googleId = profile.id;
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
