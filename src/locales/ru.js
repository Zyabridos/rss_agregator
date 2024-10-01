import i18next from 'i18next';

export default {
  translation: {
    title: 'RSS агрегатор',
    subtitle: 'Начните читать RSS сегодня! Это легко, это красиво.',
    inputField: 'Ссылка RSS',
    feedbacks: {
      feedbackSuccess: 'RSS успешно загружен',
      feedbackInvalidUrl: 'Ссылка должна быть валидным URL',
      feedbackRepeat: 'RSS уже существует',
      feedbackNoRSS: 'Ресурс не содержит валидный RSS',
      feedbackEmpty: 'Не должно быть пустым',
    },
    submit: 'Добавить',
  },
};

i18next.init({
  languages: {
    en: 'English',
    ru: 'Русский',
  },
  buttons: {
    counter: {
      count_one: '{{count}} click',
      count_other: '{{count}} clicks',
    },
    reset: 'Reset',
  },
});
