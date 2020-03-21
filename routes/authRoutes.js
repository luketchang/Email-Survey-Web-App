const passport = require('passport')

module.exports = (app) => {
  //when /auth/google is run, it sends passport GoogleStrategy info to Google
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //for callback, passport sees that we have authentication code and will
  //handle authentication differently since it knows user has profile already
  app.get(
    '/auth/google/callback',
      passport.authenticate('google')
  );
};
