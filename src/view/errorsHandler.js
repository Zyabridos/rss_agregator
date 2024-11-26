export default (errorValue, elements, i18n) => {
  const { feedback, input, submitButton } = { ...elements };
  feedback.classList.add('text-danger');
  feedback.classList.remove('text-success');
  feedback.textContent = i18n.t(errorValue);
  input.focus();
  submitButton.disabled = false;
};
