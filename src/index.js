import './styles.scss';
import 'bootstrap';
import * as bootstrap from 'bootstrap';

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const bodyClasses = ['d-flex', 'flex-cloumn', 'min-vh-100'];
document.body.classList.add(...bodyClasses);

const p = document.createElement('p');
p.innerText = 'Начните читать RSS сегодня! Это легко, это красиво.';
document.body.appendChild(p);
