const { bot } = require('../config');
const request = require('./request');
const TOKEN = bot.token;
const tasks = bot.answers.tasks;

const checker = {

	checkGroupJoin: async query => {
		const telegramURL = `https://api.telegram.org/bot${TOKEN}/getChatMember?chat_id=${tasks.details.telegramChannelId}&user_id=${query.from.id}`;
		const data = await request(telegramURL);
		return data;
	},

	checkChannelFollow: async query => {
		const telegramURL = `https://api.telegram.org/bot${TOKEN}/getChatMember?chat_id${tasks.details.telegramChatId}&user_id=${query.from.id}`;
		const data = await request(telegramURL);
		return data;
	},

	checkTwitterFollow: async message => {
		return true;
		const twitterApi =`https://api.twitter.com/1.1/friendships/show.json?source_screen_name=${tasks.details.twitterChannelId}&target_screen_name=${message.text}`;
		const data = await request(twitterApi);
		return data;
	}
};


module.exports = checker;