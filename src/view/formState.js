const renderErrors = (formElements, errorValue, i18n) => {
  const { feedback, input, submitButton } = { ...formElements };
  feedback.classList.add('text-danger');
  feedback.classList.remove('text-success');
  feedback.textContent = i18n.t(errorValue);
  input.focus();
  input.disabled = false;
  submitButton.disabled = false;
};

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
};

const caseSending = (elements) => {
  const { input, submitButton, feedback } = elements;
  submitButton.disabled = true;
  input.disabled = true;
  feedback.classList.add('text-info');
};

export default (elements, i18n, formCurrentState, errorValue) => {
  switch (formCurrentState) {
    case 'sending':
      caseSending(elements);
      break;
    case 'sent':
      caseSent(elements, i18n);
      break;
    case 'error':
      renderErrors(elements, errorValue, i18n);
      break;
    default:
      throw new Error(`Unknown state of form: ${formCurrentState}`);
  }
};
