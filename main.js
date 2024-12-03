const { Telegraf } = require('telegraf');
const { checkText, statsText, banksText, startText } = require('./text');
const { checkButton, buttonsStart } = require('./button');

const bot = new Telegraf('8121607462:AAEjbJz4LGjNzADvgHfPtq7QeUy65xHfikM');

let userMessages = {};

const actionText = (action, first_name) => {
    switch (action) {
        case "check": return checkText();
        case "stats": return statsText();
        case "banks": return banksText();
        case "back_to_start": return startText(first_name);
        default:
            break;
    }
}

const actionKeyBoard = (action) => {
  switch (action) {
    case "check": return checkButton();
    case "back_to_start": return buttonsStart();
    default:
        break;
}
}

bot.start((ctx) => {
  const firstName = ctx.from.first_name;
  const userId = ctx.from.id;

  const message = `
  Привет, *${firstName}*! 👋
Добро пожаловать в *Bot Finance* 💰
  
Я помогу тебе управлять финансами. Вот несколько кнопок, с помощью которых ты можешь начать:
  `;

  ctx.reply(message, {
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: buttonsStart }
  }).then((sentMessage) => {
    userMessages[userId] = sentMessage.message_id; 
  });
});

bot.on('callback_query', (ctx) => {
  const action = ctx.callbackQuery.data;
  const userId = ctx.from.id; 
  if (userMessages[userId]) {
    const newMessage = actionText(action, ctx.from.first_name);

    ctx.telegram.editMessageText(
      userId,           
      userMessages[userId], 
      null,             
      newMessage,     
      { parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: actionKeyBoard(action)
        }

      }

    );

    ctx.answerCbQuery(`Вы выбрали раздел "${action}".`); 
  }
});

bot.launch();