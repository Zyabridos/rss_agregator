import * as yup from 'yup';
import axios from 'axios';
import { uniqueId } from 'lodash';
import parser from './parser.js';
import { renderFeed, renderPosts, renderModalWindowDescription } from './view.js';

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
      console.log(content);
      const feed = {
        title: content.querySelector('title').textContent,
        // description: content.querySelector('.description').textContent,
        description: 'cannot read properties of null (reading textContent)',
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
      renderFeed(feed.title, feed.description);
      posts.map((post) => {
        renderPosts(post.id, post.title, post.description, post.url);
        renderModalWindowDescription(post.title, post.description, post.url);
        state.ui.viewedPostsIDs.unshift(post.id);
      });
    });
  // .catch((err) => console.error(err));
};

// установить таймаут, а само отлавливание постов в другую функцию
export const updateRSS = (state, url) => {
  setTimeout(() => {
    generateFeedsAndPosts(state, url);
  }, 500);
};
