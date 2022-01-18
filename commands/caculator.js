const { calculator } = require("simply-djs")

module.exports = {
    name: "계산기",
    description: "버튼계산기로 쉽고 간편하게 계산할 수 있어요!",
    execute(message) {
        try {
            calculator(message, {
                embedColor: "RANDOM"
            })
        } catch (error) {
            message.reply(`오류가 발생했습니다 ${error}`)
        }
    }
}