export default (data) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(data, 'text/xml');
  const errorNode = content.querySelector('parsererror');
  if (errorNode) {
    console.error(`parser error: ${errorNode}`);
  }
  return content;
};
