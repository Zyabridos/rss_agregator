import * as yup from 'yup';
import axios from 'axios';
import { uniqueId } from 'lodash';
import parser from './parser.js';

export const validateRSS = (url, urls) => {
  const schema = yup
    .string()
    .trim()
    .url('errors.validation.invalidURL')
    .required('errors.validation.required')
    .notOneOf(urls, 'errors.validation.repeat');
  return schema.validate(url);
};

// url можно и из стейта достать - переделать потом
export const generateFeedsAndPosts = (state, url) => {
  axios.get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`))
    .then((response) => {
      const content = parser(response.data.contents);
      const feed = {
        title: content.querySelector('title').textContent,
        description: content.querySelector('description').textContent,
      };
      const posts = Array.from(content.querySelectorAll('item'))
        .map((post) => ({
          title: post.querySelector('title').textContent,
          description: post.querySelector('description').textContent,
          url: post.querySelector('link').textContent,
          id: uniqueId(),
        }));
      state.feeds.unshift(feed);
      state.posts.unshift(posts);
    })
    .catch((err) => console.error(err));
};

export const updateRSS = (state, url) => {
  setTimeout(() => {
    generateFeedsAndPosts(state, url);
  }, 500);
};

// const sayHello = () => {
//   console.log('Hello, world!');
//   setTimeout(() => {
//     sayHello();
//   }, 500);
// };

// export const updateRSS = (state, url, timeout) => {
//   updateRSS(state, url);
//   setTimeout(() => {
//     updateRSS(state, url);
//   }, 500);
// };

// export const updateRSS = (state, url, timeout = 500) => {
//   updateRSS(state, url);
//   setTimeout(() => {
//     generateFeedsAndPosts(state, url);
//   }, timeout);
// };
