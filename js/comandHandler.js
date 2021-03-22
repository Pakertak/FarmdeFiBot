const config = require('../config');
const debug = require('./debug');
const CRUD = require('./database');
const queryHandler = require('./queryHandler');


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

			} else {
				const tasks = config.bot.answers.tasks;
				bot.sendMessage(query.message.chat.id, tasks.list.join('\r\n'), tasks.processConfig);
			}
		} 
	},


	// start with param
	startParams: async (message, param) => {
		if (parseInt(param) !== message.from.id) {
			CRUD.createUserReferral(['telegramcode', 'referraltelegramcode'], [param, message.from.id]);
		}
	}
}
module.exports = comands;