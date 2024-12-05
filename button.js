const checkButton = () => {
    return [
        [
          { text: '$ Доллар', callback_data: 'usd' },
          { text: '€ Евро', callback_data: 'eur' },
        ],
        [
          { text: '₸ Тенге', callback_data: 'kzt' },
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

const valuteBack = () => {
  return [
    [
      { text: 'Назад', callback_data: 'back_to_valute' },
    ]
  ];
}

const bankBack = () => {
  return [
    [
      { text: 'Назад', callback_data: 'back_to_bank' },
    ]
  ];
}

const bank_selection = () => {
  return [
    [
      { text: '💳 Kaspi', callback_data: 'kaspi' },
    ],
    [
      { text: '🏦 Halyk', callback_data: 'halyk' },
    ],
    [
      { text: '💵 Simply', callback_data: 'simply' } 
    ],
    [
      { text: 'Назад', callback_data: 'back_to_start' },
    ]
    
  ];
}
const buttonHistory = () => {
  return [
    [
      { text: 'Назад', callback_data: 'back_to_start' },
    ],
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
          { text: '💳 Пополнение / 💸 Снятие', callback_data: 'replenish' }
        ]
      ];
}
module.exports = {checkButton, buttonsStart, valuteBack, bank_selection, bankBack, buttonHistory};
  