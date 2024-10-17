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

const getPostsData = (content) => Array.from(content.querySelectorAll('item'))
  .map((post) => ({
    title: post.querySelector('title').textContent,
    description: post.querySelector('description').textContent,
    url: post.querySelector('link').textContent,
    id: uniqueId(),
    feedId: 1,
  }));

const getFeedData = (content, url = '') => ({
  title: content.querySelector('title').textContent,
  description: content.querySelector('description').textContent,
  id: uniqueId(),
  url,
});

export const generateFeedsAndPosts = (state, url) => {
  const watchedState = state;
  return axios.get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`))
    .then((response) => {
      const content = parser(response.data.contents);
      if (!content) {
        return 'isNotRSS';
      }
      const feed = getFeedData(content, url);
      const posts = getPostsData(content);
      posts.feedId = feed.id;
      watchedState.feeds = [feed, ...watchedState.feeds];
      watchedState.posts = [posts, ...watchedState.posts];
    })
    .catch(() => 'network error');
};

export const updateRSS = (state, url, timeout = 500) => {
  const promises = state.feeds.map((feed) => axios
    .get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(feed.url)}`))
    .then((response) => {
      const content = parser(response.data.contents);
      const postsData = getPostsData(content);
      const feedId = feed.id;
    })
    .catch((error) => {
      console.log(error);
    }));
  Promise.all(promises)
    .then(() => {
      setTimeout(() => updateRSS(state), timeout);
    });
};
