const config = {
	bot: {
		token: '1661210150:AAEU0J9IwJBtMlxOnzKDlAzrkCWyezfIKcE',
		name: 'AirdropFarmdeFiBot',
		answers: {

			tasks: {
				// The list of tasks that user should do
				list: [
					'a) Join the [group](https://www.google.by/)',
					'b) Subscribe to the [channel](https://t.me/joinchat/8Sine2sPU8k5MTYy)',
				 	'c) Subscribe to the [twitter](https://www.google.by/)',
					'd) Retweet this [entry](https://www.google.by/)'
				],
				
				// Controlling keyboard config
				showConfig: {
					parse_mode: 'Markdown',
					reply_markup: { 
						inline_keyboard: [
							[
								{
									text: 'Continue',
									callback_data: 'checkCaptcha'
								}
							]
						]
					}
				},
				processConfig: {
					parse_mode: 'Markdown',
					reply_markup: { 
						inline_keyboard: [
							[
								{
									text: 'Check progress',
									callback_data: 'progress'
								}
							]
						]
					}
				},

				// Tasks's details 
				details: {
					telegramChatId: '-1001206151405',
					telegramChannelId: '@ddddtra',
					twitterChannelId: 124,
					twitterPost: 'asga'
				}
			},
			// ETH - address validate
			ethAddress: {
				message: 'Send me your ETH-address, please.',
				error: 'Send valid ETH-address, please.',
				config: {
					parse_mode: 'Markdown'
				}
			},
			// Telegram answers
			telegram: {
				message: 'Send me your twitter handle.',
				error: 'You are not completed A and B tasks',
				config: {
					parse_mode: 'Markdown'
				}
			},
			// Twitter answers
			twitter: {
				message: 'Send me a twitter handler, please.',
				error: 'This twitter account is not followed to our channel or not exist',
				config: {
					parse_mode: 'Markdown'
				}
			},
			// First message
			start: {
				message: 'Hello. Glad to see you!',
				config: {
					parse_mode: 'Markdown',
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: 'continue',
									callback_data: 'showTasks'
								}
							]
						]
					}
				}
			},

			сongratulations: {
				text: 'Congratulations!',
				config: {
					parse_mode: 'Markdown'
				}
			},

			profile: {
				balance: 
				`Balance: /balance/
				Referral balance: /refBalance/`,
				withdraw: 
				`/payDate/`,
				referral: 
				`/referral/`,
				buy: 
				``,
				about: 
				`About us`,
				config: {
					parse_mode: 'Markdown',
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: 'Balance',
									callback_data: 'balance'
								}, {
									text: 'Withdraw',
									callback_data: 'withdraw'
								}
							],
							[
								{
									text: 'Referral',
									callback_data: 'referral'
								}, {
									text: 'BUY',
									callback_data: 'buy'
								}
							],
							[
								{
									text: 'About',
									callback_data: 'about'
								}
							]
						]
					}
				}
			},

			// Captcha validate
			captcha: {
				check: {
					// Text of the message
					caption: `
					Enter the text from the page.`
				},
				incorrect: {
					text: `
						_Incorrect value or time is out_
					`,
					config: {
						parse_mode: 'Markdown',
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: 'Try again',
										callback_data: 'checkCaptcha'
									}
								]
							]
						}
					}
				}
			},

			// Sending buttons to provide the information 
			account: 'Information',

			// Errors
			errors: {
				default: 'Sorry, I can\'t understand you.',
				config: {
					parse_mode: 'Markdown'
				}
			}
		},

		referralCost: {
			value: 100
		}
	},

	// Database config
	db: {
		user: 'postgres',
		host: 'localhost',
		port: 5432,
		database: 'FarmBotDatabase',
		password: '12345678' 
	}
};

module.exports = config;