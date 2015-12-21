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
    request('http://api.giphy.com/v1/gifs/search?q=ayy+lmao&api_key=dc6zaTOxFJmzC&limit=1', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.data[0].images.fixed_height.url);
            bot.reply(message, body.data[0].images.fixed_height.url);
        }
    })

});
