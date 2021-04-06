const config = {
	bot: {
		token: '1661210150:AAEU0J9IwJBtMlxOnzKDlAzrkCWyezfIKcE',
		twitterBearer: 'AAAAAAAAAAAAAAAAAAAAAEV4OAEAAAAA%2BOYyY%2FeMyQGhZ2rAIBwq05kB%2FTU%3DtsxJ6jSFcGsI37aJW4lg2SfLG6VMjl2qTeS6vYoDDz659so0NJ',
		name: 'AirdropFarmdeFiBot',
		answers: {

			tasks: {
				// The list of tasks that user should do
				list: [
					'a) Join the [group](https://t.me/joinchat/YmbNQObzd6dmZjYy)',
					'b) Subscribe to the [channel](https://t.me/ddddtra)',
				 	'c) Subscribe to the [twitter](https://twitter.com/owldao_)',
					'd) Retweet this [entry](https://twitter.com/owldao_/)'
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
					twitterChannelId: 'owldao_',
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
				error: '*You didn\'t complete A and B tasks:\n*',
				config: {
					parse_mode: 'Markdown'
				}
			},
			// Twitter answers
			twitter: {
				timeout: 30000,
				message: 'Send me a twitter handler, please.',
				error: 'This twitter account is not followed to our channel or not exist',
				config: {
					parse_mode: 'Markdown',
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: 'Try again',
									callback_data: 'progress'
								}
							]
						]
					}
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
				defaultText: 'Use buttons to get info.',
				balance: 
				`Balance: /balance/ \nReferral balance: /refBalance/`,
				withdraw: {
					text: `/payDate/`,
					empty: `Withdraw unset.`
				},
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
									url: 'https://www.google.by/'
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
				timeout: 30000,
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
				serverError: 'Sorry, we  can\'t process your message now. Try later, please.',
				config: {
					parse_mode: 'Markdown'
				}
			}
		},
		tasksCost: {
			value: 500
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
		database: 'farmbotdatabase',
		password: '' 
	}
};

module.exports = config;