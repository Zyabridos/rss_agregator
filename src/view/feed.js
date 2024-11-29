export default (state, i18n) => {
  const feedsContainer = document.querySelector('.col-md-10.feeds');
  feedsContainer.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `<h2 class="card-title h4">${i18n.t('feeds.feedTitle')}</h2>`;

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'list-unstyled');

  state.feeds.forEach((feed) => {
    const { feedTitle, description } = feed;
    const li = document.createElement('li');
    li.innerHTML = `<h3 class="h6 m-0">${feedTitle}</h3><p class="m-0 small text-black-50">${description}< /p>`;
    li.classList.add('list-group-item', 'mb-3', 'border-0');
    ul.append(li);
  });

  card.append(cardBody);
  card.append(ul);
  feedsContainer.append(card);
};
