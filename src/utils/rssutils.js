import axios from 'axios';
import { uniqueId } from 'lodash';
import parser from './parser.js';
import { getErrorCode } from './utils.js';

export const getFeedsAndPostsData = (state, url) => {
  const parsedURL = new URL(url);
  axios.get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(parsedURL.href)}`))
    .then((response) => {
      const { feedData, postsData } = parser(response.data.contents);
      const feed = { ...feedData, id: uniqueId(), url: parsedURL.href };
      const posts = postsData.map((post) => ({ ...post, id: uniqueId(), feedId: feed.id }));
      /* eslint-disable */
    state.feeds.unshift(feed)
    state.posts = [...posts, ...state.posts];
    return state;
  })
  .catch((err) => {
    state.form.error = getErrorCode(err);
  });
}

export const updateRSS = (state, timeout = 2000) => {
  const promises = state.feeds.map((feed) => {
    axios.get((`https://allorigins.hexlet.app/get?url=${encodeURIComponent(feed.url)}`))
      .then((response) => {
        const { postsData } = parser(response.data.contents)
        const displayedPostLinks = state.posts.map((post) => post.url);
        const newPosts = postsData.filter((post) => !displayedPostLinks.includes(post.url));
        state.posts = [...newPosts, ...state.posts];
        return state;
      })
      .catch((err) => {
        state.form.error = getErrorCode(err);
      });
  });
  return Promise.all(promises)
    .then(() => {
      setTimeout(() => updateRSS(state), timeout);
    });
};
