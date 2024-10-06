import onChange from 'on-change';
import i18next from 'i18next';
import resourses from './locales/index.js';

const elements = {
  form: document.querySelector('.rss-form.text-body'),
  input: document.querySelector('.form-control.w-100'),
  inputLabel: document.querySelector('[for="url-input"]'),
  feedback: document.querySelector('.feedback.m-0'),
  submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
};

const caseSent = () => {
  console.log('sent');
  elements.input.focus();
  elements.submitButton.disabled = false;
  elements.feedback.textContent = 'RSS успешно добавлен';
  elements.input.value = '';
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
};

const caseSending = () => {
  console.log('sending');
  elements.submitButton.disabled = true;
};

const caseError = () => {
  // тут еще нажо будет добавить второй вариант валидации - requiered(всплывает модалка "Please fill in this field")
  // elements.submitButton.disabled = true;
  elements.feedback.classList.add('text-danger');
  elements.feedback.classList.remove('text-success');
  elements.feedback.textContent = 'errors.validation.invalidRSS';
  elements.inputLabel.innerText = 'the url name should stay, ubtil state isValid';
  elements.submitButton.disabled = true;
  elements.feedback.textContent = 'RSS уже существует';
  elements.inputLabel.innerText = 'the url name should stay, ubtil state isValid';
};

const caseFilling = () => {
  console.log('filling');
  elements.submitButton.disable = false;
  elements.input.focus();
};

const watch = (elements, i18n, state) => {
  const { t } = i18n;

  const watchedState = onChange(state, (path, value) => {
    // console.log(`path:${path}`);
    switch (path) {
      case 'form.isValid':
        caseSent();
        break;
      case ('form.error'):
        caseError();
        break;
      case ('feed'):
        // renderFeed();
        break;
      default:
        // throw new Error('unknown form status');
    }
  });

  const renderPosts = () => {

  };

  const renderFeed = () => {

  };

  const renderForm = () => {
    // i18next.init({
    //   resourses,
    // })
    //   .then(() => {
    //     const { t } = i18next;
    //     const title = document.createElement('h2');
    //     title.classList.add('text-white');
    //     title.textContent = t('title');
    //     elements.form.append(title);
    //   });
  };
  return {
    renderForm,
    watchedState,
  };
};

export default watch;
