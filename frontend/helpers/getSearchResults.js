import axios from 'axios';

export async function getSearchResults(query) {
  try {
    const { data } = await axios.get(
      `https://cms.jaytronics.co.nz/products?${query}&_limit=5`
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
