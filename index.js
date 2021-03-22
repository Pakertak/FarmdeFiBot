const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const queryHandler = require('./js/queryHandler');
const debug = require('./js/debug');
const messageHandler = require('./js/messageHandler');
const comands = require('./js/comandHandler');


const TOKEN = config.bot.token;

const bot = new TelegramBot(TOKEN, {
	polling: true
});

bot.captches = {};
bot.twitter = {};


console.log('Bot has been started.');

bot.on('message', message => {
	messageHandler(bot, message);
});

bot.onText(/\/start/, message => {
	bot.sendMessage(message.chat.id, debug(message));
	comands.start(bot, message);
});

bot.onText(/\/start (.+)/, (message, arr) => {
	bot.sendMessage(message.chat.id, debug(message));
	comands.startParams(message, arr[1]);
});

bot.on('callback_query', query => {
	queryHandler(bot, query);
});