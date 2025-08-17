// File: src/components/common/TypingIndicator.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Reusable typing indicator component with animated dots
 * @param {boolean} show - Whether to show the indicator
 * @param {string} message - Custom message (default: "AI is typing...")
 * @param {string} size - Size variant: 'small', 'medium', 'large' (default: 'medium')
 */
const TypingIndicator = ({
  show = false,
  message = 'AI is typing...',
  size = 'medium',
}) => {
  if (!show) return null;

  const sizeConfig = {
    small: { dotSize: 3, fontSize: '0.7rem', gap: 0.3 },
    medium: { dotSize: 4, fontSize: '0.75rem', gap: 0.5 },
    large: { dotSize: 5, fontSize: '0.875rem', gap: 0.7 },
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 1,
        opacity: 0.7,
        animation: 'fadeIn 0.3s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(5px)' },
          to: { opacity: 0.7, transform: 'translateY(0)' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: config.gap,
          mr: 1,
          '& > div': {
            width: config.dotSize,
            height: config.dotSize,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            animation: 'pulse 1.4s ease-in-out infinite both',
            '&:nth-of-type(1)': { animationDelay: '-0.32s' },
            '&:nth-of-type(2)': { animationDelay: '-0.16s' },
            '&:nth-of-type(3)': { animationDelay: '0s' },
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
          color: 'text.secondary',
          fontSize: config.fontSize,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default TypingIndicator;
