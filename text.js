const checkText = () => {
    return "💸 В какой валюте вы хотите увидеть свои счета? 💰"
}
const statsText = () => {
     return "stats"
}
const banksText = () => {
    return "banks"
}

const startText = (firstName) => {
   return `
  Привет, *${firstName}*! 👋
Добро пожаловать в *Bot Finance* 💰
  
Я помогу тебе управлять финансами. Вот несколько кнопок, с помощью которых ты можешь начать:
  `;
}


module.exports = { checkText, statsText, banksText, startText};