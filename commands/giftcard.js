module.exports = {
    name: "문상생성",
    description: "랜덤 숫자 매칭을 사용하여 문상을 생성합니다!",

    async execute(interaction) {
        function int(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          
          let a = int(2000, 4900)
          let b = int(1000, 9999)
          let c = int(1000, 9999)
          let d = int(100000, 999999)
          
          let res = `${a}-${b}-${c}-${d}`;
          
          interaction.reply({content: res})
    }
}