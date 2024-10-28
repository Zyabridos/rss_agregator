export const caseSent = (formElements, i18n) => {
  const { input, submitButton, feedback } = formElements;
  input.focus();
  submitButton.disabled = false;
  input.value = '';
  feedback.textContent = i18n.t('success');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
};

export const caseSending = (formElements) => {
  const elements = { ...formElements };
  console.log('sending');
  elements.submitButton.disabled = true;
};

export const caseFilling = (formElements) => {
  const elements = { ...formElements };
  console.log('filling');
  elements.submitButton.disable = false;
  elements.input.focus();
};
