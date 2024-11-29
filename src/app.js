import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import { validateRSS } from './utils/utils.js';
import { updateRSS, getFeedsAndPostsData } from './utils/rssutils.js';
import watch from './view/view.js';
import { formViewedPostsIDsArray } from './view/modalWindow.js';
import resources from './locales/index.js';
import addTranslations from './view/initialPageTexts.js';

const DEFAULTLNG = 'ru';
const UPDATETIMEOUTINTERVAL = 5000;

const initState = {
  lng: DEFAULTLNG,
  form: {
    error: '',
    isValid: false,
  },
  loadingStatus: {
    error: '',
    status: '',
  },
  feeds: [],
  posts: [],
  ui: {
    viewedPostsIDs: [],
    currentModalID: '',
  },
};

export default async () => {
  const formElements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),

    modalTitle: document.querySelector('.modal-header'),
    modalBody: document.querySelector('.modal-body.text-break'),
    modalWindow: document.querySelector('.modal-footer.btn-primary'),
  };

  const i18n = i18next.createInstance();
  i18n.init({
    resources,
    debug: true,
    lng: initState.lng,
  });

  addTranslations(i18n);

  const watchedState = watch(formElements, i18n, initState);

  updateRSS(watchedState, UPDATETIMEOUTINTERVAL);

  formElements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElements.form);
    const currentURL = formData.get('url').trim();
    const rssFeedsUrls = watchedState.feeds.map((feed) => feed.url);
    validateRSS(currentURL, rssFeedsUrls)
      .then(() => {
        watchedState.form.isValid = true;
      })
      .then(() => {
        getFeedsAndPostsData(watchedState, currentURL);
      })
      .catch((err) => {
        watchedState.form.error = err.message;
      });
  });
  formViewedPostsIDsArray(formElements, watchedState);
};
