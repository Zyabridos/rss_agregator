import onChange from 'on-change';
import { renderErrors, renderFormState } from './formState.js';
import renderPosts from './posts.js';
import { renderModal } from './modalWindow.js';
import renderFeed from './feed.js';

const watch = (formElements, i18n, state) => {
  const elements = { ...formElements };
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.error':
        renderErrors(elements, value, i18n);
        break;
      case 'form.currentState':
        renderFormState(elements, i18n, value);
        break;
      case 'feeds':
        value.forEach((feed) => {
          renderFeed(feed.title, feed.description, i18n);
        });
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
