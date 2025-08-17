import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grow } from '@mui/material';

const CustomerDetailsPanel = () => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);
  const [showPanel, setShowPanel] = useState(false);

  // Trigger panel animation after splash screen fades
  useEffect(() => {
    if (!splashVisible) {
      const timer = setTimeout(() => {
        setShowPanel(true);
      }, 500); // Delay for smooth transition after main content appears

      return () => clearTimeout(timer);
    }
  }, [splashVisible]);

  return (
    <Grow in={showPanel} timeout={1000}>
      <Box
        sx={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '24px',
          padding: 3,
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '24px',
            padding: '1px',
            background:
              'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'exclude',
            maskComposite: 'exclude',
          },
        }}
      >
        {/* AI Avatar and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
              boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
            }}
          >
            <Typography
              sx={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}
            >
              AI
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              NeoBank Assistant
            </Typography>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#4caf50',
                display: 'inline-block',
                mr: 0.5,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            >
              Online
            </Typography>
          </Box>
        </Box>

        {/* AI Dialog Message */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontStyle: 'normal',
            '&::before': {
              content: '""',
              color: 'primary.main',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              mr: 0.5,
            },
            '&::after': {
              content: '""',
              color: 'primary.main',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              ml: 0.5,
            },
          }}
        >
          {stage === 'initial' &&
            "Hello! I'm here to guide you through our secure onboarding process. Ready to get started?"}
          {stage === 'identifying' &&
            "Please share your details with me. I'll make sure everything is processed securely."}
          {stage === 'verifying' &&
            "I'm analyzing your information using advanced AI. This will just take a moment..."}
          {stage === 'verified' &&
            `Welcome to NeoBank${data.name ? `, ${data.name}` : ''}! Your account is ready and I\'m here whenever you need assistance.`}
        </Typography>

        {/* Typing indicator when appropriate */}
        {stage === 'verifying' && (
          <Box
            sx={{ display: 'flex', alignItems: 'center', mt: 1, opacity: 0.7 }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                '& > div': {
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  animation: 'pulse 1.4s ease-in-out infinite both',
                  '&:nth-of-type(1)': { animationDelay: '-0.32s' },
                  '&:nth-of-type(2)': { animationDelay: '-0.16s' },
                },
                '@keyframes pulse': {
                  '0%, 80%, 100%': {
                    transform: 'scale(0.8)',
                    opacity: 0.5,
                  },
                  '40%': {
                    transform: 'scale(1)',
                    opacity: 1,
                  },
                },
              }}
            >
              <div />
              <div />
              <div />
            </Box>
            <Typography
              variant="caption"
              sx={{
                ml: 1,
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            >
              AI is processing...
            </Typography>
          </Box>
        )}
      </Box>
    </Grow>
  );
};

export default CustomerDetailsPanel;
