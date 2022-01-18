module.exports = {
    name: "무작위",
    description: "보기 6개 이상을 알려주시면 제가 골라드려요!",
    execute(message, args) {
        if(!args[0]) return message.reply(`항목을 입력해주세요!`)
        if(!args[1]) return message.reply(`항목을 두 개 이상 입력해주세요!`)
        if(args[6]) return message.reply(`항목은 최대 여섯 개까지 입력할 수 있습니다!`)
        const i = args.length
        let random = parseInt(Math.random() * i);
        message.reply(`저는.. **${args[random]}** (이/가) 좋은것 같아요!`);
    }
}
