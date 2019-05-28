let fetch = require('node-fetch');
let TweetSplitter = require('./TweetSplitter.js');


// Constants
let HOSTNAME = 'https://n8e480hh63o547stou3ycz5lwz0958.herokuapp.com';
let VERSION = "/1.1";

let AUTH_PATH = "/auth";
let TIMELINE_PATH = "/statuses/home_timeline.json";

let TWEET_MAX_SIZE = 45;

main();

async function main() {

    // get token
    let jwtJson = await getToken();

    if(jwtJson == null){
        console.log("Failed to fetch JWT...");
        return 1;
    }

    // get tweets using the received JWT
    let tweets = await getTweets(jwtJson.token);
    if(tweets == null){
        console.log("Failed to fetch Tweets...");
        return 1;
    }

    // get random tweet from tweets
    let tweet = getRandomTweet(tweets);

    // split tweet according to size limit and print to stdout
    splitAndFormatAndPrintTweet(tweet);
}

async function getToken(){
    return fetch(HOSTNAME + VERSION + AUTH_PATH,
        { 
            method: 'POST'
        }
    )
    .then(res => {
        if(res.status != 200) {
            console.error(res);
            return Promise.reject();
        }
        return res.json();
    })
    .catch(err => console.error(err));
}

async function getTweets(jwt){
    return fetch(HOSTNAME + VERSION + TIMELINE_PATH,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }
    )
    .then(res => {
        if(res.status != 200) {
            console.error(res);
            return Promise.reject();
        }
        return res.json();
    })
    .then(tweets => tweets.map( (tweet) => tweet.text ))
    .catch(err => console.error(err));
}

function getRandomTweet(tweets){
    return tweets[ Math.floor(Math.random() * tweets.length) ];
}

function splitAndFormatAndPrintTweet(tweet){
    let tweetSplitter = new TweetSplitter(TWEET_MAX_SIZE);
    tweetSplitter.split(tweet).forEach( (miniTweet, index) => {
        console.log("Tweet #" + index + ": " + miniTweet);
    });
}




