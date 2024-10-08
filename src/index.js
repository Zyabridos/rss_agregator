import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import {
  validateRSS, updateRSS,
} from './utils.js';
import watch from './view.js';
import resources from './locales/index.js';

const initState = {
  form: {
    error: '',
    rssFeedsUrls: [],
    currentState: 'filling',
    isValid: false,
  },
  feeds: [],
  posts: [],
  ui: {
    viewedPostsIDs: [],
  },
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
    modalButtonContainer: document.querySelector('.col-md-10.posts'),
    href: document.querySelector('.fw-bold'),
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
        const currentURL = (data.url).trim();
        validateRSS(currentURL, watchedState.form.rssFeedsUrls)
          .then(() => {
            watchedState.isValid = true;
            watchedState.form.currentState = 'sending';
            watchedState.form.rssFeedsUrls.push(currentURL);
            watchedState.form.currentState = 'sent';
          })
          .then(() => {
            updateRSS(watchedState, currentURL);
          })
          .catch((err) => {
            watchedState.form.isValid = false;
            watchedState.form.error = err.message;
            alert(watchedState.form.error);
          });
        // generateFeedsAndPosts(watchedState, currentURL);
      });
      elements.modalButtonContainer.addEventListener('click', (e) => {
        // ну это работает только если на ссылку нажимать, надо еще и по elements.modalButton
        e.target.classList.remove('fw-bold');
        e.target.classList.add('fw-normal', 'link-secondary');
      });
    });
};
app();
