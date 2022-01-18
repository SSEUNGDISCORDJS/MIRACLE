const ytsearch = require('yt-search')
const comma = require('comma-number') 
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "유튜브검색",
    description: "유튜브 모듈을 사용하여 검색결과를 불러와요!",
    async execute(message, args) { 
        const argsjoin = args.join(" ") 
        if (!argsjoin) return message.reply("검색하실 내용을 입력해주세요") 
        const msg = await message.channel.send({ content: "해당 검색어를 가져오고 있습니다. . ." }) 
        let search = await ytsearch(argsjoin) 
        let video = search.videos[0] 
        if (!video) return message.reply("검색 결과가 없습니다.") 

        const { views, title, timestamp, url, author, ago, image } = video
        const embed = new MessageEmbed() 
            .setTitle(`${argsjoin}에 대한 검색결과입니다`) 
            .setImage(image) 
            .addFields(
                { name: "제목", value: `${title}`, inline: true },
                { name: "링크", value: `[바로가기](${url})`, inline: true },
                { name: "유튜버", value: `[${author.name}](${author.url})`, inline: true },
                { name: "영상 생성일", value: `${ago}`, inline: true },
                { name: "영상 길이", value: `${timestamp}`, inline: true },
                { name: "조회수", value: `${comma(views)}회`, inline: true }
            )
            .setColor("RANDOM") 
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())

        msg.edit({ embeds: [embed], content: " " }) 
    }
}