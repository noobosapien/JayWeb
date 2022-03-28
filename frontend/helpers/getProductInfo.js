import axios from 'axios';

export async function getProductInfo(id) {
  try {
    const { data } = await axios.get(
      `https://cms.puppetino.com/products?id=${id}`
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
