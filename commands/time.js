

module.exports = {
    name: "시간",
    description: "현재 대한민국의 시간을 출력해요!",
    execute(message) {
        const date = new Date()
        const time = Math.round(date.getTime() / 1000)
        message.channel.send(`<t:${time}>`)
    }
}