const Schema = require("../models/도박")
const comma = require("comma-number")

module.exports = {
    name: "도박",
    description: "자신이 가지고 있는 돈으로 도박을 할 수 있습니다!",
    async execute(message, args) {
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) return message.reply("**!돈으로 기본 지급액을 먼저 받아주세요.**")
        if (isNaN(args[0])) return message.reply("**베팅 하실 금액을 입력해 주세요.**")
        if (args.join(" ").includes("-")) return message.reply("**금액엔 -가 포함되면 안돼요!**")
        const money = parseInt(args[0]);
        if (money < 500) return message.reply("**최소 베팅금액은 500원 입니다.**")
        if (money > ehqkrduqn.money) return message.reply("**소유하고 있는 돈 보다 많은 금액을 베팅할 수는 없어요!**")
        const random = Math.floor(Math.random() * 101)
        if (random < 50) {
            message.reply(`**당신이 패배 했습니다. 베팅한 금액을 모두 잃었습니다! \n-${comma(money)}원**`)
            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money - money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        } else {
            message.reply(`**당신이 승리 했습니다!  \n+${comma(money)}원**`)
            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        }
    }
}
