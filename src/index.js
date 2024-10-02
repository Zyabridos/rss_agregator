import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import i18next from 'i18next';
import watch from './view.js';
import resources from './locales/ru.js';

export const initState = {
  form: {
    // errors: '',
    errors: {},
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
    .test('Unique', 'RSS needs te be unique', (url) => new Set(url).size === url.length),
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
    .then(() => console.log('i18n works...so far'));

  yup.setLocale({
    url: () => ({ key: 'feedbacks.feedbackInvalidUrl' }),
    // url: () => ({ 0: { key: 'feedbacks.feedbackInvalidUrl' } }),
    required: () => ({ key: 'feedbacks.feedbackEmpty' }),
  });

  const { watchedState, renderForm } = watch(elements, i18n, initState);

  renderForm();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const data = Object.fromEntries(formData);
    console.log(data);
    schema.validate(data)
      .then(() => {
        console.log('Yup Success Validation');
        watchedState.form.rssFeedsUrls.push((data.url));
        watchedState.form.isValid = true;
      })
      .catch((yupError) => {
        const { path, message } = yupError;
        watchedState.form.errors[path] = message;
      });
    // .catch((err) => {
    //   const validationErrors = err.inner.reduce((acc, cur) => {
    //     const { path, message } = cur;
    //     const errorData = acc[path] || [];
    //     return { ...acc, [path]: [...errorData, message] };
    //   }, {});
    //   watchedState.form.errors = validationErrors;
    // });
    // console.log(new Set((watchedState.form.errors)));
    console.log((watchedState.form.errors));

    // .catch((err) => console.error(`An error has occurred: ${err.message}`));
  });
};

app();
