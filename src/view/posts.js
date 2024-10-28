import { setAttributes } from '../utils.js';

const renderViewPostButton = (id) => {
  const viewButton = document.createElement('button');
  setAttributes(viewButton, {
    type: 'button', 'data-id': id, 'data-bs-toggle': 'modal', 'data-bs-target': '#modal',
  });
  viewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  viewButton.innerText = 'Просмотр';
  return viewButton;
};

const renderHrefPost = (id, title, url) => {
  const href = document.createElement('a');
  setAttributes(href, { href: url, 'data-id': id });
  href.setAttribute('tagret', '_blank');
  href.setAttribute('rel', 'noopener noreferrer');
  href.classList.add('fw-bold');
  href.textContent = title;
  return href;
};

const renderPostsBody = (i18n) => {
  const postsContainer = document.querySelector('.mx-auto.posts');
  const divContainer = document.createElement('div');
  divContainer.classList.add('card', 'border-0');

  const h2Body = document.createElement('div');
  h2Body.classList.add('card-body');

  const h2 = document.createElement('h2');
  // h2.textContent = i18n.t('posts');
  h2.textContent = 'Посты';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  postsContainer.appendChild(divContainer);
  divContainer.appendChild(h2Body);
  h2Body.appendChild(h2);

  divContainer.appendChild(ul);
};

const renderPost = (state, i18n) => {
  renderPostsBody(i18n);
  const ul = document.querySelector('.list-group.border-0.rounded-0');
  state.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const viewButton = renderViewPostButton(post.id);
    const href = renderHrefPost(post.id, post.title, post.url);
    li.appendChild(href);
    li.appendChild(viewButton);
    ul.appendChild(li);
  });
};

export default renderPost;
