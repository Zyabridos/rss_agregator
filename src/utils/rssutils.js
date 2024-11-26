import axios from 'axios';
import { uniqueId } from 'lodash';
import parser from './parser.js';
import { getErrorCode, proxifyURL } from './utils.js';

const TIMEOUTINTERVAL = 5000;
export const getFeedsAndPostsData = (state, url, timeoutInterval = TIMEOUTINTERVAL) => {
  state.loadingStatus = { status: 'sending', error: '' };
  const proxedURL = proxifyURL(url);
  return axios.get(proxedURL, { signal: AbortSignal.timeout(timeoutInterval) })
    .then((response) => {
      const { feedData, postsData } = parser(response.data.contents);
      const feed = { ...feedData, id: uniqueId(), url };
      const posts = postsData.map((post) => ({ ...post, id: uniqueId(), feedId: feed.id }));

      state.feeds.unshift(feed);
      state.posts = [...posts, ...state.posts];
      state.loadingStatus = { status: 'sent', error: '' };
      return state;
    })
    .catch((err) => {
      state.loadingStatus = { error: getErrorCode(err.message), status: 'error' };
    });
};

export const updateRSS = (state, updateTimeout, timeoutInterval = TIMEOUTINTERVAL) => {
  const promises = state.feeds.map((feed) => axios.get(proxifyURL(feed.url), { signal: AbortSignal.timeout(timeoutInterval) })
    .then((response) => {
      const { postsData } = parser(response.data.contents);
      const displayedPostLinks = state.posts.map((post) => post.url);
      const newPosts = postsData.filter((post) => !displayedPostLinks.includes(post.url));
      state.posts = [...newPosts, ...state.posts];
      return state;
    })
    .catch((err) => {
      state.loadingStatus = { error: getErrorCode(err.message), status: 'error' };
    }));
  return Promise.all(promises)
    .then(() => {
      setTimeout(() => updateRSS(state), updateTimeout);
    });
};
