const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

//cookie-session assigns data to req
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())

require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

if(process.env.NODE_ENV === 'production'){
  //express will serve up production assets (e.g. main.js, main.css)
  app.use(express.static('client/build'))

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html '));
  });
  //express will serve up index.html if route isn't recognized

}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
