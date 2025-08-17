// File: src/components/common/SessionContextContainer.jsx
import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import CustomerDetailsPanel from './CustomerDetailsPanel';
import MainContentPanel from './MainContentPanel';
import SupportNeedsPanel from './SupportNeedsPanel';

const SessionContextContainer = () => {
  return (
    <Paper
      sx={{
        height: '25vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
        borderRadius: 0,
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden',
        p: '10px', // 10px padding on all sides
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ position: 'relative', zIndex: 2, height: '100%', p: 0 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch', // Changed to stretch for full height
            height: '100%',
            gap: 3,
            position: 'relative',
          }}
        >
          {/* CustomerDetailsPanel - Left Side (flexible width) */}
          <Box
            sx={{
              flex: '0 0 auto', // Don't grow or shrink, size to content
              display: 'flex',
              alignItems: 'stretch', // Full height alignment
              minWidth: 0, // Allow shrinking without breaking layout
            }}
          >
            <CustomerDetailsPanel />
          </Box>

          {/* SupportNeedsPanel - Next to CustomerDetailsPanel */}
          <Box
            sx={{
              flex: '0 0 auto', // Don't grow or shrink, size to content
              display: 'flex',
              alignItems: 'stretch', // Full height alignment
              minWidth: 0, // Allow shrinking without breaking layout
            }}
          >
            <SupportNeedsPanel />
          </Box>

          {/* Main Content Area - Right Side (remaining width) */}
          <Box
            sx={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MainContentPanel />
          </Box>
        </Box>
      </Container>

      {/* Background decoration with green accents */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 50%, rgba(17, 182, 122, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 85% 30%, rgba(17, 182, 122, 0.02) 0%, transparent 30%)
          `,
          zIndex: 1,
        }}
      />
    </Paper>
  );
};

export default SessionContextContainer;
