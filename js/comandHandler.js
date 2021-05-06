const config = require('../config');
const CRUD = require('./database');


const answers = config.bot.answers;

const comands = {

	// start without params
	start: async (bot, message) => {

		const chatId = message.chat.id,
		params = {
			telegramId: message.from.id 
		};
	
		const user = await CRUD.readUsers(params);
		if (!user) {
			if (bot.captches[message.from.id]) {
				return false;				
			} 
			const startMessage = answers.start;
			bot.sendMessage(chatId, startMessage.message, startMessage.config);
			return false;
		} else {
			if (user.tasksCompleted) {
				const profile = answers.profile;
				bot.sendMessage(chatId, profile.defaultText, profile.config);
			} else {
				if (user.ethAddress) {
					const tasks = config.bot.answers.tasks;
					bot.sendMessage(chatId, tasks.list.join('\r\n'), tasks.processConfig);
				}
				bot.sendMessage(chatId, answers.ethAddress.message, answers.ethAddress.config);
			}
		} 
	},


	// start with param
	startParams: async (message, param) => {
		if (parseInt(param) !== message.from.id) {
			const user = await CRUD.readUsers({telegramId: message.from.id});
			if (!user) {
				CRUD.createUserReferral(['telegramcode', 'referraltelegramcode'], [param, message.from.id]);
			}
		}
	}
}
module.exports = comands;