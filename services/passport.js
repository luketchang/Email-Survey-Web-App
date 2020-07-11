const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//load all users in User collection from MongoDB
const User = mongoose.model('users');

//PASSPORT AUTHENTICATION: info after comma returned to us on callback once we have code
passport.use(new GoogleStrategy({
    clientID: keys.GoogleClientID,
    clientSecret: keys.GoogleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleID: profile.id});
      if(existingUser){
        return done(null, existingUser);
      }
      const newUser = await User({googleID: profile.id}).save();
      done(null, newUser);
    }
  )
);

//SERIALIZE USER: turn user model instance into user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//DESERIALIZE USER: turn user id back into model instance
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});
