import axios from 'axios';
import { uniqueId } from 'lodash';
import parser from './parser.js';
import { getErrorCode } from './utils.js';

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
      const feeds = getFeedData(content, url);
      const posts = getPostsData(content);
      watchedState.feeds = [feeds, ...watchedState.feeds];
      watchedState.posts = [...posts, ...watchedState.posts];
      return watchedState;
    })
    .catch((err) => {
      watchedState.form.error = getErrorCode(err);
    });
};

export const updateRSS = (state, timeout = 2000) => {
  const watchedState = state;
  const promises = watchedState.feeds.map((feed) => {
    axios.get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(feed.url)}`))
      .then((response) => {
        const content = parser(response.data.contents);
        const postsData = getPostsData(content);
        const displayedPostLinks = watchedState.posts.map((post) => post.url);
        const newPosts = postsData.filter((post) => !displayedPostLinks.includes(post.url));
        watchedState.posts = [...newPosts, ...state.posts];
        return watchedState;
      })
      .catch((err) => {
        watchedState.form.error = getErrorCode(err);
      });
  });
  return Promise.all(promises)
    .then(() => {
      setTimeout(() => updateRSS(state), timeout);
    });
};
