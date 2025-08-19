// File: src/components/common/MainContentPanel.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import useTypingAnimation from '../../hooks/useTypingAnimation';
import AiAssistantTag from './AiAssistantTag';

const MainContentPanel = ({ skipAnimations = false }) => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);
  const [showPanel, setShowPanel] = useState(skipAnimations);
  const [showTyping, setShowTyping] = useState(false);

  // Show the entire panel only after SupportNeedsPanel finishes typing
  useEffect(() => {
    let panelTimeoutId = null;
    let typingTimeoutId = null;

    if (!splashVisible) {
      if (skipAnimations) {
        // Skip all animations - show panel immediately
        setShowPanel(true);
      } else {
        // First time - show typing animation
        panelTimeoutId = setTimeout(() => {
          setShowPanel(true);
          typingTimeoutId = setTimeout(() => setShowTyping(true), 500);
        }, 9000); // Show panel after SupportNeedsPanel typing finishes
      }
    }

    return () => {
      if (panelTimeoutId) {
        clearTimeout(panelTimeoutId);
      }
      if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
      }
    };
  }, [splashVisible, skipAnimations]);

  // Reset animations when stage changes
  useEffect(() => {
    let timeoutId = null;

    if (!splashVisible) {
      setShowPanel(false);
      setShowTyping(false);
      timeoutId = setTimeout(() => {
        setShowPanel(true);
        setTimeout(() => setShowTyping(true), 500);
      }, 300);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [stage, splashVisible]);

  const mainContent =
    'The customer calls in the Neo Bank line and is transferred to our AI assistant for comprehensive support. All customer context has been captured and is ready for processing.';

  // Typing animation for main content
  const { displayText: typedContent, isTyping: isTypingContent } =
    useTypingAnimation(
      mainContent,
      35, // Moderate typing speed
      0,
      showTyping
    );

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 1,
        px: 2, // Add some internal padding
      }}
    >
      {/* AI Assistant Tag - Show only during typing */}
      {isTypingContent && (
        <AiAssistantTag
          isTyping={isTypingContent}
          size="medium"
          autoHide={false} // Don't auto-hide since this is the main content
        />
      )}

      {/* Main Content - Typing Animation */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontSize: '0.875rem',
            lineHeight: 1.4,
            fontStyle: 'normal',
            minHeight: '1.2em', // Prevent layout shift
            maxWidth: '100%', // Ensure text wraps properly
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

      {/* Verification Status and Actions - Show after typing completes */}
      {!isTypingContent && showTyping && (
        <Box
          sx={{
            width: '100%',
            opacity: 0,
            animation: 'slideUp 0.6s ease-out 0.5s forwards',
            '@keyframes slideUp': {
              from: {
                opacity: 0,
                transform: 'translateY(10px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {/* Status Indicator */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              p: 1.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 152, 0, 0.08)',
              border: '1px solid rgba(255, 152, 0, 0.3)',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#ff9800',
                mr: 1,
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': {
                    opacity: 1,
                    transform: 'scale(1)',
                  },
                  '50%': {
                    opacity: 0.7,
                    transform: 'scale(1.1)',
                  },
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: '#e65100',
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              Verification Required
            </Typography>
          </Box>

          {/* Verification Message */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              fontSize: '0.875rem',
              lineHeight: 1.4,
              mb: 1,
              fontWeight: 400,
            }}
          >
            The customer is not verified, please click the button to start
            verification using the eligible methods or you can force verify to
            Standard.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                boxShadow: '0 4px 16px rgba(17, 182, 122, 0.3)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #0c8a5a 0%, #095d44 100%)',
                  boxShadow: '0 6px 20px rgba(17, 182, 122, 0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => {
                console.log('Starting verification process...');
                // TODO: Implement verification flow
              }}
            >
              Verify
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: '#ff9800',
                color: '#e65100',
                px: 2,
                py: 0.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                '&:hover': {
                  borderColor: '#f57c00',
                  backgroundColor: 'rgba(255, 152, 0, 0.04)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => {
                console.log('Force verifying to Standard...');
                // TODO: Implement force verification
              }}
            >
              Force Verify
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MainContentPanel;
