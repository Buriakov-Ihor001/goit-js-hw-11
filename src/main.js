import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  initLightbox,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

initLightbox();

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      title: 'Помилка',
      message: 'Будь ласка, введіть пошуковий запит!',
      position: 'topRight',
    });
    return;
  }

  // Очищаємо перед новим запитом
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Нічого не знайдено',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
    }
  } catch (error) {
    console.error('API Error:', error);   // ← Додаємо для діагностики
    iziToast.error({
      title: 'Помилка',
      message: 'Щось пішло не так. Спробуйте пізніше.',
      position: 'topRight',
    });
  } finally {
    hideLoader();   // ← Це має спрацьовувати завжди
  }

  form.reset();
});