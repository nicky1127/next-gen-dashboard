// File: src/components/common/SessionContextContainer.jsx
import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import IvrContextPanel from './IvrContextPanel';
import CustomerDetailsPanel from './CustomerDetailsPanel';
import MainContentPanel from './MainContentPanel';
import SupportNeedsPanel from './SupportNeedsPanel';

const SessionContextContainer = ({ skipAnimations = false }) => {
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
        pt: '20px', // Increased top padding for logo tag clearance
        px: '50px', // Increased left and right padding from 10px to 50px
        pb: '10px', // Bottom padding
      }}
    >
      {/* Removed Container with maxWidth="lg" constraint */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          width: '100%', // Full width instead of container constraint
          p: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch', // Changed to stretch for full height
            justifyContent: 'center', // Center all child components
            height: '100%',
            gap: 3,
            position: 'relative',
          }}
        >
          {/* IvrContextPanel - Slightly wider than CustomerDetailsPanel */}
          <Box
            sx={{
              flex: '0 0 560px', // Increased from 520px to 560px (80px wider than CustomerDetailsPanel)
              display: 'flex',
              alignItems: 'stretch', // Full height alignment
              minWidth: 0, // Allow shrinking without breaking layout
            }}
          >
            <IvrContextPanel skipAnimations={skipAnimations} />
          </Box>

          {/* CustomerDetailsPanel - Keep existing width */}
          <Box
            sx={{
              flex: '0 0 480px', // Unchanged - 480px width
              display: 'flex',
              alignItems: 'stretch', // Full height alignment
              minWidth: 0, // Allow shrinking without breaking layout
            }}
          >
            <CustomerDetailsPanel skipAnimations={skipAnimations} />
          </Box>

          {/* SupportNeedsPanel - Reduced width */}
          <Box
            sx={{
              flex: '0 0 280px', // Reduced from 320px to 280px (40px narrower)
              display: 'flex',
              alignItems: 'stretch', // Full height alignment
              minWidth: 0, // Allow shrinking without breaking layout
            }}
          >
            <SupportNeedsPanel skipAnimations={skipAnimations} />
          </Box>

          {/* Main Content Area - Takes remaining space */}
          <Box
            sx={{
              flex: '1', // Takes all remaining space
              display: 'flex',
              alignItems: 'center',
              minWidth: '340px', // Reduced minimum width since we have more space
            }}
          >
            <MainContentPanel skipAnimations={skipAnimations} />
          </Box>
        </Box>
      </Box>

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
