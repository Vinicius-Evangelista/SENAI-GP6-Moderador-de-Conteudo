
const TelegramBot = require( `node-telegram-bot-api` )



const TOKEN = `5152845703:AAHHtpYCODn90Hn-5uMB6tCVYFfAgMFp-Cc`

const bot = new TelegramBot( TOKEN, { polling: true } )


bot.onText(/Vish/, function(msg) {
    console.log("é chegou algo")
    console.log(msg)
    bot.sendMessage(msg.chat.id, `${msg.from.first_name} mandou uma mensagem ofensiva !`)
})


bot.on('photo', function(photo){
    async function quickstart() {
        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');
      
        // Creates a client
        const client = new vision.ImageAnnotatorClient({
            keyFilename: "APIKEY.json"
        });

        console.log(photo.photo[0])
      
        // Performs label detection on the image file
        const [result] = await client.labelDetection();
        const labels = result.labelAnnotations;
        console.log('Labels:');
        labels.forEach(label => console.log(label.description));
      }
    quickstart();
})




