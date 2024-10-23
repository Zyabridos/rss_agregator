import i18next from 'i18next';
import { ModalTitle } from 'react-bootstrap';
import {
  validateRSS, updateRSS, generateFeedsAndPosts,
} from './utils.js';
import watch, { renderModal } from './view.js';
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

export default async () => {
  const formElements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
    postButton: document.querySelector('.btn.btn-outline-primary.btn-sm'),
    postLI: document.querySelector('.list-group-item.d-flex'),
    postsContainer: document.querySelector('.posts'),
    href: document.querySelector('.fw-bold'),

    ModalTitle: document.querySelector('.modal-header'),
    modalBody: document.querySelector('.modal-body.text-break'),
    modalWindow: document.querySelector('.modal-footer .btn-primary'),
  };

  const i18n = i18next.createInstance();
  i18n.init(resources);
  const watchedState = watch(formElements, i18n, initState);
  let currentURL;
  formElements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formElements.form);
    const data = Object.fromEntries(formData);
    currentURL = (data.url).trim();
    validateRSS(currentURL, watchedState.form.rssFeedsUrls)
      .then(() => {
        watchedState.isValid = true;
        watchedState.form.currentState = 'sending';
        watchedState.form.rssFeedsUrls.push(currentURL);
        watchedState.form.currentState = 'sent';
      })
      .catch((err) => {
        watchedState.form = { isValid: false, error: err.message };
      })
      .then(() => {
        generateFeedsAndPosts(watchedState, currentURL);
        console.log(watchedState);
        // if ('isNotRss') {
        //   watchedState.form = { error: 'isNotRSS', isValid: false, currentState: 'filling' };
        // }
      })
      .catch((error) => {
        if ('networkError') {
          watchedState.form = { error: 'networkError', isValid: false, currentState: 'error' };
        }
      })
      .catch((err) => {
        watchedState.form.isValid = false;
        watchedState.form.error = err.message;
      });
  });
  formElements.postButton = document.querySelector('.btn.btn-outline-primary.btn-sm');
  formElements.postsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
      const postID = e.target.getAttribute('data-id');
      watchedState.ui.viewedPostsIDs.push(postID);
    }
  });
  updateRSS(watchedState, currentURL, TIMEOUTINTERVAL);
};
