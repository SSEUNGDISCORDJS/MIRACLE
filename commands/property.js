const client = require("../index")
const comma = require('comma-number')
const Schema = require("../models/도박")

module.exports = {
    name: "잔액",
    description: "자신의 도박 시스템 내 잔액을 확인해요!",
    async execute(message, args) {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const wjdqh = await Schema.findOne({ userid: user.id })
        if (!wjdqh) return message.reply("**데이터베이스에 등록 된 데이터가 없습니다, !돈 명령어를 사용하여 도박 시스템에 가입해보세요!**")
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        let i
        if (wjdqh.date == date) i = "돈을 지급 받았습니다!"
        else i = "돈을 지급받지 않았습니다!"
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`${user.tag || user.user.tag}님의 현재 잔액`)
            .addField("잔액 :", `**${comma(wjdqh.money)}원**`)
            .addField("오늘 기본 요금을 받았는가? :", `**오늘 ${i}**`)
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp()
            .setColor("RANDOM")
        message.channel.send({ embeds: [embed] })
    }
}
