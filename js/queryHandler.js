const config = require('../config');
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
	const message = query.message,
				chatId = message.chat.id;
	if (await reUseButtons(bot, query)) {
		return false;
	}
	const captchaSVG = await captcha.getCaptcha();
	bot.captches[query.from.id] = await captcha.sendCaptcha(bot, chatId, answers.captcha.check, captchaSVG);

	setTimeout(captcha.incorrectCaptcha, config.bot.answers.captcha.timeout, bot, chatId, message.from.id);
	return false;
};

// Checking a and b tasks
const checkSubscribes = async (bot, query) => {
	
	if (await reUseButtons(bot, query)) {
		return false;
	}
	const a = await checker.checkGroupJoin(query);
	const b = await checker.checkChannelFollow(query);
	if (a && b) {
		bot.twitter[query.from.id] = true;
		setTimeout(waitForTwitter, config.bot.answers.twitter.timeout, bot, query);
		bot.sendMessage(query.message.chat.id, answers.telegram.message, answers.telegram.config);
	} else {
		bot.sendMessage(query.message.chat.id, `${answers.telegram.error} ${answers.tasks.list[0]} \n ${answers.tasks.list[1]}`, answers.telegram.config);
	}
};

/**
 * Work after 30 seconds waiting of twitter
 */
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
	const text = profile.balance.replace('/balance/', user.balance).replace('/refBalance/', user.refBalance ? user.refBalance : 0);
	bot.sendMessage(query.message.chat.id, text, profile.config);
};

const showPayDate = async (bot, query) => {
	let text;
	const user = await CRUD.readUsers({telegramId: query.from.id});
	const profile = config.bot.answers.profile;
	if (user.payDate) {
		text = profile.withdraw.text.replace('/payDate/', user.payDate);
	} else {
		text = profile.withdraw.empty;
	}
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
	'checkCaptcha': captchaCheck, // sending captcha
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

const reUseButtons = async (bot, query) => {
	const chatId = query.message.chat.id;
	const user = await CRUD.readUsers({telegramId: query.from.id});
	if (user) {
		if (!user.ethAddress) {
			bot.sendMessage(chatId, answer.ethAddress.message, answer.ethAddress.config);
			return true;
		}
		if (!user.tasksCompleted) {
			if (query.data !== 'progress') {
				bot.sendMessage(chatId, tasks.list.join('\r\n'), tasks.processConfig);
				return true;
			} else {
				return false;
			}
		}		
		const profile = answers.profile;
		bot.sendMessage(chatId, profile.defaultText, profile.config);
		return true;
	}
};	