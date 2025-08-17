import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Fab, Box, Grow } from '@mui/material';
import { MoreHoriz, Settings, Apps, Menu } from '@mui/icons-material';

const MoreFunctionButton = ({ onClick }) => {
  const { splashVisible } = useSelector((state) => state.app);
  const [showButton, setShowButton] = useState(false);

  // Show button after splash screen fades
  useEffect(() => {
    if (!splashVisible) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 1200); // Delay to appear after other animations

      return () => clearTimeout(timer);
    }
  }, [splashVisible]);

  return (
    <Grow in={showButton} timeout={600}>
      <Box
        sx={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Fab
          onClick={onClick}
          sx={{
            background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
            color: 'white',
            width: 56,
            height: 56,
            boxShadow:
              '0 8px 32px rgba(33, 150, 243, 0.3), 0 2px 8px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              transform: 'scale(1.05)',
              boxShadow:
                '0 12px 40px rgba(33, 150, 243, 0.4), 0 4px 12px rgba(0,0,0,0.2)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <Apps
            sx={{
              fontSize: '1.5rem',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'rotate(180deg)',
              },
            }}
          />
        </Fab>
      </Box>
    </Grow>
  );
};

export default MoreFunctionButton;
