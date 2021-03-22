const config = require('../config');
const answers = config.bot.answers;
const svgCaptcha = require('svg-captcha');
const svg2img = require('svg2img');


const captcha = {
	// Creating SVG captcha
	getCaptcha: async () => {
		const captcha = svgCaptcha.create();
		return captcha;
	},
	// Sending captcha to client
	sendCaptcha: async(bot, chatId, message, captcha) => {

		svg2img(captcha.data, function(error, buffer) {
			//returns a Buffer
			bot.sendPhoto(chatId, buffer, message, {
				// Explicitly specify the file name.
				filename: 'captcha',
				// Explicitly specify the type.
				contentType: 'photo/png',
			});
		});
		return captcha.text;
	},

	incorrectCaptcha: (bot, chatId, fromId) => {
		if (bot.captches[fromId]) {
			delete bot.captches[fromId];
			const incorrect = answers.captcha.incorrect;
			bot.sendMessage(chatId, incorrect.text, incorrect.config);
		}
	}
};


module.exports = captcha;