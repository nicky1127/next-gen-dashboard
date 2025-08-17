// File: src/components/common/SupportNeedsPanel.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grow } from '@mui/material';
import useTypingAnimation from '../../hooks/useTypingAnimation';
import TypingIndicator from './TypingIndicator';
import AiAssistantTag from './AiAssistantTag';

const SupportNeedsPanel = () => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);
  const [showPanel, setShowPanel] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showSupportDetails, setShowSupportDetails] = useState(false);
  const [showFinalView, setShowFinalView] = useState(false);

  // Watch for CustomerDetailsPanel to reach final view
  // This is a simplified approach - in a real app you'd use a shared state or context
  useEffect(() => {
    if (!splashVisible) {
      // Start SupportNeedsPanel after CustomerDetailsPanel animations complete
      // CustomerDetailsPanel: 500ms panel + 500ms typing start + typing time + 800ms delay + 1000ms final view
      // Estimated total: ~4-5 seconds
      const timer = setTimeout(() => {
        setShowPanel(true);
        // Start typing animation after panel appears
        setTimeout(() => setShowTyping(true), 500);
      }, 4500); // Start when customer details should be in final view

      return () => clearTimeout(timer);
    }
  }, [splashVisible]);

  const getSupportDetails = () => {
    // Support needs data
    const details = [];

    details.push(`018 - Check address`);
    details.push(`021 - Polish Speaking`);
    details.push(`026 - Do not teleport`);

    return details;
  };

  const supportDetails = getSupportDetails();

  // Get the main message
  const getMainMessage = () => {
    return 'Here is the support needs indicators in association with the customer...';
  };

  const mainMessage = getMainMessage();

  // Typing animation for main message
  const { displayText: typedMessage, isTyping: isTypingMessage } =
    useTypingAnimation(
      mainMessage,
      30, // Faster typing speed
      0,
      showTyping
    );

  // Reset typing animation when stage changes
  useEffect(() => {
    if (showPanel) {
      setShowTyping(false);
      setShowFinalView(false);
      const timer = setTimeout(() => setShowTyping(true), 300);
      return () => clearTimeout(timer);
    }
  }, [stage, showPanel]);

  // Show support details only after typing animation completes
  useEffect(() => {
    if (!isTypingMessage && showTyping) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShowSupportDetails(true);
        // Switch to final view after support details appear
        setTimeout(() => setShowFinalView(true), 1000);
      }, 800);

      return () => clearTimeout(timer);
    } else if (isTypingMessage) {
      // Hide support details when typing starts (for stage changes)
      setShowSupportDetails(false);
      setShowFinalView(false);
    }
  }, [isTypingMessage, showTyping]);

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
          height: showFinalView ? '100%' : 'auto', // 100% height in final view
          minHeight: showFinalView ? 'unset' : '120px', // Remove minHeight in final view
          width: '100%', // Take full width of container
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transitions
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
              'linear-gradient(135deg, rgba(17, 182, 122, 0.1) 0%, rgba(17, 182, 122, 0.05) 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'exclude',
            maskComposite: 'exclude',
          },
        }}
      >
        {/* AI Avatar and Name - Using reusable component with auto-hide */}
        <AiAssistantTag
          isTyping={isTypingMessage}
          size="medium"
          autoHide={true}
          hideDelay={800}
        />

        {/* AI Message with Typing Animation - Hide after typing completes but maintain space */}
        <Box
          sx={{
            minHeight: '3.6em', // Always maintain the space for message
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          {isTypingMessage && (
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
              {typedMessage}
              {/* Blinking cursor when typing */}
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
            </Typography>
          )}
        </Box>

        {/* Support Details Section - Show only after typing completely finishes */}
        {showSupportDetails && (
          <Box
            sx={{
              flex: 1,
              position: 'absolute',
              top: 24, // Start from top of component (accounting for padding)
              left: 24,
              right: 24,
              bottom: 24, // Add bottom constraint
            }}
          >
            {supportDetails.map((detail, index) => (
              <Typography
                key={index}
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  mb: 0.8,
                  fontFamily: 'monospace',
                  opacity: 0,
                  wordWrap: 'break-word', // Allow line breaks for long words
                  overflowWrap: 'break-word', // Alternative for better support
                  hyphens: 'auto', // Add hyphens for better line breaks
                  animation: `slideIn 0.4s ease-out ${index * 0.4}s forwards`,
                  '@keyframes slideIn': {
                    from: {
                      opacity: 0,
                      transform: 'translateX(-10px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                }}
              >
                • {detail}
              </Typography>
            ))}
          </Box>
        )}

        {/* Typing indicator for verification stage */}
        <TypingIndicator
          show={stage === 'verifying'}
          message="AI is processing support request..."
          size="small"
        />

        {/* Support completion indicator */}
        {stage === 'verified' && !isTypingMessage && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
              p: 1,
              borderRadius: '8px',
              backgroundColor: 'rgba(17, 182, 122, 0.1)',
              opacity: 0,
              animation: 'slideUp 0.5s ease-out 0.3s forwards',
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
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#11b67a',
                mr: 1,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              Support request processed successfully
            </Typography>
          </Box>
        )}
      </Box>
    </Grow>
  );
};

export default SupportNeedsPanel;
