import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

function getLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
  return lightbox;
}

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p><span>Likes</span>${likes}</p>
              <p><span>Views</span>${views}</p>
              <p><span>Comments</span>${comments}</p>
              <p><span>Downloads</span>${downloads}</p>
            </div>
          </a>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  // Ініціалізація + refresh
  setTimeout(() => {
    try {
      getLightbox().refresh();
    } catch (e) {
      console.warn('SimpleLightbox refresh warning');
    }
  }, 300);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) gallery.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('visible');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('visible');
}