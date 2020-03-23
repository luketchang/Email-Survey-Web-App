const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const mongoose = require('mongoose');

//load all users in User collection from MongoDB
const User = mongoose.model('users');

//PASSPORT AUTHENTICATION: info after comma returned to us on callback once we have code
passport.use(new GoogleStrategy({
    clientID: keys.GoogleClientID,
    clientSecret: keys.GoogleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({googleID: profile.id}).then((existingUser) => {
        if(existingUser){
          done(null, existingUser);
        } else {
          new User({googleID: profile.id}).save().then((user) => {
            done(null, user);
          })
        }
      })
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
