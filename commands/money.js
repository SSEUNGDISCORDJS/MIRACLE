const comma = require("comma-number")

module.exports = {
    name: "돈",
    description: "도박 시스템에 가입하거나 기본 지급액을 받아요!",
    async execute(message) {
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        const schema = require("../models/도박")
        const ehqkrduqn = await schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) {
            let newData = new schema({
                money: parseInt(5000),
                userid: message.author.id,
                date: date
            })
            newData.save()
            message.channel.send("**도박 시스템에 가입하신 것을 축하합니다!**")
        } else {
            if (ehqkrduqn.date == date) return message.channel.send("이미 오늘 받을 수 있는 돈을 받으셨습니다!")
            const money = parseInt(ehqkrduqn.money)
            await schema.findOneAndRemove({
                userid: message.author.id
            })
            let newData = new schema({
                money: parseInt(money + 5000),
                userid: message.author.id,
                date: date
            })
            newData.save()
            const f = money + 5000
            message.channel.send(`5000원을 드렸습니다! \n현재잔액 : ${comma(f)}`)
        }
    }
}
