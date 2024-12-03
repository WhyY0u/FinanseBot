const checkButton = () => {

    return [
        [
          { text: '$ Доллар', callback_data: 'usd' },
          { text: '€ Евро', callback_data: 'eur' },
        ],
        [
          { text: '₸ Теньге', callback_data: 'kzt' },
          { text: '₽ Рубли', callback_data: 'rub' },
        ],
        [
          { text: '£ Фунт стерлингов', callback_data: 'gbp' },
          { text: '₿ Биткойн', callback_data: 'btc' },
        ],
        [
          { text: 'Назад', callback_data: 'back_to_start' },
        ]
      ];
}

const buttonsStart = () => {
    return [
        [
          { text: '👨‍💻 Мои счета', callback_data: 'check' },
        ],
        [
          { text: '📊 Статистика', callback_data: 'stats' },
        ],
        [
          { text: '🏦 Банки', callback_data: 'banks' }
        ]
      ];
    
}
module.exports = {checkButton, buttonsStart};
  