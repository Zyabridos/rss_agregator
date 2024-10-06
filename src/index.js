import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import watch from './view.js';
import resources from './locales/index.js';
import parser from './parser.js';

export const initState = {
  form: {
    // error: [],
    error: '',
    rssFeedsUrls: [],
    currentState: 'filling',
    isValid: false,
  },
  feeds: [],
  posts: [
    { title: 'aa', description: 'bb' },
    { title: 'aa', description: 'bb' },
    { title: 'aa', description: 'bb' },
    { title: 'aa', description: 'bb' },
  ],
};

const testFeed = 'https://lorem-rss.hexlet.app/feed';
const testURL = new URL(testFeed);
const getData = (url) => {
  axios.get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`))
    .then((response) => {
      const data = parser(response.data.contents);
    })
    .catch((err) => console.error(err));
};

getData(testURL);
// 1. Пользователь ввел url
// 2. Валидация урла
// 3. Валидный url - отсылаем  запрос axios
// 4. response.data (от axios)
// 5, Распарсили данные
// 5& В этом документе ао селекторам получаем данные

const validateRSS = (url, urls) => {
  const schema = yup
    .string()
    .trim()
    // .url('errors.validation.invalidURL')
    .url('errors.validation.invalidURL')
    .required('errors.validation.required')
    .notOneOf(urls, 'errors.validation.repeat');
  return schema.validate(url);
};

const app = async () => {
  const elements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
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

      renderForm();

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
          .catch((err) => {
            watchedState.form.isValid = false;
            watchedState.form.error = err.message;
            alert(watchedState.form.error);
          });
      });
    });
};
app();
