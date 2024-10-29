import * as yup from 'yup';
import axios from 'axios';

export const validateRSS = (url, urls) => {
  const schema = yup
    .string()
    .trim()
    .url('errors.validation.invalidURL')
    .required('errors.validation.required')
    .notOneOf(urls, 'errors.validation.repeat');
  return schema.validate(url);
};

export const setAttributes = (element, attributes) => {
  /* eslint-disable */
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

export const getErrorCode = (error) => {
  if (error.isNotRSS) {
    return 'errors.isNotRSS';
  }
  if (axios.isAxiosError(error)) {
    return 'errors.networkError';
  }
  return error.message ?? 'unknown error has occured';
};

