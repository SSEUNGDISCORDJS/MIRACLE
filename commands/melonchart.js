const discord = require("discord.js")
let cheerio = require("cheerio")
let request = require("request")
module.exports = {
    name: "멜론차트",
    description: '멜론차트 차트를 파싱하여 1~90위 까지 불러옵니다!',
    async execute(interaction) {
        interaction.reply({content: `멜론 차트를 불러오고 있어요, 잠시만 기다려주세요!`}).then((th) => {
            let url = "http://www.melon.com/chart/"
            let title = new Array(),
                artist = new Array(),
                up_date,
                up_time
            let rank = 99 
            request(url, function (error, response, html) {
                if (!error) {
                    let $ = cheerio.load(html)
                  
                    for (let i = 0; i < rank; i++) {
                        $(".ellipsis.rank01 > span > a").each(function () {
                            let title_info = $(this)
                            let title_info_text = title_info.text()
                            title[i] = title_info_text
                            i++
                        })
                    }
                 
                    for (let i = 0; i < rank; i++) {
                        $(".checkEllipsis").each(function () {
                            let artist_info = $(this)
                            let artist_info_text = artist_info.text()
                            artist[i] = artist_info_text
                            i++
                        })
                    }
                    
                    $(".year").each(function () {
                        let date_info = $(this)
                        let date_info_text = date_info.text()
                        up_date = date_info_text
                    })
                   
                    $(".hhmm > span").each(function () {
                        let time_info = $(this)
                        let time_info_text = time_info.text()
                        up_time = time_info_text
                    })
                   
                    var up_date_arr = new Array()
                    var up_date_arr = up_date.split(".")
                    var up_time_arr = new Array()
                    var up_time_arr = up_time.split(":")
                    let newtime
                
                    if (up_time_arr[0] > 12) {
                        up_time_arr[0] = up_time_arr[0] - 12
                        newtime = "오후 " + up_time_arr[0]
                    } else {
                        newtime = "오전 " + up_time_arr[0]
                    }
                    let embed = new discord.MessageEmbed()
                    embed.setColor("RANDOM")
                    embed.setTitle(`멜론 차트 1위 ~ ${rank}위를 불러왔어요!`)
                    let description = '';
                    for (let i = 0; i < 99; i++) {
                        description += `${i + 1}위  ${title[i]} - ${artist[i]}\n`
                    }
                    embed.setDescription(description)
                    embed.setFooter(`${up_date_arr[0]}년 ${up_date_arr[1]}월 ${up_date_arr[2]}일 ${newtime}시에 업데이트 되었습니다!`)
                    th.edit({content: '현재 멜론차트 순위예요!' ,embeds: [embed]})
                }
            })
        })
    }
} 