// File: src/components/common/MainContentPanel.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import useTypingAnimation from '../../hooks/useTypingAnimation';
import TypingIndicator from './TypingIndicator';

const MainContentPanel = () => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);
  const [showTyping, setShowTyping] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  // Start logo and typing animation after splash screen
  useEffect(() => {
    if (!splashVisible) {
      // Show logo first
      const logoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 500);

      // Then start typing
      const typingTimer = setTimeout(() => {
        setShowTyping(true);
      }, 1000);

      return () => {
        clearTimeout(logoTimer);
        clearTimeout(typingTimer);
      };
    }
  }, [splashVisible]);

  // Reset animations when stage changes
  useEffect(() => {
    if (!splashVisible) {
      setShowTyping(false);
      const timer = setTimeout(() => setShowTyping(true), 300);
      return () => clearTimeout(timer);
    }
  }, [stage, splashVisible]);

  const mainContent = 'The customer calls in the Neo Bank line...';

  // Typing animation for main content
  const { displayText: typedContent, isTyping: isTypingContent } =
    useTypingAnimation(
      mainContent,
      35, // Moderate typing speed
      0,
      showTyping
    );

  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
      {/* NeoBank Logo - Bigger */}
      <Box
        sx={{
          width: 80,
          height: 80,
          opacity: showLogo ? 1 : 0,
          transform: showLogo
            ? 'scale(1) rotate(0deg)'
            : 'scale(0.8) rotate(-10deg)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/neobank-trademark.svg`}
          alt="NeoBank"
          sx={{
            width: '100%',
            height: '100%',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.1)',
              filter: 'drop-shadow(0 4px 12px rgba(17, 182, 122, 0.3))',
            },
          }}
        />
      </Box>

      {/* Main Content - Smaller text similar to AI typing */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontStyle: 'normal',
            minHeight: '1.2em', // Prevent layout shift
          }}
        >
          {typedContent}
          {/* Blinking cursor */}
          {isTypingContent && (
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                backgroundColor: 'primary.main',
                ml: 0.2,
                animation: 'cursor 1s infinite',
                '@keyframes cursor': {
                  '0%, 50%': { opacity: 1 },
                  '51%, 100%': { opacity: 0 },
                },
              }}
            />
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default MainContentPanel;
