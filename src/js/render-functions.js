import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; 

  appendImages(images);
}

export function appendImages(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images.map(image => {
    return `
      <li class="gallery-item">
        <a href="${image.largeImageURL}" target="_blank">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </li>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup); 

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

export function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message,
  });
}