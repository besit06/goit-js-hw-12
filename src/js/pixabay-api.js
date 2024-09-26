const API_KEY = '46065399-355f71206950d55166b7078e9';
const BASE_URL = `https://pixabay.com/api/`;

import axios from 'axios';

export async function fetchImages(query, page = 1, perPage = 15) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
      throw error;
      
  }

}
      