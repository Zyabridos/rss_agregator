export default {
  translation: {
    interface: {
      header: 'RSS агрегатор',
      description: 'Начните читать RSS сегодня! Это легко, это красиво.',
      submitButton: 'Добавить',
      example1: 'Пример 1:  https://lorem-rss.hexlet.app/feed',
      example2: 'Пример 2:  https://meduza.io/rss2/all',
      closeModalButton: 'Закрыть',
      readFullArticle: 'Читать полностью',
    },
    success: 'RSS успешно загружен',
    sendingData: 'Загружаю RSS...',
    errors: {
      validation:
          {
            required: 'Не должно быть пустым',
            invalidURL: 'Ссылка должна быть валидным URL',
            repeat: 'RSS уже существует',
          },
    },
    loadingStatusError: {
      isNotRSS: 'Ресурс не содержит валидный RSS',
      networkError: 'Ошибка сети',
    },
    posts: {
      postsTitle: 'Посты',
      viewButton: 'Просмотр',
    },
    feeds: {
      feedTitle: 'Фиды',
    },
  },
};
