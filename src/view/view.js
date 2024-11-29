import onChange from 'on-change';
import { renderModal } from './modalWindow.js';
import renderPosts from './posts.js';
import renderFeed from './feed.js';
import renderLoadingStatus from './loadingState.js';
import renderErrors from './errorsHandler.js';

const render = (formElements, i18n, state) => {
  const elements = { ...formElements };
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.error':
        renderErrors(value, elements, i18n);
        break;
      case 'feeds':
        renderFeed(state, i18n);
        break;
      // case 'posts':
        // renderPosts(i18n, state);
        // break;
      case 'ui.currentModalID':
        renderModal(elements, state);
        break;
      case 'loadingStatus':
        renderLoadingStatus(elements, i18n, value);
        break;
      default:
        break;
    }
  });
  return watchedState;
};

export default render;
