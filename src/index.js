import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import i18next from 'i18next';
import watch from './view.js';
import resources from './locales/index.js';

export const initState = {
  form: {
    errors: [erros.validation.key],
    rssFeedsUrls: [],
    currentState: 'filling',
    isValid: false,
  },
  feeds: [],
  posts: [
    {title: 'aa', description:  "bb"},
    {title: 'aa', description:  "bb"},
    {title: 'aa', description:  "bb"},
    {title: 'aa', description:  "bb"},
  ]
};

1. Пользователь ввел url
2. Валидация урла
3. Валидный url - отсылаем  запрос axios 
4. response.data (от axios)
5, Распарсили данные
5& В этом документе ао селекторам получаем данные

const schema = yup.string().trim().url('It is not a valid URL').required('errors.validation.required');
// .test('unique', 'RSS needs te be unique', (url) => new Set(url).size === url.length);
const validateESS = (url, urls) => {
  scema = yup.string().trim().url('It is not a valid URL').required('errors.validation.required')
    .notOne(urls);

  schema.validate()
    .then(validate, add to URLS)
    .catch();
};
const app = async () => {
  const elements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
  };
// валидный RSS
  const defaultLang = 'ru';

  const i18n = i18next.createInstance();

  i18next.init({
    lng: defaultLang,
    debug: true,
    resources,
  });

  const { watchedState, renderForm } = watch(elements, i18n, initState);

  renderForm();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(elements.form);
    const data = Object.fromEntries(formData);

    // schema.validate(data, { abortEarly: false })

    validateRSS(url = watchedState.form.input, urls = watchedState.form.rssFeedsUrls) => {

    }
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
