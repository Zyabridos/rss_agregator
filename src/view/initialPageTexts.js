export default (i18n) => {
  const header = document.querySelector('#header');
  header.textContent = i18n.t('interface.header');

  const description = document.querySelector('#description');
  // const description = document.querySelector('p.lead');
  // const description = document.querySelector('[p class="lead"]');
  description.textContent = i18n.t('interface.description');

  const submitButton = document.querySelector('#submitButton');
  submitButton.textContent = i18n.t('interface.submitButton');

  const example1 = document.querySelector('#example1');
  example1.textContent = i18n.t('interface.example1');

  const example2 = document.querySelector('#example2');
  example2.textContent = i18n.t('interface.example2');

  const closeModalButton = document.querySelector('#closeModalButton');
  closeModalButton.textContent = i18n.t('interface.closeModalButton');

  const readFullArticle = document.querySelector('#readFullArticle');
  readFullArticle.textContent = i18n.t('interface.readFullArticle');
};
