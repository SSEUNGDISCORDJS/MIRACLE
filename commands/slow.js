module.exports = {
    name:"슬로우모드",
    description: "지정한 채널에 슬로우 모드를 적용해요!",
    execute(message, args){
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("권한이 없습니다!")
        if(isNaN(args[0])) return message.reply("올바른 값을 입력해주세요.");
        const time = parseInt(args[0]);
        message.channel.setRateLimitPerUser(time)
    message.channel.send("지정한 시간에 한번씩 보낼수 있도록 현재 채팅방에 슬로우모드를 적용했어요!")

    }
}