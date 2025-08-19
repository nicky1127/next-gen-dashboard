import React from 'react';
import { Paper } from '@mui/material';
import BankWallpaper from './BankWallpaper';

const WorkingWindowArea = ({ isSimpleView = false, isFullHeight = false }) => {
  // Determine the height based on the current state
  const getHeight = () => {
    if (isFullHeight) {
      return '100vh'; // Full viewport height when floating logo is shown
    } else if (isSimpleView) {
      return 'calc(100vh - 60px)'; // Simple view with panel
    } else {
      return '75vh'; // Normal view with session context
    }
  };

  return (
    <Paper
      sx={{
        height: getHeight(),
        borderRadius: 0,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
        boxShadow: 'none',
        transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth height transition
      }}
    >
      <BankWallpaper isSimpleView={isSimpleView || isFullHeight} />
    </Paper>
  );
};

export default WorkingWindowArea;
