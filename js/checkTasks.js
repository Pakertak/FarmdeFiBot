const config = require('../config');
const { bot } = require('../config');
const request = require('./request');
const TOKEN = bot.token;
const tasks = bot.answers.tasks;

const checker = {

	checkGroupJoin: async query => {
		const configChat = {
			url: `https://api.telegram.org/bot${TOKEN}/getChatMember?chat_id=${tasks.details.telegramChatId}&user_id=${query.from.id}`
		};
		const data = await request(configChat);
		return data;
	},

	checkChannelFollow: async query => {
		const configChannel = {
			url: `https://api.telegram.org/bot${TOKEN}/getChatMember?chat_id=${tasks.details.telegramChannelId}&user_id=${query.from.id}`
		};
		const data = await request(configChannel);
		return data;
	},

	checkTwitterFollow: async message => {
		const configTwitter = {
			url: `https://api.twitter.com/1.1/friendships/show.json?source_screen_name=${tasks.details.twitterChannelId}&target_screen_name=${message.text}`,
			headers: { 'Authorization': `Bearer ${config.bot.twitterBearer}` },
			
			json: true
		}
		const data = await request(configTwitter);
		if (data && data.relationship.target.following) {
			return true;
		}
		return false;
	}
};


module.exports = checker;