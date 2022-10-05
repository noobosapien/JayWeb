import axios from 'axios';

export async function getProducts(sort, param, setAllProducts) {
  try {
    const { data } = await axios.get(
      // 'https://cms.jaytronics.co.nz/' +
      'http://localhost:1337/' +
        `variants?category.name_contains=${param}&_sort=${sort.method}:${
          sort.asc ? 'ASC' : 'DESC'
        }`
    );

    const products = data;
    // console.log(res);

    setAllProducts(products);
  } catch (e) {
    console.log(e);
  }
}
