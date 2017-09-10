console.log('the bot is running');

var Twit = require('twit');
var keys = require('./keys');

var T = new Twit(keys);

function searching() {
  var search = {
    q: 'String to search for',
    count: 10 // how many tweets to retrive results
  };

  function getIt(err, data, response) {
    console.log('searching for tweets');
    var tweets = data.statuses;
    for(var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    }
  };

  T.get('search/tweets', search, getIt);
}

// get user timeline tweets
function timeline() {
  var timeline = {
    include_rts: 1, // 1 (true) to show retweets
    count: 20 // number of tweets to display
    //screen_name: ''
  };

  function getTimeline(err, data, response) {
    console.log('updating timeline');
    var numOfTweets = data[0].user.statuses_count;
    for(var i = 0; i < numOfTweets; i++) {
      var name = data[i].user.name;
      var date = data[i].created_at;
      var user = data[i].user.screen_name;
      var tweet = data[i].text;
      if(err) {
        console.log('Ooops. Something went wrong!');
      } else {
        console.log(date);
        console.log(name);
        console.log('@' + user + ': ' + tweet);
      }
    }
  };

  T.get('statuses/user_timeline', timeline, getTimeline);
}

function tweet(text) {
  var status = {
    status: text // tweet text
  };

  T.post('statuses/update', status, postIt);

  function postIt(err, data, response) {
    var tweet = data.text;
    var user = data.user.screen_name;
    if(err) {
      console.log('Ooops. Something went wrong!');
    } else {
      console.log('@' + user + ': ' + tweet);
    }
  };
}

function streaming() {
  var stream = T.stream('user');
  stream.on('follow', followed);

  function followed(event) {
    console.log('somebody followed you');
    console.log(event);
  }
}

// area to choose what code to execute
//streaming();
//tweet("What's happening?");
//searching();
//timeline();