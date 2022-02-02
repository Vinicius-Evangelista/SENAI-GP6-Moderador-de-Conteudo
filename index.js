const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `5152845703:AAHHtpYCODn90Hn-5uMB6tCVYFfAgMFp-Cc`

const bot = new TelegramBot( TOKEN, { polling: true } )

bot.onText(/Oi/, function(msg) {
    console.log("é chegou algo")
    bot.sendMessage(msg.chat.id, 'Firmeza ?')
})