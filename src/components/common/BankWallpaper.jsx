// File: src/components/common/BankWallpaper.jsx
import React from 'react';
import { Box } from '@mui/material';

const BankWallpaper = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bank-wallpaper.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

export default BankWallpaper;
