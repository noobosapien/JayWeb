import axios from 'axios';

export async function getProductCategories(param, setAllProducts) {
  try {
    const { data } = await axios.get(
      'https://cms.jaytronics.co.nz/' +
        // 'http://localhost:1337/' +
        `product-categories?category.name_contains=${param}
        }`
    );

    const products = data;
    // console.log(res);

    setAllProducts(products);
  } catch (e) {
    console.log(e);
  }
}
