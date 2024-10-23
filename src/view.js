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

const caseSending = (formElements) => {
  const elements = { ...formElements };
  console.log('sending');
  elements.submitButton.disabled = true;
};

const caseFilling = (formElements) => {
  const elements = { ...formElements };
  console.log('filling');
  elements.submitButton.disable = false;
  elements.input.focus();
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

export const renderModal = (formElements, state) => {
  const { modalTitle, modalBody } = formElements;
  const lastViewedPost = state.ui.viewedPostsIDs[state.ui.viewedPostsIDs.length - 1];
  const currentlyPressedPost = state.posts.find((p) => p.id === lastViewedPost);
  modalTitle.textContent = currentlyPressedPost.title;
  modalBody.textContent = currentlyPressedPost.description;

  state.posts.map((post) => post.map((item) => {
    console.log(item);
  }));
  // const activePost = state.posts.find((post) => post.id === currentID);
  // console.log(state.posts.map((item) => console.log(item)));
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
  state.posts.forEach((item) => {
    item.forEach((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const viewButton = renderViewPostButton(post.id);
      const href = renderHrefPost(post.id, post.title, post.description, post.url);
      li.appendChild(href);
      li.appendChild(viewButton);
      ul.appendChild(li);
    });
  });
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
    if (path === 'feeds') {
      value.forEach((feed) => {
        renderFeed(feed.title, feed.description);
      });
    }
    if (path === 'posts') {
      renderPost(state);
    }
    if (path === 'ui.viewedPostsIDs') {
      renderModal(formElements, state);
    }
  });

  return watchedState;
};

export default watch;
