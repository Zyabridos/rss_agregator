import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import i18next from 'i18next';
import watch from './view.js';
import resources from './locales/index.js';

export const initState = {
  form: {
    errors: [],
    rssFeedsUrls: [],
    currentState: 'filling',
    currentInput: {
      rssURL: '',
    },
    isValid: false,
  },
};

const schema = yup.object({
  url: yup.string().trim().url('It is not a valid URL').required('URL is required')
    .test('unique', 'RSS needs te be unique', (url) => new Set(url).size === url.length),
});

const app = async () => {
  const elements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
  };

  const defaultLang = 'ru';

  const i18n = i18next.createInstance();

  i18next.init({
    lng: defaultLang,
    debug: true,
    resources,
  })
    .then(() => console.log('i18n works...so far'))
    .then(() => {
      yup.setLocale({
        mixed: {
          // required: () => ({ key: 'errors.validation.required' }),
          required: () => ({ 0: 'errors.validation.required' }),
          url: () => ({ key: 'errors.validation.required' }),
          unique: () => ({ key: 'errors.validation.repeat' }),
        },
      });
    });

  const { watchedState, renderForm } = watch(elements, i18n, initState);

  renderForm();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(elements.form);
    const data = Object.fromEntries(formData);
    schema.validate(data, { abortEarly: false })
      .then(() => {
        console.log('Yup Success Validation');
        watchedState.form.rssFeedsUrls.push((data.url));
        watchedState.form.isValid = true;
      })
      .catch((yupError) => {
        const validationErrors = yupError.errors;
        watchedState.form.errors.push(validationErrors);
        watchedState.form.isValid = false;
        // console.log(watchedState.form.errors);
      })

      .catch((err) => console.error(`An error has occurred: ${err.message}`));
    console.log(watchedState.form.errors[0]);
  });
};

app();
