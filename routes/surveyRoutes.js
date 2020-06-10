const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');
const Mailer = require('../services/Mailer.js');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {title, subject, body, recipients} = req.body;

    const newSurvey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map(email => {return ({ email: email.trim() })}),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

    try {
      await mailer.send();
      await newSurvey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch(error){
      res.status(422).send(error);
    }
  });

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your feedback!')
  });
};
