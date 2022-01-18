const { get } = require('superagent')

module.exports = {
  name: '강아지',
  description: '랜덤으로 강아지 사진을 불러와요!',
  async execute (message) {
    const res = await get('https://dog.ceo/api/breeds/image/random')
    message.channel.send(res.message)
  }
}