import * as yup from 'yup';

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
  if (error === 'isNotRSS') {
    return 'loadingStatusError.isNotRSS'
  }
  if (error === 'Network Error') {
    return 'loadingStatusError.networkError'
  }
  return error?? 'unknown error has occured';
};

export const proxifyURL = (url) => {
  const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlWithProxy.searchParams.set('url', url);
  urlWithProxy.searchParams.set('disableCache', 'true');
  return urlWithProxy.toString();
} 

