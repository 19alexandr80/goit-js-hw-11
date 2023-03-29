// import Notiflix from 'notiflix';
// import { NewApi, LoadMore } from './js/api.js';
import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// lm = new LoadMore('gfds');
// console.log(lm);
// const galleryEl = document.querySelector('.gallery');
// const form = document.querySelector('form');
// const more = document.querySelector('.load-more');
// more.addEventListener('click', loadMore);
// form.addEventListener('submit', onsubmit);
// const aapi = new NewApi();
// function onsubmit(e) {
//   e.preventDefault();
//   more.classList.add('visually-hidden');
//   const userValue = e.currentTarget.elements.searchQuery.value;
//   aapi.setInput(userValue);
//   aapi.resetPege();
//   galleryEl.innerHTML = '';
//   aapi.getUser().then(({ hits, totalHits }) => {
//     if (hits.length === 0) {
//       Notiflix.Notify.warning(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       galleryEl.innerHTML = '';

//       return;
//     }
//     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//     criet(hits);
//   });
// }
// function loadMore() {
//   more.classList.add('visually-hidden');
//   aapi
//     .getUser()
//     .then(({ hits }) => {
//       criet(hits);
//       // aapi.lightbox.refresh();
//     })
//     .catch(error => {
//       Notiflix.Notify.warning(
//         "We're sorry, but you've reached the end of search results."
//       );
//       console.error(error);
//     });
// }
// function criet(params) {
//   const nnn = params
//     .map(({ pageURL, previewURL, tags, likes, views, comments, downloads }) => {
//       return `<a class="gallery__link" href="${pageURL}"><div class="photo-card">
//         <img src="${previewURL}" alt="${tags}" width="100%" loading="lazy" />
//           <div class="info">
//             <p class="info-item">Likes <br/>
//               <b>${likes}</b>
//             </p>
//             <p class="info-item">Views <br/>
//               <b>${views}</b>
//             </p>
//             <p class="info-item">Comments <br/>
//               <b>${comments}</b>
//             </p>
//             <p class="info-item">Downloads <br/>
//               <b>${downloads}</b>
//             </p>
//           </div>
//       </div>
//     </a>`;
//     })
//     .join('');
//   console.log(nnn);
//   galleryEl.insertAdjacentHTML('beforeEnd', nnn);
//   more.classList.remove('visually-hidden');
// }
const galleryEl = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 250,
});
console.log(galleryEl);
// lightbox.refresh();
