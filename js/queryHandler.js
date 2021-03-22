const config = require('../config');
const request = require('./request');
const checker = require('./checkTasks');
const captcha = require('./captcha');
const CRUD = require('./database');
const answers = config.bot.answers;



// Sending tasks with show config
const showTasks = (bot, query) => {
	const tasks = answers.tasks;
	bot.sendMessage(query.message.chat.id, tasks.list.join('\r\n'), tasks.showConfig);
};

// Sending captcha
const captchaCheck = async (bot, query) => {
	const captchaSVG = await captcha.getCaptcha();
	const message = query.message,
				chatId = message.chat.id;
	bot.captches[query.from.id] = await captcha.sendCaptcha(bot, chatId, answers.captcha.check, captchaSVG);

	setTimeout(captcha.incorrectCaptcha, 30000, bot, chatId, message.from.id);
	return false;
};

// Checking a and b tasks
const checkSubscribes = async (bot, query) => {
	const a = await checker.checkGroupJoin(query);
	const b = await checker.checkChannelFollow(query);
	if (a && b) {
		bot.twitter[query.from.id] = true;
		setTimeout(waitForTwitter, 30000, bot, query);
		bot.sendMessage(query.message.chat.id, answers.telegram.message, answers.telegram.config);
	} else {
		bot.sendMessage(query.message.chat.id, answers.telegram.error, answers.telegram.config);
	}
};

const waitForTwitter = (bot, query) => {
	if (bot.twitter[query.from.id]) {
		const tasks = answers.tasks;
		delete bot.twitter[query.from.id];
		bot.sendMessage(query.message.chat.id, tasks.list.join('\r\n'), tasks.processConfig);
	}
};

const showBalance = async (bot, query) => {
	const user = await CRUD.readUsers({telegramId: query.from.id});
	const profile = config.bot.answers.profile;
	const text = profile.balance.replace('/balance/', user.balance).replace('/refBalance/', user.refBalance);
	bot.sendMessage(query.message.chat.id, text, profile.config);
};

const showPayDate = async (bot, query) => {
	const user = await CRUD.readUsers({telegramId: query.from.id});
	const profile = config.bot.answers.profile;
	const text = profile.withdraw.replace('/payDate/', user.payDate);
	bot.sendMessage(query.message.chat.id, text, profile.config);
};

const sendReferralLink = async (bot, query) => {
	const profile = config.bot.answers.profile;
	const text = `https://t.me/${config.bot.name}?start=${query.from.id}`;
	bot.sendMessage(query.message.chat.id, text, profile.config);
};

const sendBuyMessage = async (bot, query) => {
	const profile = config.bot.answers.profile;
	const text = profile.buy;
	bot.sendMessage(query.message.chat.id, text, profile.config);
};

const sendAbout = async (bot, query) => {
	const profile = config.bot.answers.profile;
	const text = profile.about;
	bot.sendMessage(query.message.chat.id, text, profile.config);
};

// config for queries
const callbacks = {
	'showTasks': showTasks,
	'checkCaptcha': captchaCheck,
	'progress': checkSubscribes,
	'balance': showBalance,
	'withdraw': showPayDate,
	'referral': sendReferralLink,
	'buy': sendBuyMessage,
	'about': sendAbout
};

module.exports = (bot, query) => {
	callbacks[query.data](bot, query);
};