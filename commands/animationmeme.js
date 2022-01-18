const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "애니",
    description: "애니 이미지를 랜덤으로 출력해요!",
    execute(message) {
        const dddd = new MessageEmbed()
        .setTitle("오류가 발생했습니다!")
        .setTimestamp()
        if (message.channel.nsfw) return message.channel.send({ embeds: [dddd] })
        const url = "https://api.taejung.kro.kr/meme/basic"
        try {
            fetch(url).then(res => res.json()).then(async json => {
                const dd = new MessageEmbed()
                    .setTitle("랜덤 애니 이미지")
                    .setImage(json.url)
                    .setColor("RANDOM")
                    .setTimestamp()
               
                message.channel.send({ embeds: [dd] })
            })
        } catch (error) {
            message.channel.send(error)
        }
    }
} 
