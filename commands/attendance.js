const Schema = require("../models/출석체크")
const client = require("../index")
module.exports = {
    name: "출첵",
    description: "하루에 한번씩 출석체크를 할수 있어요!",
    async execute(message, args) {
        let newData
        const user = await Schema.findOne({ userid: message.author.id })
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate()
        if (args[0] == "횟수") {
            if (!user) return message.reply("정보가 없습니다")
            message.reply(`${message.author}님은 출석체크를 ${user.count}번 하셧습니다 !`)
            return
        } else {
            if (args[0] == "순위") {
                Schema.find().sort([['count', 'descending']]).limit(10).exec((err, res) => {
                    const embed = new (require("discord.js")).MessageEmbed().setTitle("출석체크 순위").setColor("GREEN").setTimestamp()
                    for (let i = 0; i < res.length; i++) {
                        let searchuser = client.users.cache.get(res[i].userid)
                        const user = searchuser || "찾을수 없는 유저"
                        embed.addField(`${i + 1}. ${user.tag || user}`, `${res[i].count}번`)
                    }
                    message.channel.send({ embeds: [embed] })
                })
                return
            } else
                if (!user) {
                    newData = new Schema({ count: 1, userid: message.author.id, date: date })
                    const embed = new (require("discord.js")).MessageEmbed().setTitle("첫번쨰 출석체크를 완료했습니다 !")
                } else {
                    if (user.date == date) return message.reply("이미 오늘 출석체크를 완료셨습니다 !")
                    await Schema.findOneAndRemove({ userid: message.author.id })
                    newData = new Schema({ count: parseInt(user.count) + 1, userid: message.author.id, date: date })
                    message.reply(`**출석체크를 완료했습니다 !\n누적 출석체크 횟수 : ${parseInt(user.count) + 1}**`)
                }
            newData.save();
        }
    }
}
