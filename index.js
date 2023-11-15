const Telegramapi = require(`node-telegram-bot-api`)
const api = `5126833767:AAFvLWB33UigfEr85sDjiOR0zZcNbQAuLW0`
const bot = new Telegramapi(api, { polling: true })
const chats = {}

// var N = 10; 
// Array.apply(null, {length: N}).map(Number.call, [{ text: `${Number} ✅`, callback_data: `${Number}` }]  )


const gameoption = {
    reply_markup: JSON.stringify({
        inline_keyboard:
       
        [
            [{ text: `1️⃣`, callback_data: `1` },{ text: `2️⃣`, callback_data: `2` },{ text:`3️⃣`, callback_data: `3` }],
            [{ text: `4️⃣`, callback_data: `4` },{ text: `5️⃣`, callback_data: `5` },{ text: `6️⃣`, callback_data: `6` }],
            [{ text: `7️⃣`, callback_data: `7` },{ text: `8️⃣`, callback_data: `8` },{ text: `9️⃣`, callback_data: `9` }],
            [{ text: ` 0️⃣`, callback_data: `0` },],
        ]
    })
}
const ageiopition ={
    reply_markup:JSON.stringify({
        inline_keyboard:[
            [{text:`♻️ Boshqattan boshlash ♻️`,callback_data:`/again`}]
        ]
    })
}
bot.setMyCommands([
    { command: `/start`, description: `Boshlangish uchrashuv` },
    { command: `/info`, description: `Siz haqingizda malumot` },
    { command: `/game`, description: `Play game` }

])
const startgame=async(chatId)=>{
    await bot.sendMessage(chatId, ` 0 dan 9 gacha soni tanglang 🚀`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = {
        "value": randomNumber,
        "chance": 3
    }
    return bot.sendMessage(chatId, `sonni toping 🧠`, gameoption)
}
// const start = () => {
    bot.on(`message`, async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        // console.log(text);
        // console.log(chatId);
        if (text === `/start`) {
            await bot.sendSticker(chatId, `https://stickerswiki.ams3.cdn.digitaloceanspaces.com/broblogger/1549712.160.webp`)
            await bot.sendMessage(chatId, `Xush kelibsiz 👋`)
        }
        else if (text === `/info`) {
            await bot.sendMessage(chatId, `Sizning ismingiz ${msg.from.first_name}
tel:+998997726700
Email:Muhammadjonmurodullayev2005@gmail.com`)
        }
        else if (text === `/game`) {
            return startgame(chatId,)
        }else{
            
            await bot.sendMessage(5874780103, `${text} - from : @${msg.from.username} ${msg.from.first_name}`)
            if (5874780103!=chatId) {
            await bot.sendMessage(chatId, `Sizning malumotingiz Userga yuborildi✅`)
            }
        }
      

    })
    bot.on(`callback_query`,async msg => {
        const data = msg.data
        
        const chatId = msg.message.chat.id
        console.log(chats[chatId])

        console.log(data)
        console.log(msg.from.first_name)
        

       try {
        if(data ==`/again`){
            await startgame(chatId)
       }
        else if (chats[chatId]["chance"] ==0) {
            return await bot.sendMessage(chatId, `Iltimos o'yinni qayta boshlang`,ageiopition)
        }
       
       else if(data==chats[chatId]["value"] && chats[chatId]["chance"] != 0){
        chats[chatId]["chance"] = 0
           await bot.sendMessage(chatId,`Soni topdingiz✅ :${chats[chatId]["value"]} `,ageiopition)
           console.log("topdi")
       }else{
           chats[chatId]["chance"] = chats[chatId]["chance"] - 1

           if (chats[chatId]["chance"] ==0) {
               console.log("yutqazdi")
               await bot.sendMessage(chatId,`Siz yutqazdingiz❌,Son ${chats[chatId]["value"]} edi `,ageiopition)
           } else {
               await bot.sendMessage(chatId,`Topa olmadingiz❌: ${data} dan  ${data > chats[chatId]["value"] ? "kichik" :"katta" } , sizda yana ${chats[chatId]["chance"]} imkoniyat bor`,)
           }
           
       }
       } catch (error) {
        
       }
    })
// }
// start()
bot.on("voice",async msg =>{
    await bot.sendVoice(5874780103, msg.voice.file_id,{
        caption :`from : @${msg.from.username} ${msg.from.first_name}`
    } )
    if (5874780103!=msg.chat.id) {
      await bot.sendMessage(msg.chat.id, `Xato`)
    }
})


bot.on("sticker",async msg =>{
    await bot.sendSticker(5874780103, msg.sticker.file_id,{
        caption :`from : @${msg.from.username} ${msg.from.first_name}`
    } )
    if (5874780103!=msg.chat.id) {
      await bot.sendMessage(msg.chat.id, `Xato`)
    }
})


bot.on("video",async msg =>{
    await bot.sendVideo(5874780103, msg.video.file_id,{
        caption :`from : @${msg.from.username} ${msg.from.first_name}`
    } )
    if (5874780103!=msg.chat.id) {
      await bot.sendMessage(msg.chat.id, `Xato`)
    }
})
bot.on("video_note",async msg =>{
    await bot.sendVideo(5874780103, msg.video_note.file_id,{
        caption :`from : @${msg.from.username} ${msg.from.first_name}`
    } )
    if (5874780103!=msg.chat.id) {
      await bot.sendMessage(msg.chat.id, `Xato`)
    }
})
bot.on("photo",async msg =>{
    await bot.sendPhoto(5874780103, msg.photo[0].file_id,{
        caption :`from : @${msg.from.username} ${msg.from.first_name}`
    } )
    if (5874780103!=msg.chat.id) {
      await bot.sendMessage(msg.chat.id, `Xato`)
    }
})
bot.on("contact",async msg =>{
    await bot.sendContact(5874780103, msg.contact,{
        caption :`from : @${msg.from.username} ${msg.from.first_name}`
    } )
    if (5874780103 != msg.chat.id) {
      await bot.sendMessage(msg.chat.id, `Xato`)
    }
})




