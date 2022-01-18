module.exports = {
    name: '청소',
    aliases: ["cl", "delete"],
    description: "지정한 수 만큼 메시지를 삭제합니다!",
    async execute(message, args) {
        if(!args[0]) return message.reply("삭제할 갯수를 입력해주세요!");
        if(isNaN(args[0])) return message.reply("숫자를 입력해주세요!");

        if(args[0] > 100) return message.reply("100개 이상의 메세지를 삭제 할 수는 없어요");
        if(args[0] < 1) return message.reply("1개 이상 메시지만 삭제 할수 있습니다!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        })
    }
}