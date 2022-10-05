import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import { styled } from '@mui/system';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

const CustomImg = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.blue,
  borderRadius: '2rem',
}));

const CustomTyp = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontFamily: 'Rancho',
  fontSize: '1.0rem',
}));

export default function Carousel3D({ slides }) {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slide === 2) {
        setSlide(0);
      } else {
        setSlide(slide + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [slide]);

  useEffect(() => {
    if (slides instanceof Array) {
      const _cards = [];

      slides.forEach((sl, i) => {
        const card = (
          <CustomImg
            elevation={10}
            sx={(theme) => ({
              margin: '0 5rem',
              width: '10rem',
              [theme.breakpoints.up('sm')]: {
                width: '20rem',
              },
            })}
          >
            <CardActionArea
              onClick={(e) => {
                router.push(`/product/${sl.slug}`);
              }}
            >
              <CardMedia component="img" image={sl.image} />
              <CardContent>
                <CustomTyp align="center">{sl.name}</CustomTyp>

                <CustomTyp align="center" variant="h6">
                  ${sl.price}
                </CustomTyp>
              </CardContent>
            </CardActionArea>
          </CustomImg>
        );

        _cards.push({ key: i, content: card });
      });

      setCards([..._cards]);
    }
  }, [slides]);

  // return <Carousel slides={cards} goToSlide={slide} />;

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        spacing={4}
        // sx={{ width: '100vw' }}
      >
        {slides.map((sl, i) => {
          return (
            <Grid item>
              <CustomImg
                elevation={10}
                sx={(theme) => ({
                  margin: '0 5rem',
                  width: '10rem',
                  [theme.breakpoints.up('sm')]: {
                    width: '20rem',
                  },
                })}
              >
                <CardActionArea
                  onClick={(e) => {
                    router.push(`/product/${sl.slug}`);
                  }}
                >
                  <CardMedia component="img" image={sl.image} />
                  <CardContent>
                    <CustomTyp align="center">{sl.name}</CustomTyp>

                    <CustomTyp align="center" variant="h6">
                      ${sl.price}
                    </CustomTyp>
                  </CardContent>
                </CardActionArea>
              </CustomImg>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
