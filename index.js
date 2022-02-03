
import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios'
import vision from '@google-cloud/vision'
import piii from 'piii'

const TOKEN = `5152845703:AAHHtpYCODn90Hn-5uMB6tCVYFfAgMFp-Cc`

const bot = new TelegramBot( TOKEN, { polling: true } )

//Detecta uma mensagem de texto 
bot.on('text', function(msg) {
    DeletarMensagem(msg)
})


//Detecta uma imagem enviada
 bot.on('photo',async function(photo){

    var filePathName = await BaixarImagem(photo)
     
    AnalisarImagem(filePathName, photo)
      
})

//Baixa imagem enviada
async function BaixarImagem(photo){
    
    var pathName = "";

    await bot.downloadFile(photo.photo[0].file_id, './img')
    
    await axios.get(`https://api.telegram.org/bot5152845703:AAHHtpYCODn90Hn-5uMB6tCVYFfAgMFp-Cc/getFile?file_id=${photo.photo[0].file_id}`)
    .then(res => pathName = res.data.result.file_path.split('/')[1])

    return pathName;
}

//Envia imagem para Ia da Google
async function AnalisarImagem(filePathName, photo) {

    const client = new vision.ImageAnnotatorClient({
        keyFilename: "APIKEY.json"
    });

    // Performs label detection on the image file
    const [result] = await client.labelDetection(`./img/${filePathName}`);
    
    const labels = result.labelAnnotations;
    
    console.log('Labels:');
    
    labels.forEach(label => console.log(label.description));

    DeletarImagem(labels, photo)
   
}


//Deleta uma imagem
async function DeletarImagem(descricoes, photo){
    descricoes.map((descricao => {
        if(descricao.description == "Carnivore"){
            bot.deleteMessage(photo.chat.id, photo.message_id)
        }
    }))
}

//Deleta uma mensagem
function DeletarMensagem(msg) {

    const ofensiva = msg.text == "Eu amo gatos!"

    // if(piii.has(msg.text)){
    //     bot.deleteMessage(msg.chat.id, msg.message_id)
    //     bot.sendMessage(msg.chat.id, `${msg.from.first_name} mandou uma mensagem ofensiva !`)
    // }

    if(ofensiva){
        bot.deleteMessage(msg.chat.id, msg.message_id)
        bot.sendMessage(msg.chat.id, `${msg.from.first_name}, amamos cachorros, não gatos!`)
    }
}