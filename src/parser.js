export default (data, mimeType) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(data, 'application/xml');
  const errorNode = content.querySelector('parsererror');
  if (errorNode) {
    console.error(errorNode);
  } else {
    return {
      // title - это заголовок поста
      // а description его описание, которое показывается в модальном окне при нажатии на кнопку "Просмотр"
      title: content.querySelector('title').textContent,
      description: content.querySelector('description').textContent,
    };
  }
};

// const xmlString = '<warning>Beware of the missing closing tag';
// const doc = parser.parseFromString(xmlString, 'application/xml');
// const errorNode = doc.querySelector('parsererror');
// if (errorNode) {
//   // parsing failed
// } else {
//   // parsing succeeded
// }

// const xmlString = '<warning>Beware of the tiger</warning>';
// const doc1 = parser.parseFromString(xmlString, 'application/xml');
// // XMLDocument

// const svgString = '<circle cx="50" cy="50" r="50"/>';
// const doc2 = parser.parseFromString(svgString, 'image/svg+xml');
// // XMLDocument

// const htmlString = '<strong>Beware of the leopard</strong>';
// const doc3 = parser.parseFromString(htmlString, 'text/html');
// // HTMLDocument

// console.log(doc1.documentElement.textContent);
// // "Beware of the tiger"

// console.log(doc2.firstChild.tagName);
// // "circle"

// console.log(doc3.body.firstChild.textContent);
// // "Beware of the leopard"
