var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '395120958326-fdbvhe69fci25b9hg55ein79b1barn9l.apps.googleusercontent.com',
      clientSecret: 'UbA7qJ_NRNQYN2_AWoalDfF3',
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function (token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  )
);
