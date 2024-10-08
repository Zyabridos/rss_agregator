import onChange from 'on-change';
import i18next from 'i18next';
import resourses from './locales/index.js';

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const elements = {
  form: document.querySelector('.rss-form.text-body'),
  input: document.querySelector('.form-control.w-100'),
  inputLabel: document.querySelector('[for="url-input"]'),
  feedback: document.querySelector('.feedback.m-0'),
  submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
};

// const caseSent = (elements, i18n, t) => {
const caseSent = (i18n, t) => {
  console.log('sent');
  elements.input.focus();
  elements.submitButton.disabled = false;
  elements.feedback.textContent = 'RSS успешно добавлен';
  // elements.feedback.textContent = t('success');
  elements.input.value = '';
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
};

const caseSending = () => {
  console.log('sending');
  elements.submitButton.disabled = true;
};

const caseFilling = () => {
  console.log('filling');
  elements.submitButton.disable = false;
  elements.input.focus();
};

const caseError = (error, t) => {
  // тут еще нажо будет добавить второй вариант валидации - requiered(всплывает модалка "Please fill in this field")
  elements.feedback.classList.add('text-danger');
  elements.feedback.classList.remove('text-success');
  elements.feedback.textContent = 'errors.validation.invalidRSS';
  // elements.feedback.textContent = 'errors.validation.repeat';
  // elements.feedback.textContent = 'errors.validation.invalidURL';
};

export const renderFeed = (title, description) => {
  const feedsContainer = document.querySelector('.col-md-10.feeds');
  const cardDiv1 = document.createElement('div');
  cardDiv1.classList.add('card', 'border-0');
  const cardDiv2 = document.createElement('div');
  cardDiv2.classList.add('card-body');
  const h2Feed = document.createElement('h2');
  h2Feed.classList.add('card-title', 'h4');
  h2Feed.innerText = 'Фиды';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'border-0', 'border-end-0');
  const h3Description = document.createElement('h3');
  h3Description.classList.add('h6', 'm-0');
  h3Description.textContent = title;
  const pDescription = document.createElement('p');
  pDescription.classList.add('m-0', 'small', 'text-black-50');
  pDescription.textContent = description;

  li.appendChild(h3Description);
  li.appendChild(pDescription);
  ul.appendChild(li);
  cardDiv2.appendChild(h2Feed);
  cardDiv1.appendChild(cardDiv2);
  cardDiv1.appendChild(ul);
  feedsContainer.appendChild(cardDiv1);
};

export const renderViewPostButton = (id, t) => {
  const viewButton = document.createElement('button');
  setAttributes(viewButton, {
    type: 'button', 'data-id': id, 'data-bs-toggle': 'modal', 'data-bs-target': '#modal',
  });
  viewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  viewButton.innerText = 'Просмотр';
  // viewButton.innerText = t('viewPostButton');
  return viewButton;
};

const renderHref = (id, title, description, url) => {
  const href = document.createElement('a');
  // setAttributes(href, { href: url, 'data-id': '35' });
  setAttributes(href, { href: url, 'data-id': id });
  href.setAttribute('tagret', '_blank');
  href.setAttribute('rel', 'noopener noreferrer');
  href.classList.add('fw-bold');
  href.textContent = title;
  return href;
};

export const renderPosts = (id, title, description, url, t) => {
  const postsContainer = document.querySelector('.mx-auto.posts');
  const cardDiv2 = document.createElement('div');
  cardDiv2.classList.add('card', 'border-0');
  const h2DivContainer = document.createElement('div');
  h2DivContainer.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Посты';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  const viewButton = renderViewPostButton(id, t);
  const href = renderHref(id, title, description, url);
  document.querySelector('.mx-auto.posts').appendChild(cardDiv2);

  cardDiv2.appendChild(h2DivContainer);
  cardDiv2.appendChild(ul);
  h2DivContainer.appendChild(h2);
  ul.appendChild(li);
  li.appendChild(href);
  li.appendChild(viewButton);

  postsContainer.appendChild(cardDiv2);
};

export const renderModalWindowDescription = (title, description, url) => {
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;
  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = description;
};

const watch = (elements, i18n, state) => {
  const { t } = i18n;

  const watchedState = onChange(state, (path, value) => {
    // console.log(`path:${path}`);
    switch (path) {
      case 'isValid':
        caseSent();
        break;
      case ('form.error'):
        // caseError(error, t);
        break;
      case ('feed'):
        // renderFeed();
        break;
      default:
        // throw new Error('unknown form status');
    }
  });

  const renderForm = () => {
    // const { t } = i18next;
    // i18next.init({
    //   resourses,
    // })
    //   .then(() => {
    // const { t } = i18next;
    // const title = document.createElement('h2');
    // title.classList.add('text-white');
    // title.textContent = t('title');
    // elements.form.append(title);
    //   });
  };
  return {
    renderForm,
    watchedState,
  };
};

export default watch;
