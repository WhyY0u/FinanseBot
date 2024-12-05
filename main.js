const { Telegraf } = require('telegraf');
const { checkText, banksText, startText, getBalValuteText, addBalValuteText, getHistoryText } = require('./text');
const { checkButton, buttonsStart, valuteBack, bank_selection, bankBack, buttonHistory } = require('./button');
let {incrementHalyk, incrementKaspi, incrementSimply, getHalyk, getKaspi, getSimply, getBalByBank, decrementKaspi, decrementSimply, decrementHalyk, addToHistory} = require('./balans')

const bot = new Telegraf('8121607462:AAEjbJz4LGjNzADvgHfPtq7QeUy65xHfikM');

let userMessages = {};
let userIdSayBal = {};
const actionText = async (action, first_name) => {
    switch (action) {
        case "check": return checkText();
        case "stats": return getHistoryText();
        case "back_to_bank":
        case "replenish": return banksText();

        case "kaspi":
        case "halyk":
        case "simply":
          return addBalValuteText();


        case "back_to_start": return startText(first_name);
        case "back_to_valute": return checkText();
        case "usd": return await getBalValuteText("USD", '$');
        case "eur": return await getBalValuteText("EUR", '€');
        case "kzt": return await getBalValuteText("KZT", '₸');
        case "rub": return await getBalValuteText("RUB", '₽');
        case "gbp": return await getBalValuteText("GBP", '£');
        case "btc": return await getBalValuteText("BTC", '₿');

        default: 
            break;
    }
}

const actionKeyBoard = (action) => {
  switch (action) {
    case "check": return checkButton();
    case "back_to_valute": return checkButton();
    case "back_to_start": return buttonsStart();
    case "stats": return buttonHistory();


    case "kaspi":
    case "halyk":
    case "simply":
    return bankBack();


    case "back_to_bank": return bank_selection();
    case "replenish": return bank_selection();
    case "usd":
    case "eur":
    case "kzt":
    case "rub":
    case "gbp":
    case "btc":
     return valuteBack();
    default: break;
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
    reply_markup: { inline_keyboard: buttonsStart() }
  }).then((sentMessage) => {
    userMessages[userId] = sentMessage.message_id; 
  });
});

bot.on('callback_query', async (ctx) => {
  const action = ctx.callbackQuery.data;
  console.log(action)

  const userId = ctx.from.id; 
  if(action == "kaspi" || action == "halyk" || action == "simply") {
    userIdSayBal[userId] = action
  } else if(userIdSayBal[userId] != null) {
    userIdSayBal[userId] = null
  }

  if (userMessages[userId]) {
    const newMessage = await actionText(action, ctx.from.first_name);

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
  }
});
function getFormattedDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0'); 
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const year = now.getFullYear(); 

  return `${day}.${month}.${year}`;
}

bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const userMessage = ctx.message.text;
  if(userIdSayBal[userId] != null && (userMessage.charAt(0) == "+" || userMessage.charAt(0) == "-")) {
    const regex = /^[+-]?(\d+(\.\d+)?)/;
    const match = userMessage.trim().match(regex);
    if (match) {
      const number = Math.abs(parseFloat(match[0]));
      let isLow = false;
      switch (userIdSayBal[userId]) {
        case "kaspi":
          if(userMessage.charAt(0) == "+") {
            incrementKaspi(number);
            const hist = `

📅 Дата: *${getFormattedDate()}*
💳 Пополнение *Kaspi* на сумму *${number}₸*
💰 Счет: *${getBalByBank(userIdSayBal[userId])}₸*
`;
            addToHistory(hist);
           } else {
            if(getKaspi() - number >= 0) {
            decrementKaspi(number);
            const hist = `

📅 Дата: *${getFormattedDate()}*
💸 Снятие *Kaspi* на сумму *${number}₸*
💰 Остаток: *${getBalByBank(userIdSayBal[userId])}₸*
`; 
            addToHistory(hist);
            } else {
              isLow = true;
            }
           }
          break;
        case "simply":
          if(userMessage.charAt(0) == "+") {
           incrementSimply(number);
           const hist = `

📅 Дата: *${getFormattedDate()}*
💳 Пополнение *Simply* на сумму *${number}₸*
💰 Счет: *${getBalByBank(userIdSayBal[userId])}₸*
`;
           addToHistory(hist);
           } else { 
            if(getSimply() - number >= 0) {
            decrementSimply(number);
            const hist = `

📅 Дата: *${getFormattedDate()}*
💸 Снятие *Simply* на сумму *${number}₸*
💰 Остаток: *${getBalByBank(userIdSayBal[userId])}₸*
            `;            
            addToHistory(hist);
            } else {
              isLow = true;
            }
           }
            break;
        case "halyk":
          if(userMessage.charAt(0) == "+") {
           incrementHalyk(number);
           const hist = `

📅 Дата: *${getFormattedDate()}*
💳 Пополнение *Halyk* на сумму *${number}₸*
💰 Счет: *${getBalByBank(userIdSayBal[userId])}₸*
`;
           addToHistory(hist);
           } else {
            if(getHalyk() - number >= 0) {
            decrementHalyk(number);
            const hist = `

📅 Дата: *${getFormattedDate()}₸*
💸 Снятие *Halyk* на сумму *${number}*
💰 Остаток: *${getBalByBank(userIdSayBal[userId])}₸*
                        `; 
            addToHistory(hist);
            } else {
              isLow = true;
            }
           }
              break;
      }
      const formattedBalance = userIdSayBal[userId].charAt(0).toUpperCase() + userIdSayBal[userId].slice(1);
      const messageSay = isLow ? `❌ *Ошибка!* 🚫  
На вашем балансе недостаточно средств.  
Текущий баланс: *${getBalByBank(userIdSayBal[userId])}₸*` : ( userMessage.charAt(0) == "+" ?  `🎉 *Успешно!* Ваш баланс пополнен на *${number}₸*
       Текущий баланс *${formattedBalance}*: ${getBalByBank(userIdSayBal[userId])}₸` :  `🎉 *Успешно!* С вашего баланса снято *${number}₸*
       Текущий баланс *${formattedBalance}*: ${getBalByBank(userIdSayBal[userId])}₸`)
      ctx.telegram.editMessageText(
        userId,
        userMessages[userId],
        null,
        messageSay,     
        { parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'На главную', callback_data: 'back_to_start' },
                { text: '👨‍💻 Мои счета', callback_data: 'check' },
              ]
            ]
          }
  
        }
  
      );

    } else {
      ctx.telegram.editMessageText(
        userId,
        userMessages[userId],
        null,             
       `❌ *Ошибка!* Пожалуйста, введите число с символами + или - в начале. Пример: +100 или -50.`,     
        { parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Назад', callback_data: 'back_to_bank' },
              ]
            ]
          }
  
        }
  
      );
    }
  }
  await ctx.deleteMessage();

});

bot.launch();