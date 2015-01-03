var mongoose, Tweet, TweetSchema;

mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log('connected to mongo database');
});


TweetSchema = mongoose.Schema({
    content: String,
    username: String
});

Tweet = mongoose.model('Tweet',TweetSchema);

module.exports = function (app) {
  'use strict';
  app.post('/tweet', function () {

  });
  app.get('/tweets', function () {

  });
  app.get('/tweets/:user', function () {

  });
  app.get('/tweet/:id', function () {

  });
};
