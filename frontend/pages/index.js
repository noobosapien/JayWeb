import Carousel from '../components/Home/Carousel';
import CategoryMenu from '../components/Home/CategoryMenu';
import Hero from '../components/Home/Hero';
import LatestProducts from '../components/Home/LatestProducts';
import Layout from '../components/Layout';

export default function Home({ featured }) {
  return (
    <Layout title="Jaytronics" description={'Jaytronics: We sell batteries'}>
      <Hero />
      <CategoryMenu />
      <Carousel products={featured} />
      <LatestProducts />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(process.env.STRAPI_BASE + 'products?featured=true');
    const featured = await res.json();

    return {
      props: {
        featured,
      },
    };
  } catch (e) {}
}
