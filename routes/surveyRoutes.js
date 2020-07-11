const mongoose = require('mongoose');
const _ = require('lodash');
const { Path }  = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');
const Mailer = require('../services/Mailer.js');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

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

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    const events = _.chain(req.body)
      .map(({ email, url }) => {   
        const match = p.test(new URL(url).pathname);
        if(match) {
          return { email: email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('surveyId', 'email')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            'lastResponse': new Date()
          }
        ).exec();
      })
      .value();
      
    console.log(events);
    res.send({});
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback!')
  });
};
