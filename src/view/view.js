import onChange from 'on-change';
import caseSent from './formState.js';
import renderPosts from './posts.js';
import { renderModal } from './modalWindow.js';
import renderFeed from './feed.js';

const renderErrors = (formElements, errorValue, i18n) => {
  const { feedback, input } = { ...formElements };
  feedback.classList.add('text-danger');
  feedback.classList.remove('text-success');
  feedback.textContent = i18n.t(errorValue);
  input.focus();
};

const watch = (formElements, i18n, state) => {
  const elements = { ...formElements };
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'isValid':
        caseSent(elements, i18n);
        break;
      case 'form.error':
        renderErrors(elements, value, i18n);
        break;
      case 'feeds':
        value.forEach((feed) => {
          renderFeed(feed.title, feed.description);
        });
        break;
      case 'posts':
        renderPosts(state, formElements);
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
