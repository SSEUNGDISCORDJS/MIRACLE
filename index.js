const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
    // 인텐트 추가 가능
  ],
  ws: {
    properties: {
      $browser: "Discord Android"
    }
  }
})
const fs = require('fs')
const { prefix , token} = require('./config.json')
const { DiscordTogether } = require('discord-together')
client.discordTogether = new DiscordTogether(client);
const mongoose = require("mongoose")
const internal = require('stream')
module.exports = client;

mongoose.connect("mongoDB 링크", {
useNewUrlParser: true ,  useUnifiedTopology: true 
}).then(console.log("데이터베이스 연결 완료"))


// 슬래시 커맨드 핸들링
client.slashcommands = new Collection()
let commands = []
const commandsFile1 = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'))
for (const file of commandsFile1) {
    const command = require(`./slashcommands/${file}`)
    client.slashcommands.set(command.name, command)
    commands.push({ name: command.name, description: command.description })
}

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.slashcommands.get(interaction.commandName)
    if (!command) return
    try {
        await command.execute(interaction)
    } catch (err) {
        console.error(err)
        await interaction.reply({ content: "오류가 발생했습니다!", ephemeral: ture })
    }
})

client.once('ready', async () => {
    client.guilds.cache.forEach(gd=>{
        gd.commands.set(commands)
    })
    console.log(client.user.username + "로그인 완료!")
})

client.on('messageCreate' , message=>{
    if(message.content == "테스트"){
        message.reply("정상 작동중")
    }
})

process.on("unhandledRejection",err=>{
    if(err == "DiscordAPIError: Missing Access") return console.log("슬래쉬 푸쉬 권한이 부족합니다")
    console.error(err)
})

client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.on('messageCreate',message=>{
    if(message.content == `${prefix}유튜브`){
        const channel = message.member.voice.channel
        if(!channel) return message.reply("음성채널에 접속해주세요!")
        client.discordTogether.createTogetherCode(channel.id, 'youtube').then(invite =>{
            return message.channel.send(invite.code)
        })
    }
})

client.on("messageCreate", async message=>{
    if(message.channel.type == "DM") return
    const Schema = require("./models/금지어")
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    if(args[1] == "추가" || args[1] == "삭제") return
    await Schema.find({serverid:message.guild.id}).exec((err,res)=>{
        for(let i = 0;i < res.length;i++){
            if(message.content.includes(res[i].금지어)){
                if(res[i].온오프 == "on"){
                    message.delete()
                    const embed = new (require("discord.js")).MessageEmbed()
                    .setTitle("욕설이 감지 되었습니다!")
                    .setDescription(`${message.content}에서 욕설이 감지 되었습니다!`)
                    .addField("감지 된 욕설",`${res[i].금지어}`)
                    .setColor("RED")
                    .setTimestamp()
                    return message.channel.send({embeds:[embed]}).then(msg=>{
                        setTimeout(() => {
                            msg.delete()
                        }, 5000);
                    })
                }
            }
        }
    })
    
})

client.login(token);
