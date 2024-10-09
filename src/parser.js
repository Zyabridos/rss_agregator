export default (data) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(data, 'text/xml');
  const errorNode = content.querySelector('parsererror');
  if (errorNode) {
    // const error = new Error(errorNode.textContent);
    // error.isNotRSS = true;
    // throw error;
    return false;
  }
  return content;
};
