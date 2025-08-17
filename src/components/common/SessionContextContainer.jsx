import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Container, Paper } from '@mui/material';
import CustomerDetailsPanel from './CustomerDetailsPanel';

const SessionContextContainer = () => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);

  const getStageTitle = () => {
    switch (stage) {
      case 'initial':
        return 'Welcome to NeoBank';
      case 'identifying':
        return 'Customer Identification';
      case 'verifying':
        return 'Identity Verification';
      case 'verified':
        return `Welcome, ${data.name}`;
      default:
        return 'NeoBank';
    }
  };

  const getStageDescription = () => {
    switch (stage) {
      case 'initial':
        return 'Ready to begin your AI-powered banking experience';
      case 'identifying':
        return 'Please provide your identification details';
      case 'verifying':
        return 'Verifying your identity with advanced AI security';
      case 'verified':
        return 'Identity verified • Account ready';
      default:
        return '';
    }
  };

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
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ position: 'relative', zIndex: 2, height: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            gap: 3,
          }}
        >
          {/* CustomerDetailsPanel - Left Side (1/3 width) */}
          <Box
            sx={{
              flex: '0 0 33.333%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CustomerDetailsPanel />
          </Box>

          {/* Main Content Area - Right Side (2/3 width) */}
          <Box
            sx={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              minHeight: '120px',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 300,
                }}
              >
                {getStageTitle()}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                }}
              >
                {getStageDescription()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 50%, rgba(33, 150, 243, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 85% 30%, rgba(33, 150, 243, 0.02) 0%, transparent 30%)
          `,
          zIndex: 1,
        }}
      />
    </Paper>
  );
};

export default SessionContextContainer;
