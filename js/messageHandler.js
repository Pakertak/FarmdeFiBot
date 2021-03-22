const validator = require('./validator');
const debug = require('./debug');
const config = require('../config');
const CRUD = require('./database');
const answer = config.bot.answers;
const captcha = require('./captcha');
const checker = require('./checkTasks');

const messageHandler = async (bot, message) => {
	const chatId = message.chat.id,
				fromId = message.from.id;

	// We are not using this method if the message is command
	if (message.entities && message.entities[0].type === 'bot_command') {
		return false;
	}

	// Validation of captcha
	if (bot.captches[fromId] === message.text) {
		delete bot.captches[fromId];
		
		// Creating user in database
		CRUD.createUser(['telegramCode'], [fromId]);

		bot.sendMessage(chatId, answer.ethAddress.message, answer.ethAddress.config);
		
		return false;
	} else if (bot.captches[fromId]) {

		// Incorrect Captcha
		captcha.incorrectCaptcha(bot, chatId, fromId);
		return false;
	}

	// Getting user record from database
	const user = await CRUD.readUsers({telegramId: fromId});
	if (!user) {
		bot.sendMessage(chatId, answer.errors.default, answer.errors.config);
		return false;
	}

	if (!user.ethAddress && validator(message.text, 'isAddress')) {
		if (validator(message.text, 'checksumAddress')) {
			const tasks = answer.tasks;

			// Saving ethAddress in database
			CRUD.updateUser(user, ['ethAddress'], [message.text]);
			
			// Sending tasks list with process config
			bot.sendMessage(chatId, tasks.list.join('\r\n'), tasks.processConfig);
		} else {
			bot.sendMessage(chatId, answer.ethAddress.error, answer.ethAddress.config);
		}

	} else {

		// Saving twitter in database
		if (user.ethAddress && bot.twitter[fromId]) {
			if (checker.checkTwitterFollow(message)) {
				CRUD.updateUser(user, ['twitter', 'airdroptaskscompleted', 'balance'], [message.text, true, user.balance + 500]);
				if (user.inviterId) {
					CRUD.updateUserReferral(user, ['referralbalance'], [config.bot.referralCost])
				}
			} else {
				bot.sendMessage(chatId, answer.twitter.error);		
			}
			delete bot.twitter[fromId];
		} else {
			bot.sendMessage(chatId, answer.ethAddress.error, answer.ethAddress.config);
		}
	}
	
};

module.exports = messageHandler;