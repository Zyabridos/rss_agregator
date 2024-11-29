export default (i18n) => {
  const title = document.querySelector('title');
  title.textContent = i18n.t('interface.header');
  const header = document.querySelector('#header');
  header.textContent = i18n.t('interface.header');

  const description = document.querySelector('#description');
  description.textContent = i18n.t('interface.description');

  const submitButton = document.querySelector('#submitButton');
  submitButton.textContent = i18n.t('interface.submitButton');

  const example = document.querySelector('#example');
  example.textContent = i18n.t('interface.example');

  const closeButton = document.querySelector('#closeButton');
  closeButton.textContent = i18n.t('interface.closeButton');

  const fullArticle = document.querySelector('#fullArticle');
  fullArticle.textContent = i18n.t('interface.fullArticle');
};
