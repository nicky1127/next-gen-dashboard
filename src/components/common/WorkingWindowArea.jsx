import React from 'react';
import { Paper } from '@mui/material';
import BankWallpaper from './BankWallpaper';

const WorkingWindowArea = ({ isSimpleView = false }) => {
  return (
    <Paper
      sx={{
        height: isSimpleView ? 'calc(100vh - 60px)' : '75vh', // Dynamic height based on view
        borderRadius: 0,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
        boxShadow: 'none',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition
      }}
    >
      <BankWallpaper isSimpleView={isSimpleView} />
    </Paper>
  );
};

export default WorkingWindowArea;
