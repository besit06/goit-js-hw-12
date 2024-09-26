import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showErrorMessage, appendImages } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = form.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load more';
loadMoreButton.classList.add('btn', 'load-more');
document.body.appendChild(loadMoreButton);
loadMoreButton.style.display = 'none';

let currentPage = 1;
const perPage = 15;
let query = '';

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  query = input.value.trim();
  gallery.innerHTML = '';
  currentPage = 1;

  if (query === '') {
    showErrorMessage('Please enter a search query.');
    return;
  }

  loadImages(query, currentPage);
}

function onLoadMore() {
  currentPage++;
  loadImages(query, currentPage);
}

function loadImages(query, page) {
  showLoader();
  loadMoreButton.style.display = 'none'; 

  fetchImages(query, page, perPage)
    .then(data => {
      hideLoader();

      if (data.hits.length === 0 && page === 1) {
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
        return;
      }

      appendImages(data.hits); 

      if (data.hits.length < perPage || data.totalHits <= page * perPage) {
        showErrorMessage("We're sorry, but you've reached the end of search results.");
      } else {
        loadMoreButton.style.display = 'block'; 
      }

      smoothScroll();
    })
    .catch(error => {
      hideLoader();
      showErrorMessage('Something went wrong. Please try again later.');
      console.log(error)
    });
}

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}