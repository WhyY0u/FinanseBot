let { getHalyk, getKaspi, getSimply } = require('./balans');
const { getBal, getHistory } = require('./balans');

const checkText = () => {
    return "💸 В какой валюте вы хотите увидеть свои счета? 💰"
}
const banksText = () => {
  return "🏦 Выберите банк для Пополнение / Снятие"
}

const startText = (firstName) => {
   return `
  Привет, *${firstName}*! 👋
Добро пожаловать в *Bot Finance* 💰
  
Я помогу тебе управлять финансами. Вот несколько кнопок, с помощью которых ты можешь начать
  `;
}
const getBalValuteText = async (callback_data, prefix) => {
  const kasp = await getBal(getKaspi(), "KZT", callback_data);
  const haly = await getBal(getHalyk(), "KZT", callback_data);
  const simpl = await getBal(getSimply(), "KZT", callback_data);
  let total = parseFloat(simpl) + parseFloat(kasp) + parseFloat(haly);
  return `*Ваши счета в банках:*
🔹 *Kaspi*: ${kasp}${prefix}
🔹 *Halyk*: ${haly}${prefix}
🔹 *Simply*: ${simpl}${prefix}
🔹 *Общая*: ${total.toFixed(callback_data  == "BTC" ? 8 : 2)}${prefix}

  `
}


const getHistoryText = () => {
  return `📊 Ваша статистика за последние 10 действий
  ${getHistory()}
  `
}


const addBalValuteText = () => {
  return "💸 Чтобы **списать** сумму, введите **-1000**\n💰 Чтобы **добавить** сумму, введите **+1000**."
}
module.exports = { checkText, banksText, startText, getBalValuteText, addBalValuteText, getHistoryText};