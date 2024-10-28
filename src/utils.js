import * as yup from 'yup';
import axios from 'axios';
import { uniqueId, differenceWith, isEqual } from 'lodash';
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
      const feeds = getFeedData(content, url);
      const posts = getPostsData(content);
      watchedState.feeds = [feeds, ...watchedState.feeds];
      watchedState.posts = [...posts, ...watchedState.posts];
    })
    .catch(() => 'network error');
};

export const updateRSS = (state, timeout = 61000) => {
  const watchedState = state;
  // generateFeedsAndPosts(watchedState, watchedState.rssFeddsUrls);
  console.log(watchedState);
  console.log('1');
  // console.log(watchedState);
  // console.log(state.feeds[0].url);
  // console.log(state);
  // console.log('1');
  // const promises =
  watchedState.feeds.map((feed) => console.log(feed));
  // axios
  // .get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(feed.url)}`))
  // .then((response) => {
  //   console.log('2');
  //   const content = parser(response.data.contents);
  //   const postsData = getPostsData(content);
  //   const postsWithCurrentId = state.posts
  //     .filter((post) => post.feedId === feed.id);
  //   const displayedPostLinks = postsWithCurrentId[0].map((post) => post.url);
  //   const newPosts = postsData.filter((post) => !displayedPostLinks.includes(post.url));
  //   state.posts = [...newPosts, ...state.posts];
  //   console.log('a');
  // })
  //   .catch((error) => {
  //     console.log(error);
  //   }));
  // return Promise.all(promises)
  //   .then(() => {
  //     setTimeout(() => updateRSS(state), timeout);
  //   });
};
