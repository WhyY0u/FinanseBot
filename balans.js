let kaspi = 0;
let halyk = 0;
let simply = 0;

let history = [];

function addToHistory(item) {
  history.push(item);
  if (history.length > 10) {
    history.shift();
  }
}

const getBal = async (amount, fromValute, toValute) => {
  console.log(toValute)
  if ( toValute === 'BTC') {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=KZT`;
    const response = await fetch(url);
    const data = await response.json();
 console.log(data)

    if (!data || !data[fromValute.toUpperCase()]) {
      console.log('Ошибка при получении данных для биткоина');
      return;
    }
      const result = amount / data[fromValute.toUpperCase()];
      return result.toFixed(8);  
  } else {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromValute}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.rates) {
      console.log('Ошибка при получении данных обменного курса');
      return;
    }

    const fromRate = data.rates[fromValute];
    const toRate = data.rates[toValute];

    if (!fromRate || !toRate) {
      console.log('Курс для одной из выбранных валют не найден');
      return;
    }

    const result = (amount * toRate) / fromRate;
    return result.toFixed(2);
  }
}


const addBal = (bank, value) => {
  if (typeof value !== 'number') {
      return "NO NUMBER"
  }
  
  switch (bank) {
      case "kaspi":
          kaspi += value;
          return kaspi;
      case "halyk":
          halyk += value;
          return halyk;
      case "simply":
          simply += value;
          return simply;
  }
};


const getBalByBank = (bank) => {
  switch (bank) {
    case "halyk":
      return halyk;
    case "simply":
        return simply;
    case "kaspi":
          return kaspi;
  
    default:
      break;
  }
}


module.exports = {
  getKaspi: () => kaspi,
  setKaspi: (value) => {kaspi = value},
  incrementKaspi: (value) => {kaspi += value},
  decrementKaspi: (value) => { kaspi -= value },

  getHalyk: () => halyk,
  setHalyk: (value) => {halyk = value},
  incrementHalyk: (value) => {halyk += value},
  decrementHalyk: (value) => { kaspi -= value },

  getSimply: () => simply,
  setSimply: (value) => {simply = value},
  incrementSimply: (value) => {simply += value},
  decrementSimply: (value) => { kaspi -= value },

   getBal,
   getBalByBank,
   addToHistory,
   getHistory: () => history,
   addBal};