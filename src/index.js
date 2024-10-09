import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import {
  validateRSS, updateRSS, generateFeedsAndPosts,
} from './utils.js';
import watch from './view.js';
import resources from './locales/ru.js';

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
const TIMEOUTINTERVAL = 1000;

const app = async () => {
  const formElements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
    modalButton: document.querySelector('.btn.btn-outline-primary'),
    modalButtonContainer: document.querySelector('.col-md-10.posts'),
    href: document.querySelector('.fw-bold'),
  };

  const i18n = i18next.createInstance();
  i18n.init(resources);
  const watchedState = watch(formElements, i18n, initState);

  const errorHandler = (errorMessage) => {
    switch (errorMessage) {
      case 'isNotRSS':
        watchedState.form = { state: 'filling', error: errorMessage };
        break;
      case 'networkError':
        watchedState.form = { state: 'filling', error: errorMessage };
        break;
      default:
        throw new Error(`Unknown error has occured${errorMessage}`);
    }
  };

  formElements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formElements.form);
    const data = Object.fromEntries(formData);
    const currentURL = (data.url).trim();
    validateRSS(currentURL, watchedState.form.rssFeedsUrls)
      .then(() => {
        watchedState.isValid = true;
        watchedState.form.currentState = 'sending';
        watchedState.form.rssFeedsUrls.push(currentURL);
        watchedState.form.currentState = 'sent';
      })
      .catch((err) => {
        watchedState.form.isValid = false;
        watchedState.form.error = err.message;
      })
      .then(() => {
        // updateRSS(watchedState, currentURL, TIMEOUTINTERVAL);
        updateRSS(watchedState, currentURL);
        if ('isNotRss') {
          watchedState.form = { error: 'isNotRSS', isValid: false, currentState: 'filling' };
        }
      })
      .catch((error) => {
        if ('networkError') {
          watchedState.form = { error: 'networkError', isValid: false, currentState: 'error' };
        } else throw error;
      });
    // .catch((err) => {
    //   watchedState.form.isValid = false;
    //   watchedState.form.error = err.message;
    // });
    // generateFeedsAndPosts(watchedState, currentURL);
  });
  formElements.modalButtonContainer.addEventListener('click', (e) => {
    // ну это работает только если на ссылку нажимать, надо еще и по elements.modalButton
    e.target.classList.remove('fw-bold');
    e.target.classList.add('fw-normal', 'link-secondary');
  });
  // });
};
app();
