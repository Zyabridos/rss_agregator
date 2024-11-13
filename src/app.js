import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import { validateRSS } from './utils/utils.js';
import { updateRSS, getFeedsAndPostsData } from './utils/rssutils.js';
import watch from './view/view.js';
import { getCurrentModalID } from './view/modalWindow.js';
import resources from './locales/index.js';

const initState = {
  form: {
    error: '',
    currentState: 'filling',
    isValid: false,
  },
  feeds: [],
  posts: [],
  ui: {
    viewedPostsIDs: [],
    currentModalID: '',
  },
};

const DEFAULTLNG = 'ru';
const TIMEOUTINTERVAL = 1000;

export default async () => {
  const formElements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
    postsContainer: document.querySelector('.posts'),

    modalTitle: document.querySelector('.modal-header'),
    modalBody: document.querySelector('.modal-body.text-break'),
    modalWindow: document.querySelector('.modal-footer.btn-primary'),
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
    const currentURL = data.url.trim();
    const rssFeedsUrls = watchedState.feeds.map((feed) => feed.url);
    watchedState.form.currentState = 'sending';
    validateRSS(currentURL, rssFeedsUrls)
      .then(() => {
        watchedState.form.isValid = true;
        getFeedsAndPostsData(watchedState, currentURL);
        watchedState.form.currentState = 'sent';
      })
      .catch((err) => {
        watchedState.form.error = err.message;
        watchedState.form.currentState = 'error';
      });
    updateRSS(watchedState)
      .then(() => {
        setTimeout(() => updateRSS(watchedState), TIMEOUTINTERVAL);
      });
  });
  getCurrentModalID(formElements, watchedState);
};
