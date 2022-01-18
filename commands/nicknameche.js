module.exports = {
    name:"닉변",
    description: "지정한 닉네임으로 변경할 수 있지만 권한이 저보다 낮아야해요!",
    cooldown:5,
    execute(message,args){
        msg = args.join(" ")
        message.member.setNickname(msg)
        message.reply(`${msg}로 별명을 변경했습니다`)
        }
    }
    