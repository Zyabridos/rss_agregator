import { setAttributes } from '../utils/utils.js';

const renderViewPostButton = (id, i18n) => {
  const viewButton = document.createElement('button');
  setAttributes(viewButton, {
    type: 'button', 'data-id': id, 'data-bs-toggle': 'modal', 'data-bs-target': '#modal',
  });
  viewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  viewButton.innerText = i18n.t('posts.viewButton');
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

export default (i18n, state, elements) => {
  const { postsContainer } = { ...elements };
  postsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `<h2 class="card-title h4">${i18n.t('posts.postsTitle')}</h2>`;

  const postUL = document.createElement('ul');
  postUL.classList.add('list-group', 'border-0', 'rounded-0');

  state.posts.forEach((post) => {
    const { title, url, id } = post;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'border-0');

    const viewButton = renderViewPostButton(id, i18n);
    const href = renderHrefPost(id, title, url);

    li.append(href);
    li.append(viewButton);

    postUL.append(li);
  });

  card.append(cardBody);
  card.append(postUL);
  postsContainer.append(card);
};
