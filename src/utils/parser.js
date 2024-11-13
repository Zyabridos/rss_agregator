export default (data) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(data, 'text/xml');
  const errorNode = content.querySelector('parsererror');
  if (errorNode) {
    const error = new Error('isNotRSS');
    error.isNotRSS = true;
    throw error;
  } else {
    const feedData = {
      feedTitle: content.querySelector('title').textContent,
      description: content.querySelector('description').textContent,
    };
    const postsData = Array.from(content.querySelectorAll('item'))
      .map((post) => ({
        title: post.querySelector('title').textContent,
        description: post.querySelector('description').textContent,
        url: post.querySelector('link').textContent,
      }));
    return { feedData, postsData };
  }
};
