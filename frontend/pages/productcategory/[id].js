import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/common/ProductCard';
import Layout from '../../components/Layout';
import { getProductCategories } from '../../helpers/getProductsCategories';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Category(props) {
  const { products, param, name } = props;

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  return (
    <Layout title="jaytronics" description={'jaytronics'}>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        spacing={10}
        direction="column"
        sx={(theme) => ({
          marginTop: '0%',
        })}
      >
        <Grid item>
          <Typography
            sx={{
              fontSize: matchesMD ? '1.5rem' : '3rem',
              fontWeight: '200',
            }}
          >
            {name}
          </Typography>
        </Grid>

        <Grid item container justifyContent="space-evenly" spacing={10}>
          {allProducts instanceof Array &&
            allProducts.map((prod) => {
              return (
                <Grid item key={prod.id}>
                  <ProductCard product={prod} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(process.env.STRAPI_BASE + `product-categories`);
    const categories = await res.json();

    const names = [];
    categories.forEach((cat) => {
      names.push('/productcategory/' + cat.name);
    });

    return {
      paths: names,
      fallback: true,
    };
  } catch (e) {
    throw e;
  }
}

export async function getStaticProps(context) {
  try {
    const { params } = context;
    const { id } = params;

    console.log(params);

    const prodCatRes = await fetch(
      process.env.STRAPI_BASE +
        //   'http://192.168.1.71:1337/' +
        `product-categories?slug=${id}`
    );

    const prodCat = await prodCatRes.json();

    let prodID = '';

    if (prodCat instanceof Array) {
      prodID = prodCat[0].id;
    }

    const res = await fetch(
      process.env.STRAPI_BASE +
        //   'http://192.168.1.71:1337/' +
        `products?product_category=${prodID}`
    );

    const products = await res.json();

    return {
      props: {
        products,
        param: id,
        name: prodCat[0].name,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
