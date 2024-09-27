import { fetchImages } from './js/pixabay-api.js';
import { renderImages, appendImages, showErrorMessage } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = form.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreButton = document.querySelector('.load-more');

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

async function onSearch(event) {
  event.preventDefault();

  query = input.value.trim();
  gallery.innerHTML = '';
  currentPage = 1;

  if (query === '') {
    showErrorMessage('Please enter a search query.');
    return;
  }

  await loadImages(query, currentPage);
}

async function onLoadMore() {
  currentPage++;
  await loadImages(query, currentPage);
}

async function loadImages(query, page) {
  try {
    showLoader();
    
    loadMoreButton.classList.add('hidden'); 
    

    const data = await fetchImages(query, page, perPage);

    hideLoader(); 
    
    
    if (data.hits.length === 0 && page === 1) {
      showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    appendImages(data.hits);
    
    
    if (data.hits.length < perPage || data.totalHits <= page * perPage) {
      showErrorMessage("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreButton.classList.remove('hidden'); 
      
    }

  } catch (error) {
    hideLoader();
    showErrorMessage('Something went wrong. Please try again later.');
  }
}