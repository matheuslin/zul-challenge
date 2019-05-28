const https = require('https');
const TweetSplitter = require('./TweetSplitter.js');

const hostname = 'n8e480hh63o547stou3ycz5lwz0958.herokuapp.com';
const version = "/1.1";

const authPath = "/auth";
const timeline = "/statuses/home_timeline.json";

function formatTweets(tweets, format, separator){
  return tweets.map( (value, index) => {
    return "" + format + (index + 1) + separator + " " + value;
  });
}

function generateOutput(allTweets){
  var tweet = getRandomTweet(allTweets);
  var tweetSplitter = new TweetSplitter(45); // as specified
  var miniTweets = tweetSplitter.split(tweet);

  var formattedTweets = formatTweets(miniTweets, "Tweet #", ":");

  formattedTweets.forEach( (value) => {
    console.log(value);
  });

}

function getRandomTweet(allTweets){
  var idx = Math.floor(Math.random() * allTweets.length);
  var tweet = allTweets[idx].text;

  return tweet;
}

function getTimelineFunction(jwt){
  const options = {
    hostname: hostname,
    path: version + timeline,
    method: 'GET',
    port: 443,
    headers: {
      'Authorization': 'Bearer ' + jwt
     }
   };

   const req = https.request(options, (res) => {
    var messages = [];

    res.on('data', (d) => {
      messages.push(d);
    });

    res.on('end', () => {
      var allMessages = messages.join("");
      var allTweets = JSON.parse(allMessages);

      generateOutput(allTweets);
    });
   });

   req.on('error', (e) => {
    console.error(e);
  });

  req.end();
};

function getTokenFunction(){
  const options = {
    hostname: hostname,
    path: version + authPath,
    method: 'POST',
    port: 443,
  };

  const req = https.request(options, (res) => {
res.on('data', (d) => {
      var jsonData = JSON.parse(d);
      var token = jsonData.token;
      getTimelineFunction(token);  
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.end();
}

getTokenFunction();