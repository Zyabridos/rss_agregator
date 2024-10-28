export default (formElements, i18n) => {
  const { input, submitButton, feedback } = formElements;
  input.focus();
  submitButton.disabled = false;
  input.value = '';
  feedback.textContent = i18n.t('success');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
};
