import onChange from 'on-change';
import renderFormState from './formState.js';
import renderPosts, { renderPostsBody } from './posts.js';
import { renderModal } from './modalWindow.js';
import renderFeed from './feed.js';

const render = (formElements, i18n, state) => {
  const elements = { ...formElements };
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.currentState':
        renderFormState(elements, i18n, value, state.form.error);
        break;
      case 'form.isValid':
        renderPostsBody(elements, i18n);
        break;
      case 'feeds':
        renderFeed(state, i18n);
        break;
      case 'posts':
        renderPosts(elements, i18n, state);
        break;
      case 'ui.currentModalID':
        renderModal(formElements, state);
        break;
      case 'ui.viewedPostsIDs':
        break;
      default:
        break;
    }
  });

  return watchedState;
};

export default render;
