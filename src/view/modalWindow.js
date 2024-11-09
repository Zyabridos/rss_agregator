const markPostAsReaded = (postIDtoDeactivate) => {
  const pressedLinksTitle = document.querySelector(`li a[data-id="${postIDtoDeactivate}"]`);
  pressedLinksTitle.classList.remove('fw-bold');
  pressedLinksTitle.classList.add('link-secondary', 'fw-normal');
};

export const getCurrentModalID = (formElements, state) => {
  const { postsContainer } = formElements;
  postsContainer.addEventListener('click', (e) => {
    const postID = e.target.getAttribute('data-id');
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
      /* eslint-disable */
      state.ui.viewedPostsIDs.push(postID)
      state.ui.currentModalID = postID;
    }
  });
};

export const renderModal = (formElements, state) => {
  const { modalTitle, modalBody } = formElements;
  const { currentModalID } = state.ui;
  const activePost = state.posts.find((p) => p.id === currentModalID);
  if (activePost) {
    modalTitle.textContent = activePost.title;
    modalBody.textContent = activePost.description;
    markPostAsReaded(activePost.id);
  }
};

export default renderModal;
