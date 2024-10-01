import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import watch from './view.js';
import rusLangTest from './locales/ru.js';

const schema = yup.object({
  url: yup.string().trim().url('It is not an URL').required('URL is required'),
});

export const validateDublicates = async (url, urls) => new Promise((resolve, reject) => {
  if (urls.some((current) => current === url)) {
    reject(new Error('RSS уже существует!'));
  }
})
  .catch((e) => console.log(e));

const app = async () => {
  const initState = {
    form: {
      error: '',
      rssFeedsUrls: [],
      currentState: 'filling',
      currentInput: {
        rssURL: '',
      },
      isValid: false,
    },
  };

  const elements = {
    form: document.querySelector('.rss-form.text-body'),
    input: document.querySelector('.form-control.w-100'),
    inputLabel: document.querySelector('[for="url-input"]'),
    feedback: document.querySelector('.feedback.m-0'),
    submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
  };

  const watchedState = watch(elements, initState);

  const yupValidation = async (url) => {
    schema.validate(url)
      .then(() => {
        console.log('Successfull Yup Validation');
      })
      .catch((e) => {
        const errors = Array.from(e.errors);
        const validationError = errors.reduce((acc, current) => acc + current, []);
        console.log(`Yup Validation error occured:${validationError}`);
        watchedState.form.error = validationError;
      });
  };

  // elements.input.addEventListener('input', (e) => {
  //   watchedState.form.currentInput.rssURL = e.target.value;
  // });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const data = Object.fromEntries(formData);
    yupValidation(data)
      .then(() => {
        console.log('Succsessfult dublicates validation');
        watchedState.form.rssFeedsUrls.push((data.url));
        watchedState.form.isValid = true;
      })
      // .then((a, b) => {
      //   const currentInput = watchedState.form.currentInput.rssURL;
      //   const listOfRSS = watchedState.form.rssFeedsUrls;
      //   validateDublicates(currentInput, listOfRSS);
      // })

      .catch((err) => console.error(`An error has occurred: ${err.message}`));
  });
};

app();
