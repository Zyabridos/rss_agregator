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
      if (!content) {
        return 'isNotRSS';
      }
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
    .catch((err) => 'networkProblems');
};

export const updateRSS = (state, url, timeout = 500) => {
  generateFeedsAndPosts(state, url)
    .then(() => {
      setTimeout(() => {
        console.log('set Timeout');
        generateFeedsAndPosts(state, url);
      }, timeout);
    })
    .catch((err) => {
      console.error(err);
    });
};
