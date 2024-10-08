import * as yup from 'yup';
import axios from 'axios';
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
// установить таймаут, а само отлавливание постов в другую функцию
export const getDataAndUpdateRSS = (state, url) => {
  axios.get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`))
    .then((response) => {
      const { feed, posts } = parser(response.data.contents);
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
