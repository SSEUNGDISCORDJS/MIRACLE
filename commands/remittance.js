const comma = require("comma-number")
const Schema = require("../models/도박")

module.exports = {
    name: "송금",
    description: "지정한 유저에게 자신의 돈을 송금 할 수 있어요!",
    async execute(message, args) {
        const user = message.mentions.members.first() 
        if (!user) return message.reply("**송금할 대상을 멘션해주세요**")
        const sk = await Schema.findOne({ userid: message.author.id }) 
        const tkdeoqkd = await Schema.findOne({ userid: user.id })
        if (!sk) return message.reply("**먼저 !돈 명령어로 도박 시스템 가입을 진행해주세요!**") 
        if (!tkdeoqkd) return message.reply("**송금할 대상이 가입을 하지 않았습니다**") 
        const betting = parseInt(args[1])
        if (!betting) return message.reply("**사용법 : !송금 @user (Money)**") 
        if (message.content.includes("-")) return message.reply("**금액엔 -가 포함되면 안됩니다!**") 
        if (betting < 1000) return message.reply("**최소 송금 제한 금액은 1000원 입니다!**") 
        const money = parseInt(sk.money) 
        const money2 = parseInt(tkdeoqkd.money)
        if (money < betting) return message.reply("**현재 자산보다 큰 금액을 송금할 수 없습니다**")
        if (message.author.id == user.id) return message.reply("**자신에게는 송금할 수 없습니다.**") 
        await Schema.findOneAndUpdate({ userid: message.author.id }, {
            money: money - betting,
            userid: message.author.id,
            date: sk.date
        })
        await Schema.findOneAndUpdate({ userid: user.id }, {
            money: money2 + betting,
            userid: user.id,
            date: tkdeoqkd.date
        })
        const embed = new (require("discord.js")).MessageEmbed() 
            .setTitle("송금이 정상적으로 처리되었습니다!") 
            .setColor("GREEN") 
            .setTimestamp() 
            .setDescription(`**보낸이 : <@${message.author.id}>의 잔액 : ${comma(money - betting)}원\n\n<@${user.id}>의 잔액 : ${money2 + betting}원**`)

        message.channel.send({ embeds: [embed] }) 
    }
}
