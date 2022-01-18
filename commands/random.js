module.exports = {
    name:"확률",
    description: "자신의 확률을 확인 합니다!",
    execute(message,args){
      const playerDice1 = Math.floor(Math.random() * 100 + 1)
      if(args[0] == "여친"){
        message.channel.send(`${message.author.username}님이 여친이 생길확률은 ${playerDice1}% 입니다.`)
      }
      if(args[0] == "오늘의운세"){
        message.channel.send(`${message.author.username}님이 운세가 좋을 확률은 ${playerDice1}% 입니다.`)
      }
      if(args[0] == "새해운세"){
        message.channel.send(`${message.author.username}님의 2022년 운세가 좋을 확률은 ${playerDice1}% 입니다.`)
      }
      if(args[0] == "결혼나이"){
              message.channel.send(`${message.author.username}님의 예상 결혼나이는 ${playerDice1}살 입니다.`)
      } 
    }
  }
