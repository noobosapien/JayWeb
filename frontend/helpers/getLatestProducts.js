import axios from 'axios';

export async function getLatestProducts(setAllProducts) {
  try {
    const { data } = await axios.get(
      'https://cms.jaytronics.co.nz/' + `products?_limit=4&_sort=createdAt:DESC`
    );

    const products = data;

    setAllProducts(products);
  } catch (e) {
    console.log(e);
  }
}
