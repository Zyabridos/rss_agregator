const renderSeenPosts = (postIDtoDeactivate) => {
  const pressedLinksTitle = document.querySelector(`li a[data-id="${postIDtoDeactivate}"]`);
  pressedLinksTitle.classList.remove('fw-bold');
  pressedLinksTitle.classList.add('link-secondary', 'fw-normal');
};

export const renderModal = (formElements, state) => {
  const { modalTitle, modalBody } = formElements;
  const lastViewedPostID = state.ui.viewedPostsIDs[state.ui.viewedPostsIDs.length - 1];
  const currentlyPressedPost = state.posts.find((p) => p.id === lastViewedPostID);
  const activePost = state.posts.find((post) => post.id === currentlyPressedPost.id);
  if (activePost) {
    modalTitle.textContent = activePost.title;
    modalBody.textContent = activePost.description;
    renderSeenPosts(currentlyPressedPost.id);
  }
};

export const renderSeenPost = (formElements, state) => {
  const { postsContainer } = formElements;
  postsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
      const postID = e.target.getAttribute('data-id');
      state.ui.viewedPostsIDs.push(postID);
    }
  });
};

export default renderModal;
