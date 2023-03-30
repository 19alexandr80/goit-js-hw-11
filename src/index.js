import Notiflix from 'notiflix';
import { NewApi } from './js/api.js';
import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 500;
let loadedElement = 0;
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
let lastEl = null;
const galleryEl = document.querySelector('.gallery');

const form = document.querySelector('form');
// const more = document.querySelector('.load-more');
const debounceOnScroll = debounce(onScroll, DEBOUNCE_DELAY);
// more.addEventListener('click', loadMore);
form.addEventListener('submit', onsubmit);
const aapi = new NewApi();
function onsubmit(e) {
  e.preventDefault();
  window.removeEventListener('scroll', debounceOnScroll);
  loadedElement = aapi.amountOfElements;
  lastEl = null;
  // more.classList.add('visually-hidden');
  const userValue = e.currentTarget.elements.searchQuery.value;
  aapi.setInput(userValue);
  aapi.resetPege();
  galleryEl.innerHTML = '';
  aapi.getUser().then(({ hits, totalHits }) => {
    if (hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    criet(hits);
    window.scrollBy({
      top: 52,
      behavior: 'smooth',
    });
  });
  window.addEventListener('scroll', debounceOnScroll);
}
// function loadMore() {
//   more.classList.add('visually-hidden');
//   aapi
//     .getUser()
//     .then(({ hits }) => {
//       criet(hits);
//     })
//     .catch(error => {
//       Notiflix.Notify.warning(
//         "We're sorry, but you've reached the end of search results."
//       );
//       console.error(error);
//     });
// }
function criet(params) {
  const htmlCard = params
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `<div class='gallery__item'>
    <a class='gallery__link' href='${largeImageURL}'>
      <img class='gallery__image' src='${webformatURL}' alt='${tags}' loading="lazy"/>
    </a>
    <div class="info">
      <p class="info-item">Likes <br/><b>${likes}</b></p>
      <p class="info-item">Views <br/><b>${views}</b></p>
      <p class="info-item">Comments <br/><b>${comments}</b></p>
      <p class="info-item">Downloads <br/><b>${downloads}</b></p>
    </div>
  </div>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeEnd', htmlCard);
  lightbox.refresh();
  // more.classList.remove('visually-hidden');
  lastEl = galleryEl.lastChild;
}
function onScroll() {
  if (
    lastEl.getBoundingClientRect().bottom <
    document.documentElement.clientHeight
  ) {
    if (loadedElement > aapi.totalHits) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      window.removeEventListener('scroll', debounceOnScroll);
      return;
    }
    aapi
      .getUser()
      .then(({ hits }) => {
        criet(hits);
        loadedElement = aapi.getAmountOfElements() * (aapi.page - 1);
      })
      .catch(error => {
        window.removeEventListener('scroll', debounceOnScroll);
        console.error(error);
      });
  }
}
