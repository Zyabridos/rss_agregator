import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import { validateRSS, getDataAndUpdateRSS } from './utils.js';
import watch from './view.js';
import resources from './locales/index.js';

const initState = {
  form: {
    // error: [],
    error: '',
    rssFeedsUrls: [],
    currentState: 'filling',
    isValid: false,
  },
  feeds: [],
  posts: [],
};

// надо будет или таймаут поменять на минуту,
// Или на что-то другое - проверь, передается ли где интервал апдейта с rss,
// или интервал апдейта устанавливаю я
const TIMEOUTINTERVAL = 2000;

const app = async () => {
  const elements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
    modalButton: document.querySelector('.btn.btn-outline-primary'),
  };

  const defaultLang = 'ru';

  const i18n = i18next.createInstance();
  i18next.init({
    lng: defaultLang,
    debug: true,
    resources,
  })
    .then(() => {
      const { watchedState, renderForm } = watch(elements, i18n, initState);

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(elements.form);
        const data = Object.fromEntries(formData);
        validateRSS(data.url, watchedState.form.rssFeedsUrls)
          .then(() => {
            watchedState.isValid = true;
            watchedState.form.rssFeedsUrls.push(data.url);
            watchedState.form.currentState = 'sent';
          })
          .then(() => {
            getDataAndUpdateRSS(watchedState, data.url, TIMEOUTINTERVAL);
          })
          .catch((err) => {
            watchedState.form.isValid = false;
            watchedState.form.error = err.message;
            alert(watchedState.form.error);
          });
      });
    });
};
app();
