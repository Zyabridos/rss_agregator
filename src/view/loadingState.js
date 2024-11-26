import { renderPostsBody } from './posts.js';
import renderErrors from './errorsHandler.js';

const caseSent = (elements, i18n) => {
  const { input, submitButton, feedback } = elements;
  input.focus();
  submitButton.disabled = false;
  input.disabled = false;
  input.value = '';
  feedback.textContent = i18n.t('success');
  feedback.classList.remove('text-danger');
  feedback.classList.remove('text-info');
  feedback.classList.add('text-success');
  renderPostsBody(elements, i18n);
};

const caseSending = (elements) => {
  const { input, submitButton, feedback } = elements;
  submitButton.disabled = true;
  input.disabled = true;
  feedback.classList.add('text-info');
};

export default (elements, i18n, loadingStatus) => {
  switch (loadingStatus.status) {
    case 'sending':
      caseSending(elements);
      break;
    case 'sent':
      caseSent(elements, i18n);
      break;
    case 'error':
      renderErrors(loadingStatus.error, elements, i18n);
      break;
    default:
      throw new Error(`Unknown state of loading process: ${loadingStatus}`);
  }
};
