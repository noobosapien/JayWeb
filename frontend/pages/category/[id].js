import {
  Card,
  CardActions,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/common/ProductCard';
import Layout from '../../components/Layout';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { getProducts } from '../../helpers/getProductsSort';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Category(props) {
  const { products, param } = props;

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const [allProducts, setAllProducts] = useState([]);
  const [sort, setSort] = useState({
    method: 'name',
    asc: true,
  });

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  useEffect(() => {
    getProducts(sort, param, setAllProducts);
  }, [sort]);

  const handleStateChange = (method) => (e) => {
    if (sort.method !== method) {
      setSort({
        method,
        asc: true,
      });
    } else {
      setSort({ ...sort, asc: !sort.asc });
    }
  };

  return (
    <Layout
      title="jaytronics"
      description={'jaytronics hand crafted and delivered'}
    >
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
            {param}
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
    const res = await fetch(process.env.STRAPI_BASE + `categories`);
    const categories = await res.json();

    const names = [];
    categories.forEach((cat) => {
      names.push('/category/' + cat.name); //This has the first letter capital
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

    var param = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
    // param = 'Clean Living';

    const res = await fetch(
      process.env.STRAPI_BASE +
        `products?category.name_contains=${param}&_sort=name:DESC`
    );

    const products = await res.json();
    console.log(param);

    return {
      props: {
        products,
        param,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
