export default (data) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(data, 'text/xml');
  const errorNode = content.querySelector('parsererror');
  if (errorNode) {
    console.error(errorNode);
  } else {
    return content;
  }
  throw new Error('Something went wrong during parsing phase');
};
