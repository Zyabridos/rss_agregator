import onChange from 'on-change';
import { validateDublicates, yupValidation } from './index.js';

const initState = {
  form: {
    error: '',
    rssFeedsUrls: [],
    currentState: 'filling',
    isValid: false,
    inputValue: '',
  },
};

const elements = {
  form: document.querySelector('.rss-form.text-body'),
  input: document.querySelector('.form-control.w-100'),
  inputLabel: document.querySelector('[for="url-input"]'),
  feedback: document.querySelector('.feedback.m-0'),
  submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
};

const updateState = () => {
  elements.feedback.textContent = '';
  const { currentState } = initState.form;
  switch (currentState) {
    case ('sent'):
      console.log('sent');
      elements.input.focus();
      elements.submitButton.disabled = false;
      elements.feedback.textContent = 'RSS успешно добавлен';
      elements.input.value = '';
      elements.feedback.classList.remove('danger', 'text-danger');
      elements.feedback.classList.add('text-success');
      break;
    case ('sending'):
      console.log('sending');
      elements.submitButton.disabled = true;
      break;
    case ('invalid RSS'):
      elements.submitButton.disabled = true;
      elements.feedback.textContent = 'Ссылка должна быть валидным URL';
      elements.inputLabel.innerText = 'the url name should stay, ubtil state isValid';
      break;
    case ('already exists rss'):
      elements.submitButton.disabled = true;
      elements.feedback.textContent = 'RSS уже существует';
      elements.inputLabel.innerText = 'the url name should stay, ubtil state isValid';
      break;
    case ('filling'):
      // console.log('filling');
      elements.submitButton.disable = false;
      elements.input.focus();
      break;
    default:
      throw new Error(`Unknown state of form: ${currentState}`);
  }
};

const initView = (state) => {
  const watchedState = onChange(initState, (path) => {
    if (path === 'form.isValid') {
      initState.form.rssFeedsUrls.map((feed) => {
        validateDublicates(feed, initState.form.rssFeedsUrls)
          .then((error) => {
            initState.form.error = error;
            updateState();
          })
          .catch((error) => console.error(error));
      });
    }
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const data = Object.fromEntries(formData);
    if (initState.form.error === '') {
      initState.form.currentState = 'sending';
      initState.form.rssFeedsUrls.push(data.url);
      initState.form.currentState = 'sent';
    }
    updateState();
    // console.log(initState.form.rssFeedsUrls);
    // console.log(initState.form.currentState);
    // console.log(data.url);
  });
  return watchedState;
};

export default initView();
