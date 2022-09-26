import React from 'react';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Adornment() {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  const imgHeight = matchesXS
    ? '10rem'
    : matchesSM
    ? '10rem'
    : matchesMD
    ? '10rem'
    : matchesLG
    ? '10rem'
    : matchesXL
    ? '10rem'
    : '10rem';

  // const imgHeight = '100%';

  return <></>;
}
