const Schema = require("../models/도박") 
const client = require("../index") 
const comma = require("comma-number") 

module.exports = {
    name: "랭킹", 
    description: "도박시스템의 랭킹을 확인합니다!",
    execute(message) {
        Schema.find() 
            .sort([["money", "descending"]])
            .limit(10) 
            .exec((error, res) => { 
                const embed = new (require("discord.js")).MessageEmbed() 
                    .setTitle("도박 순위표") 
                    .setColor("RANDOM") 
                    .setTimestamp() 

                for (let i = 0; i < res.length; i++) {
                    let searchuser = client.users.cache.get(res[i].userid) 
                    const user = searchuser || "Delete User" 
                    embed.addField(`${i + 1}. ${user.tag || user}`, `${comma(res[i].money)}원`) 
                }
                message.channel.send({ embeds: [embed] })
            })
    }
}
