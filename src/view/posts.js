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

export const renderPostsBody = (elements, i18n) => {
  const { postsContainer } = { ...elements };
  postsContainer.innerHTML = '';
  const divContainer = document.createElement('div');
  divContainer.classList.add('card', 'border-0');

  const postTitleContainer = document.createElement('div');
  postTitleContainer.classList.add('card-body');

  const postTitle = document.createElement('h2');
  postTitle.textContent = i18n.t('posts.postsTitle');
  postTitleContainer.appendChild(postTitle);

  const postUL = document.createElement('ul');
  postUL.classList.add('list-group', 'border-0', 'rounded-0');

  divContainer.appendChild(postTitleContainer);
  divContainer.appendChild(postUL);
  postsContainer.appendChild(divContainer);
};

export default (i18n, state) => {
  console.log('posts');
  const postUL = document.querySelector('.list-group.border-0.rounded-0');
  state.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const viewButton = renderViewPostButton(post.id, i18n);
    const href = renderHrefPost(post.id, post.title, post.url);
    li.appendChild(href);
    li.appendChild(viewButton);
    postUL.appendChild(li);
    if (state.ui.viewedPostsIDs.includes(post.id)) {
      href.classList.remove('fw-bold');
      href.classList.add('fw-normal', 'text-muted');
    } else {
      href.classList.add('fw-bold');
      href.classList.remove('fw-normal', 'text-muted');
    }
  });
};
