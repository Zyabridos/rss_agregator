import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import { validateRSS } from './utils/utils.js';
import { updateRSS, generateFeedsAndPosts } from './utils/rssutils.js';
import watch from './view/view.js';
import { renderSeenPost } from './view/modalWindow.js';
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

const DEFAULTLNG = 'ru';
const TIMEOUTINTERVAL = 2000;

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

    modalTitle: document.querySelector('.modal-header'),
    modalBody: document.querySelector('.modal-body.text-break'),
    modalWindow: document.querySelector('.modal-footer .btn-primary'),
  };

  const i18n = i18next.createInstance();
  i18n.init({
    resources,
    debug: true,
    lng: DEFAULTLNG,
  });
  const watchedState = watch(formElements, i18n, initState);

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
      .then(() => {
        generateFeedsAndPosts(watchedState, currentURL);
      })
      .catch((err) => {
        watchedState.form.isValid = false;
        watchedState.form.error = err.message;
      });
    updateRSS(watchedState, TIMEOUTINTERVAL);
  });

  renderSeenPost(formElements, watchedState);
};
