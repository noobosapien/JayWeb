import { ButtonBase, Grid, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import electronics from '../../public/electronics.jpg';
import electrical from '../../public/electrical.jpg';
import drones from '../../public/drone.jpg';
import metering from '../../public/metering.jpg';
import batteries from '../../public/batteries.jpg';
import hobbies from '../../public/hobbies.jpg';

import NextLink from 'next/link';

const images = [
  {
    url: electronics.src,
    title: 'Electronic Equipment',
    width: '33%',
    href: '/category/Electronics',
  },
  {
    url: electrical.src,
    title: 'Electrical Equipment',
    width: '33%',
    href: '/category/Electrical',
  },
  {
    url: drones.src,
    title: 'Drone Equipment',
    width: '33%',
    href: '/category/Drones',
  },
  {
    url: metering.src,
    title: 'Metering Equipment',
    width: '33%',
    href: '/category/Metering',
  },
  {
    url: batteries.src,
    title: 'Batteries',
    width: '33%',
    href: '/category/Batteries',
  },
  {
    url: hobbies.src,
    title: 'Hobbies',
    width: '33%',
    href: '/category/Hobbies',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: '200',
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function CategoryMenu() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexWrap: 'wrap',
            [theme.breakpoints.up('xl')]: { minWidth: 1200 },
            [theme.breakpoints.down('xl')]: { minWidth: 1000 },
            [theme.breakpoints.down('lg')]: { minWidth: 800 },
            [theme.breakpoints.down('md')]: { minWidth: 550 },
            [theme.breakpoints.down('sm')]: { minWidth: 250 },
            width: '100%',
          })}
        >
          {images.map((image) => (
            <NextLink href={image.href} key={image.title} passHref>
              <ImageButton
                focusRipple
                style={{
                  width: image.width,
                }}
              >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </NextLink>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
