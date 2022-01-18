const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "유저정보",
    execute(message){
        const user = message.mentions.members.first() || message.author;

        const dddd = new MessageEmbed()
        .setTitle(`${user.user.tag}님의 정보`)
        .setThumbnail(user.user.avatarURL())
        .addField(" 아이디", `${user.id}`)
        .addField("가입 날짜", `${user.user.createdAt.getFullYear()}년 ${user.user.createdAt.getMonth()}월 ${user.user.createdAt.getDay()}일 ${user.user.createdAt.getHours()}시 ${user.user.createdAt.getMinutes()}분`)
        .addField(" 서버 가입 날짜", `${new Date(user.joinedTimestamp).toLocaleDateString()}`)
        .addField("역할 수", `${user.roles.cache.size - 1}`)
        message.channel.send({ embeds: [dddd] })
    }
}