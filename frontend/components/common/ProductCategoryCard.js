import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';
import { getProductInfo } from '../../helpers/getProductInfo';
import Message from './Message';

export default function ProductCategoryCard({ product }) {
  const { state, dispatch } = useContext(Store);
  const [update, setUpdate] = useState(1);
  const [openMessage, setOpenMessage] = useState(false);

  const router = useRouter();

  const prod = {};

  if (product) {
    prod.id = product.id ? product.id : '';
    prod.img = product.image ? product.image.url : undefined;
    prod.name = product.name ? product.name : 'Name';
    prod.slug = product.slug ? product.slug : '';
  }

  useEffect(() => {
    const updateReviews = async () => {
      const info = await getProductInfo(prod.id);
      prod.noOfReviews =
        info instanceof Array && info[0] && info[0].noofreviews
          ? info[0].noofreviews
          : 0;
      prod.rating =
        info instanceof Array && info[0] && info[0].rating ? info[0].rating : 0;

      setUpdate(update + 1);
    };
    updateReviews();
  }, []);

  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  const imgWidth = matchesXS
    ? '10rem'
    : matchesSM
    ? '15rem'
    : matchesMD
    ? '15rem'
    : matchesLG
    ? '15rem'
    : matchesXL
    ? '15rem'
    : '20rem';

  const handleGotoProductCategory = (slug) => (e) => {
    router.push(`/productcategory/${slug}`);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Card sx={{ width: imgWidth }} elevation={5}>
          <CardActionArea onClick={handleGotoProductCategory(prod.slug)}>
            <CardMedia component="img" image={prod.img} alt="item" />

            <CardContent>
              <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      fontWeight: '300',
                      fontSize: '1.5rem',
                      color: theme.palette.common.lightGray,
                    })}
                  >
                    {prod.name}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
