import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
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
export const validateDublicates = (url) => {
  const urls = initState.form.rssFeedsUrls;
  console.log(urls);
};

const schema = yup.object({
  name: yup
    .string()
    .url('The link must be a valid URL')
    .required('URL is required'),
});

export const yupValidation = (url) => schema
  .validate(url, { abortEarly: false })
  .then(() => {})
  .catch((validationError) => {
    const errors = validationError.inner.reduce((result, err) => {
      result[err.path] = err.message;
      return result;
    }, {});
    return Promise.reject(errors);
  });
