export default (state, i18n) => {
  const feedsContainer = document.querySelector('.col-md-10.feeds');
  feedsContainer.innerHTML = '';
  const cardDiv1 = document.createElement('div');
  cardDiv1.classList.add('card', 'border-0');
  const cardDiv2 = document.createElement('div');
  cardDiv2.classList.add('card-body');
  const titleForAllFeeds = document.createElement('h2');
  titleForAllFeeds.classList.add('card-title', 'h4');
  titleForAllFeeds.innerText = i18n.t('feeds.feedTitle');

  state.feeds.forEach((feed) => {
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const feedTitle = document.createElement('h3');
    feedTitle.classList.add('h6', 'm-0');
    feedTitle.textContent = feed.feedTitle;
    const feedDescription = document.createElement('p');
    feedDescription.classList.add('m-0', 'small', 'text-black-50');
    feedDescription.textContent = feed.description;

    li.appendChild(feedTitle);
    li.appendChild(feedDescription);
    ul.appendChild(li);
    cardDiv2.appendChild(titleForAllFeeds);
    cardDiv1.appendChild(cardDiv2);
    cardDiv1.appendChild(ul);
    feedsContainer.appendChild(cardDiv1);
  });
};
