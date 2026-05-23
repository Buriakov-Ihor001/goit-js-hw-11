import axios from 'axios';

const API_KEY = '55988991-207a01337450bccdcf2530aec';

export async function getImagesByQuery(query) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}