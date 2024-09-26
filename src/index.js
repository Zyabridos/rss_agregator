import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import initView from './view.js';

const initState = {
  form: {
    error: '',
    rssFeedsUrls: [],
    currentState: 'filling',
    inputValues: {
      name: '',
    },
    isValid: false,
  },
};

export const validateDublicates = (url, urls) => {
  new Promise((resolve, reject) => {
    if (urls.some((current) => current === url)) {
      reject(new Error('RSS уже существует!'));
    }
  }).catch((error) => console.log(error));
};

const schema = yup.object({
  url: yup
    .string()
    .trim()
    .url('It is not an URL')
    .required('URL is required'),
});

export const yupValidation = (url) => {
  schema.validate(url)
    .then(() => console.log('Successfull Yup Validation'))
    .catch((e) => {
      const errors = e.inner.reduce((result, error) => {
        const { path, message } = error;
        result[path] = message;

        return [
          ...result,
          { path: message },
        ];
      }, {});
    });
};

console.log(yupValidation({ url: 'nof' }));

console.log(yupValidation('nof'));
