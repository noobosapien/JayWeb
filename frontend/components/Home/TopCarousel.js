import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Adornment from '../../public/Adornment2.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Grid } from 'swiper';
import { Paper, Typography } from '@mui/material';

const Item = ({ info }) => (
  <>
    <Paper
      sx={{
        width: '100vw',
        height: '70vh',
        position: 'relative',
        background: `url(${Adornment.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        textAlign="center"
        sx={{
          fontWeight: '200',
          fontSize: '1.5rem',
        }}
      >
        {info.title}
      </Typography>
    </Paper>
  </>
);

export default function TopCarousel() {
  return (
    <div
      style={{
        marginTop: '4rem',
      }}
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Item
            info={{
              title: 'Discover a wide range of Electrical/Electronic equipment',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Item
            info={{
              title: 'Best place for refurbished batteries',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Item
            info={{
              title: 'Latest drone equipment',
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
