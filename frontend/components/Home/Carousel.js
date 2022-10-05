import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getTopRated } from '../../helpers/getTopRated';
import SmallProductCard from '../common/SmallProductCard';
import { useRouter } from 'next/router';
import Carousel3D from './Carousel3D';

export default function Carousel({ products }) {
  const theme = useTheme();
  const router = useRouter();

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    if (products instanceof Array && products.length > 0) {
      const _slides = [];
      products.forEach((product) => {
        var item = {};

        item.image = product.images[0].url;
        item.name = product.name;
        item.height = product.images[0].height;
        item.price = product.price;
        item.slug = product.slug;
        item.noofreviews = product.noofreviews ? product.noofreviews : 0;
        item.rating = product.rating ? product.rating : 0;

        _slides.push(item);
      });

      setSlides([..._slides]);
    }
  }, [products]);

  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      spacing={10}
      sx={{ marginTop: '10%' }}
    >
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        sx={{ marginBottom: '30vh' }}
      >
        <Grid item alignSelf="center">
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ fontWeight: '100' }}
          >
            Most viewed items
          </Typography>
        </Grid>

        <Grid
          item
          sx={(theme) => ({
            [theme.breakpoints.up('sm')]: {
              marginTop: '10vh',
            },
            [theme.breakpoints.down('sm')]: {
              marginTop: '30vh',
            },
          })}
        >
          <Carousel3D slides={slides} />
        </Grid>
      </Grid>
    </Grid>
  );
}
