module.exports = {
    name: '이모지',
    description: "이모지를 숫자 및 영어단어 이모지로 변경합니다!",
    args: true,
    execute(message, args) {
      let spaceEmoji = ':white_large_square:';
      if (args[0].startsWith('-')) {
        spaceEmoji = args.shift();
        spaceEmoji = spaceEmoji.split('-')[1];
      }
  
      const content = args.join(' ').toLowerCase().replace(/[^ 0-9a-z]/g, '');
      if (!content.length) return message.reply('변환할 숫자 및 영어 단어를 입력해주세요!');
  
      const numberEmoji = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
      const emojiList = [];
  
      for (const c of content) {
        if (c === ' ') emojiList.push(spaceEmoji);
        else if (!isNaN(c)) emojiList.push(numberEmoji[c]);
        else emojiList.push(`:regional_indicator_${c}:`);
      }
  
      const emojiText = emojiList.join('');
      message.channel.send(emojiText);
    },
  };