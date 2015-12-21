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

controller.on('user_channel_join, user_group_join',function(bot,message) {
	  bot.reply(message,'Welcome');}

    
controller.hears([':joy:'], 'direct_message,direct_mention,mention', function(bot, message) {
    request('http://tambal.azurewebsites.net/joke/random', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            bot.reply(message, json.joke);
        }
    });
});



































controller.hears([':newspaper:'], 'direct_message,direct_mention,mention', function(bot, message) {
    request('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=17ce8b118db416598094a8319342a76b:17:50393256', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var randNum = Math.floor((Math.random() * json.results.length) + 1);
            bot.reply(message, "_" + json.results[randNum-1].section + "_:  " + ":point_right: *" + json.results[randNum-1].title + "* :point_left:" + json.results[randNum-1].url);
        }
    });
});
