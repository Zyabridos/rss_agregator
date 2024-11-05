import onChange from 'on-change';
import {
  caseSending, caseSent, renderErrors, renderFormState,
} from './formState.js';
import renderPosts from './posts.js';
import { renderModal } from './modalWindow.js';
import renderFeed from './feed.js';

const renderForm = (elements, formCurrentState, i18n, errorValue) => {
  console.log(formCurrentState);
  switch (formCurrentState) {
    case 'error':
      renderErrors(elements, errorValue, i18n);
      console.log('errorrrrr');
      break;
    case 'sent':
      // renderFormState(elements, i18n, errorValue);
      // console.log('rendering form');
      caseSent(elements, i18n);
      console.log('sent');
      break;
    case 'sending':
      caseSending(elements, i18n);
      break;
    default:
      break;
  }
};

const watch = (formElements, i18n, state) => {
  const elements = { ...formElements };
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.currentState':
        renderFormState(elements, i18n, value, state.form.error);
        console.log(state.form);
        break;
      case 'feeds':
        renderFeed(state, i18n);
        break;
      case 'posts':
        renderPosts(formElements, i18n, state);
        break;
      case 'ui.viewedPostsIDs':
        renderModal(formElements, state);
        break;
      default:
        break;
    }
  });

  return watchedState;
};

export default watch;
