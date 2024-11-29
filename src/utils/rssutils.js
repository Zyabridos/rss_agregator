import axios from 'axios';
import { uniqueId } from 'lodash';
import parser from './parser.js';
import { getErrorCode, proxifyURL } from './utils.js';

const TIMEOUTINTERVAL = 4500;
export const getFeedsAndPostsData = (state, url, timeoutInterval = TIMEOUTINTERVAL) => {
  const watchedState = state;
  watchedState.loadingStatus = { status: 'sending', error: '' };
  const proxedURL = proxifyURL(url);
  return axios.get(proxedURL, { signal: AbortSignal.timeout(timeoutInterval) })
    .then((response) => {
      const { feedData, postsData } = parser(response.data.contents);
      const feed = { ...feedData, id: uniqueId(), url };
      const posts = postsData.map((post) => ({ ...post, id: uniqueId(), feedId: feed.id }));

      watchedState.feeds.unshift(feed);
      watchedState.posts = [...posts, ...watchedState.posts];
      watchedState.loadingStatus = { status: 'sent', error: '' };
      return watchedState;
    })
    .catch((err) => {
      watchedState.loadingStatus = { error: getErrorCode(err.message), status: 'error' };
    });
};

export const updateRSS = (state, updateTimeout, timeoutInterval = TIMEOUTINTERVAL) => {
  const watchedState = state;
  const promises = watchedState.feeds.map(
    (feed) => axios.get(proxifyURL(feed.url), { signal: AbortSignal.timeout(timeoutInterval) })
      .then((response) => {
        const { postsData } = parser(response.data.contents);
        const displayedPostLinks = watchedState.posts.map((post) => post.url);
        const newPosts = postsData.filter((post) => !displayedPostLinks.includes(post.url));
        watchedState.posts = [...newPosts, ...watchedState.posts];
        return watchedState;
      })
      .catch((err) => {
        watchedState.loadingStatus = { error: getErrorCode(err.message), status: 'error' };
      }),
  );
  return Promise.all(promises)
    .then(() => {
      setTimeout(() => updateRSS(watchedState), updateTimeout);
    });
};
