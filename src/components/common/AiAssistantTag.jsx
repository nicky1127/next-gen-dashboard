// File: src/components/common/AiAssistantTag.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';

/**
 * Reusable AI Assistant Tag component with avatar, name, and status
 * @param {boolean} isTyping - Whether AI is currently typing
 * @param {string} status - Custom status text (default: 'Online' or 'Typing...')
 * @param {string} size - Size variant: 'small', 'medium', 'large' (default: 'medium')
 * @param {boolean} showPulse - Whether to show pulse animation when typing (default: true)
 * @param {boolean} showBlink - Whether to show blink animation on status dot (default: true)
 * @param {boolean} autoHide - Whether to hide the tag after typing completes (default: false)
 * @param {number} hideDelay - Delay in ms before hiding after typing stops (default: 800)
 */
const AiAssistantTag = ({
  isTyping = false,
  status = null,
  size = 'medium',
  showPulse = true,
  showBlink = true,
  autoHide = false,
  hideDelay = 800,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasTyped, setHasTyped] = useState(false);

  // Track when typing has occurred and handle auto-hide
  useEffect(() => {
    if (isTyping) {
      setHasTyped(true);
    }

    if (autoHide && hasTyped && !isTyping) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);

      return () => clearTimeout(timer);
    }
  }, [isTyping, hasTyped, autoHide, hideDelay]);
  const sizeConfig = {
    small: {
      avatar: 24,
      nameFont: '0.75rem',
      statusFont: '0.65rem',
      dotSize: 4,
      spacing: 1,
    },
    medium: {
      avatar: 32,
      nameFont: '0.875rem',
      statusFont: '0.75rem',
      dotSize: 6,
      spacing: 1.5,
    },
    large: {
      avatar: 40,
      nameFont: '1rem',
      statusFont: '0.875rem',
      dotSize: 8,
      spacing: 2,
    },
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  // Determine status text
  const getStatusText = () => {
    if (status) return status;
    return isTyping ? 'Typing...' : 'Online';
  };

  return (
    <Fade in={isVisible} timeout={600}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {/* AI Avatar */}
        <Box
          sx={{
            width: config.avatar,
            height: config.avatar,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: config.spacing,
            boxShadow: '0 2px 8px rgba(17, 182, 122, 0.3)',
            // Pulse animation when typing
            animation:
              isTyping && showPulse
                ? 'avatarPulse 2s ease-in-out infinite'
                : 'none',
            '@keyframes avatarPulse': {
              '0%, 100%': {
                boxShadow: '0 2px 8px rgba(17, 182, 122, 0.3)',
              },
              '50%': {
                boxShadow: '0 2px 12px rgba(17, 182, 122, 0.5)',
              },
            },
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: config.nameFont,
              fontWeight: 500,
            }}
          >
            AI
          </Typography>
        </Box>

        {/* Name and Status */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              fontSize: config.nameFont,
            }}
          >
            NeoBank Assistant
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Status Dot */}
            <Box
              sx={{
                width: config.dotSize,
                height: config.dotSize,
                borderRadius: '50%',
                backgroundColor: '#11b67a',
                display: 'inline-block',
                mr: 0.5,
                // Blink animation when typing
                animation:
                  isTyping && showBlink
                    ? 'blink 1s ease-in-out infinite'
                    : 'none',
                '@keyframes blink': {
                  '0%, 50%': { opacity: 1 },
                  '51%, 100%': { opacity: 0.3 },
                },
              }}
            />

            {/* Status Text */}
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: config.statusFont,
              }}
            >
              {getStatusText()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default AiAssistantTag;
