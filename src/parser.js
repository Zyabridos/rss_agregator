import { uniqueId } from 'lodash';

export default (data, mimeType) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(data, 'text/xml');
  const errorNode = content.querySelector('parsererror');
  if (errorNode) {
    console.error(errorNode);
  } else {
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
    return { feed, posts };
  }
};
