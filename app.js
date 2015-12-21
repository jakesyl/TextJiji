var Botkit = require('botkit');
var request = require('request');


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var controller = Botkit.slackbot({
    debug: false,
});

controller.spawn({
    token: process.env.token
}).startRTM(function(err) {
    if (err) {
        throw new Error(err);
    }
});


controller.hears(['What can you do?', 'help', 'What do you do'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, "I can do the following\n:alien: Post Gifs\n:newspaper: Post News\n:joy: Post Jokes\n:disappointed: Make you feel better");
});


controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, "Hello.");
});

controller.hears([':alien:'], 'direct_message,direct_mention,mention', function(bot, message) {
    request('http://api.giphy.com/v1/gifs/random?q=ayy+lmao&api_key=dc6zaTOxFJmzC&limit=1', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            console.log(json.data.image_original_url);
            bot.reply(message, json.data.image_original_url);
        }
    });
});

controller.on('user_channel_join, user_group_join', function(bot, message) {
    bot.reply(message, 'Welcome :smile:')
});

controller.hears([':newspaper:'], 'direct_message,direct_mention,mention', function(bot, message) {
    request('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=17ce8b118db416598094a8319342a76b:17:50393256', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var randNum = Math.floor(Math.random() * json.results.length);
            bot.reply(message, "_" + json.results[randNum].section + "_:  " + ":point_right: *" + json.results[randNum].title + "* :point_left:" + json.results[randNum].url);
        }
    });
});

controller.hears([':joy:'], 'direct_message,direct_mention,mention', function(bot, message) {
    request('http://tambal.azurewebsites.net/joke/random', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            bot.reply(message, json.joke);
        }
    });
});

controller.hears([':disappointed:'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, 'Flip that frown upside down! Tomorrow will be a better day!')
});

controller.hears([':heart:', ':heart_eyes:', 'love'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, 'Aww, you\'re far too kind! I love you too, BFF :blush::two_hearts:')
});

controller.hears([':grinning:', ':smiley:', ':smile:'], 'direct_message,direct_mention,mention', function(bot, message) {

    var mySmileyQuotes = ["It always warms my heart to see a smile on your face!",
        "Look at those pearly whites! Your dentist must be proud. What brand of toothpaste do you use?",
        "We may never know all the good that a simple smile can do.\" -Mother Theresa",
        "\"It looks like you're in a chipper mood today! I'm happy when my friends are happy, too :grinning:",
        "Use your smile to change the world, but don't let the world change your smile!",
        "If you think about it, a smile costs a lot less than electricity, yet still has the ability to brighten everyone's day!",
        "\"A smile is happiness you can find right under your nose\". -Tom Wilson",
        "\"A smile is a curve that sets everything straight\" -Phyllis Diller",
        "It's good to know that you're in a great mood today, BFF! Every day that ends in 'Day' is a good day :wink:"
    ]

    var smileyQuote = mySmileyQuotes[Math.floor(Math.random() * mySmileyQuotes.length)];
    bot.reply(message, smileyQuote)
});


controller.hears([':headphones:', ':musical_note:'], 'direct_message,direct_mention,mention', function(bot, message) {
    var defaultSpotifyOptions = {
        url: 'https://api.spotify.com/v1/browse/featured-playlists?limit=10',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer BQDyHM7L0CSnsd9V3v6YsIE-CvgDp-b_u4qn7Sib4t6779u0ONyUs16EoHmY1baAtbF3FL-rpUMHhxWTT78cRAIHFcwTcuIKvrGG8yGXvqBpqxhNe82yS-FjxYgrF2pQ_ckmKBTBJzrZCXJsjPAb'
        }
    };

    request(defaultSpotifyOptions, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var randNum = Math.floor(Math.random() * json.playlists.items.length)
            bot.reply(message, json.playlists.items[randNum].external_urls.spotify);
        }
    });
});

controller.hears([':cat:'], 'direct_message,direct_mention,mention', function(bot, message) {
    request('http://catfacts-api.appspot.com/api/facts?number=1', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            bot.reply(message, json.facts[0]);
        }
    });
});
