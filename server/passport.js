const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const {
  findOrCreateGoogleUser,
  findUserById,
} = require("./users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google authentication successful for:", profile.displayName);

        const user = await findOrCreateGoogleUser(profile);

        return done(null, user);
      } catch (error) {
        console.error("Passport Google Strategy error:", error);
        return done(error);
      }
    }
  )
);

// Serialize user ID into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session using ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user || false);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
