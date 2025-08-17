// File: src/components/common/IvrContextPanel.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grow } from '@mui/material';
import useTypingAnimation from '../../hooks/useTypingAnimation';
import TypingIndicator from './TypingIndicator';
import AiAssistantTag from './AiAssistantTag';

const IvrContextPanel = () => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);
  const [showPanel, setShowPanel] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showIvrDetails, setShowIvrDetails] = useState(false);
  const [showFinalView, setShowFinalView] = useState(false);

  // Trigger panel animation after splash screen fades
  useEffect(() => {
    if (!splashVisible) {
      const timer = setTimeout(() => {
        setShowPanel(true);
        // Start typing animation after panel appears
        setTimeout(() => setShowTyping(true), 500);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [splashVisible]);

  // Reset typing animation when stage changes
  useEffect(() => {
    if (showPanel) {
      setShowTyping(false);
      setShowFinalView(false);
      const timer = setTimeout(() => setShowTyping(true), 300);
      return () => clearTimeout(timer);
    }
  }, [stage, showPanel]);

  const getIvrDetails = () => {
    // IVR context data
    const details = [];

    details.push(`Wait Time: 00:00:05`);
    details.push(`Call Reason: Change of Address`);
    details.push(`Utterance: I'm calling to update my address`);
    details.push(
      `B/O Reason: INFO-Cust doesn't have their account number with them`
    );
    details.push(`Breakout Time: 18:45:56`);
    details.push(`Call Number: 07544129854`);
    details.push(`VDN: 1116158`);

    return details;
  };

  const ivrDetails = getIvrDetails();

  // Get the main message
  const getMainMessage = () => {
    return "Hello! I'm here to guide you through the customer journey. Here are the IVR details:";
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

  // Show IVR details only after typing animation completes
  useEffect(() => {
    if (!isTypingMessage && showTyping) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShowIvrDetails(true);
        // Switch to final view after IVR details appear
        setTimeout(() => setShowFinalView(true), 1000);
      }, 800);

      return () => clearTimeout(timer);
    } else if (isTypingMessage) {
      // Hide IVR details when typing starts (for stage changes)
      setShowIvrDetails(false);
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
          paddingTop: 5, // Extra padding for the top border text
          height: showFinalView ? '100%' : 'auto', // 100% height in final view
          minHeight: showFinalView ? 'unset' : '120px', // Remove minHeight in final view
          width: '100%', // Take full width of container
          minWidth: '320px', // Ensure minimum width for content
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
        {/* Top Border with Title - Show only when AI tag disappears */}
        {showIvrDetails && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '32px',
              background: 'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
              borderRadius: '24px 24px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              opacity: 0,
              animation: 'borderSlideIn 0.5s ease-out 0.3s forwards',
              '@keyframes borderSlideIn': {
                from: {
                  opacity: 0,
                  transform: 'translateY(-10px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              IVR Context
            </Typography>
          </Box>
        )}
        {/* Brand Logo Tag - Top Left Corner (Slightly bigger and more inward) */}
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            left: -8,
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow:
              '0 3px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
            border: '1.5px solid rgba(17, 182, 122, 0.1)',
            zIndex: 10,
            opacity: 0,
            transform: 'scale(0.8)',
            animation: showPanel
              ? 'logoTagAppear 0.8s ease-out 0.5s forwards'
              : 'none',
            '@keyframes logoTagAppear': {
              from: {
                opacity: 0,
                transform: 'scale(0.8) rotate(-10deg)',
              },
              to: {
                opacity: 1,
                transform: 'scale(1) rotate(0deg)',
              },
            },
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow:
                '0 4px 16px rgba(17, 182, 122, 0.15), 0 2px 4px rgba(0,0,0,0.08)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          }}
        >
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/neobank-trademark.svg`}
            alt="NeoBank"
            sx={{
              width: 30,
              height: 30,
              transition: 'all 0.3s ease',
            }}
          />
        </Box>
        {/* AI Avatar and Name - Using reusable component with auto-hide */}
        {!showIvrDetails && (
          <AiAssistantTag
            isTyping={isTypingMessage}
            size="medium"
            autoHide={true}
            hideDelay={800}
          />
        )}

        {/* AI Message with Typing Animation - Hide after typing completes but maintain space */}
        {!showIvrDetails && (
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
        )}

        {/* IVR Details Section - Show only after typing completely finishes */}
        {showIvrDetails && (
          <Box
            sx={{
              flex: 1,
            }}
          >
            {ivrDetails.map((detail, index) => (
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
          message="AI is processing IVR context..."
          size="small"
        />

        {/* IVR completion indicator */}
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
              IVR context captured successfully
            </Typography>
          </Box>
        )}
      </Box>
    </Grow>
  );
};

export default IvrContextPanel;
