export const renderErrors = (formElements, errorValue, i18n) => {
  const { feedback, input } = { ...formElements };
  feedback.classList.add('text-danger');
  feedback.classList.remove('text-success');
  feedback.textContent = i18n.t(errorValue);
  // input.focus();
};

export const caseSent = (elements, i18n) => {
  const { input, submitButton, feedback } = elements;
  input.focus();
  submitButton.disabled = false;
  input.disabled = false;
  input.value = '';
  feedback.textContent = i18n.t('success');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
};

export const caseSending = (elements, i18n) => {
  const { input, submitButton, feedback } = elements;
  submitButton.disabled = true;
  input.disabled = true;
  feedback.textContent = i18n.t('sending');
};

export const renderFormState = (elements, i18n, formCurrentState, errorValue) => {
  // console.log(formCurrentState);
  switch (formCurrentState) {
    case 'sending':
      caseSending(elements, i18n);
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
