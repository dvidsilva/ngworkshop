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

  app.post('/tweet', function (req, res) {
    var tweet;
    if (!req.body.content || !req.body.username) {
      console.log(req.body);
      return res.json({error: 'emptytweet'});
    }
    tweet = new Tweet({ content: req.content, username: req.username });
    tweet.save(function (err, tweet) {
      if (err) {
        return res.json({error: err});
      }
      return res.json({tweet: tweet, saved: true});
    });
  });

  app.get('/tweets', function (req, res) {
    Tweet.find(function (err, tweets) {
      if (err) {
        return res.json({error: err});
      }
      res.json({tweets: tweets});
    });
  });

  app.get('/tweets/:user', function () {

  });
  app.get('/tweet/:id', function () {

  });
};
