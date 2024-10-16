import onChange from 'on-change';

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const caseSent = (formElements, i18n) => {
  console.log('sent');
  const elements = { ...formElements };
  elements.input.focus();
  elements.submitButton.disabled = false;
  elements.input.value = '';
  elements.feedback.textContent = i18n.t('success');
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
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

export const renderViewPostButton = (id) => {
  const viewButton = document.createElement('button');
  setAttributes(viewButton, {
    type: 'button', 'data-id': id, 'data-bs-toggle': 'modal', 'data-bs-target': '#modal',
  });
  viewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  viewButton.innerText = 'Просмотр';
  return viewButton;
};

const renderHrefPost = (id, title, description, url) => {
  const href = document.createElement('a');
  setAttributes(href, { href: url, 'data-id': id });
  href.setAttribute('tagret', '_blank');
  href.setAttribute('rel', 'noopener noreferrer');
  href.classList.add('fw-bold');
  href.textContent = title;
  return href;
};

const renderPostsBody = () => {
  const postsContainer = document.querySelector('.mx-auto.posts');
  const divContainer = document.createElement('div');
  divContainer.classList.add('card', 'border-0');

  const h2Body = document.createElement('div');
  h2Body.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.textContent = 'Посты';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  postsContainer.appendChild(divContainer);
  divContainer.appendChild(h2Body);
  h2Body.appendChild(h2);

  divContainer.appendChild(ul);
};
// не мое
const createPostButton = (id, t) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('type', 'button');
  button.setAttribute('data-id', id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.textContent = t('viewPostButton');
  return button;
};
// не мое
const createPostLink = (url, id, title, feedId) => {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('data-id', id);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute('id', feedId);
  link.classList.add('fw-bold');
  link.textContent = title;
  return link;
};
// не мое
const createPostElems = (posts, t) => posts.map((post) => {
  const postCard = document.createElement('li');
  postCard.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-start',
    'border-0',
    'border-end-0',
  );
  const link = createPostLink(post.link, post.id, post.title, post.feedId);
  const button = createPostButton(post.id, t);
  postCard.append(link, button);

  return postCard;
});
const createPostList = (postElems, t) => {
  const postHolder = document.createElement('div');
  postHolder.classList.add('card', 'border-0');

  const postTitleBox = document.createElement('div');
  postTitleBox.classList.add('card-body');

  const postTitle = document.createElement('h2');
  postTitle.classList.add('card-title', 'h4');
  postTitle.textContent = t('postsTitle');
  postTitleBox.append(postTitle);

  const postUl = document.createElement('ul');
  postUl.classList.add('list-group', 'border-0', 'rounded-0');

  postUl.append(...postElems);
  postHolder.append(postTitleBox, postUl);
  return postHolder;
};

const renderPost = (id, title, description, url) => {
  const ul = document.querySelector('.list-group.border-0.rounded-0');
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  const viewButton = renderViewPostButton(id);
  const href = renderHrefPost(id, title, description, url);
  li.appendChild(href);
  li.appendChild(viewButton);
  ul.appendChild(li);
};
const watch = (formElements, i18n, state) => {
  const elements = { ...formElements };
  const watchedState = onChange(state, (path, value) => {
    // console.log(`path is: ${path}`);
    if (path === 'isValid') {
      caseSent(elements, i18n);
    }
    if (path === 'form.error') {
      console.log(value);
      elements.feedback.classList.add('text-danger');
      elements.feedback.classList.remove('text-success');
      elements.feedback.textContent = i18n.t(value);
    }
    // надо будет на currentState = sending еще сдлеать кейс
    if (path === 'feeds') {
      value.forEach((feed) => {
        renderFeed(feed.title, feed.description);
      });
    }
    if (path === 'posts') {
      renderPostsBody();

      value.forEach((item) => {
        item.forEach((post) => {
          renderPost(post.id, post.title, post.description, post.url);
        });
      });
    }
  });

  return watchedState;
};
const elements = {
  form: document.querySelector('.rss-form.text-body'),
  input: document.querySelector('.form-control.w-100'),
  inputLabel: document.querySelector('[for="url-input"]'),
  feedback: document.querySelector('.feedback.m-0'),
  submitButton: document.querySelector('.h-100.btn.btn-lg.btn-primary'),
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

export const renderModalWindowDescription = (title, description, url) => {
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;
  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = description;
};

export default watch;
