// File: src/components/common/CustomerDetailsPanel.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grow } from '@mui/material';
import useTypingAnimation from '../../hooks/useTypingAnimation';
import TypingIndicator from './TypingIndicator';
import AiAssistantTag from './AiAssistantTag';

const CustomerDetailsPanel = ({ skipAnimations = false }) => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);
  const [showPanel, setShowPanel] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] =
    useState(skipAnimations);
  const [showFinalView, setShowFinalView] = useState(skipAnimations);

  // Start CustomerDetailsPanel after IvrContextPanel completes
  useEffect(() => {
    let timeoutId = null;

    if (!splashVisible) {
      const delay = skipAnimations ? 200 : 4500;

      timeoutId = setTimeout(() => {
        setShowPanel(true);
        if (skipAnimations) {
          // Skip all animations and go straight to final view
          setShowCustomerDetails(true);
          setShowFinalView(true);
        } else {
          // First time - show typing animation
          setTimeout(() => setShowTyping(true), 500);
        }
      }, delay);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [splashVisible, skipAnimations]);

  const getCustomerDetails = () => {
    // Use sample data when no real data is available, or mix with real data
    const sampleData = {
      name: data.name || 'Chris Smith',
      dateOfBirth: '14/02/1978 (47)',
      verified: data.verified !== undefined ? data.verified : false,
    };

    const details = [];

    details.push({ label: 'Name:', value: sampleData.name });
    details.push({ label: 'DoB:', value: sampleData.dateOfBirth });
    details.push({ label: 'Home:', value: '07845132587' });
    details.push({ label: 'Mobile:', value: '07412459865' });
    details.push({ label: 'Work:', value: '07614578945' });
    details.push({
      label: 'Verified:',
      value: sampleData.verified ? 'Yes' : 'Pending',
    });

    return details;
  };

  const getCustomerAddress = () => {
    return [
      '910 Upper Way',
      'Eccleshill',
      'Eaglescliffe',
      'Birkenshaw',
      'M19 0HD',
    ];
  };

  const customerDetails = getCustomerDetails();
  const customerAddress = getCustomerAddress();

  // Get the main message
  const getMainMessage = () => {
    return "Hello! I'm here to guide you through the customer journey. Here are the details about the customer:";
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
    let timeoutId = null;

    if (showPanel) {
      setShowTyping(false);
      setShowFinalView(false);
      timeoutId = setTimeout(() => setShowTyping(true), 300);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [stage, showPanel]);

  // Show customer details only after typing animation completes
  useEffect(() => {
    let timeoutId = null;

    if (!isTypingMessage && showTyping) {
      // Small delay to ensure smooth transition
      timeoutId = setTimeout(() => {
        setShowCustomerDetails(true);
        // Switch to final view after customer details appear
        setTimeout(() => setShowFinalView(true), 1000);
      }, 800);
    } else if (isTypingMessage) {
      // Hide customer details when typing starts (for stage changes)
      setShowCustomerDetails(false);
      setShowFinalView(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
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
          minWidth: '480px', // Wider to accommodate two sections
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
        {showCustomerDetails && (
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
              Customer Details
            </Typography>
          </Box>
        )}

        {/* AI Avatar and Name - Using reusable component with auto-hide */}
        {!showCustomerDetails && (
          <AiAssistantTag
            isTyping={isTypingMessage}
            size="medium"
            autoHide={true}
            hideDelay={800}
          />
        )}

        {/* AI Message with Typing Animation - Hide after typing completes but maintain space */}
        {!showCustomerDetails && (
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

        {/* Customer Details Section - Show only after typing completely finishes */}
        {showCustomerDetails && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              gap: 3, // Space between sections
            }}
          >
            {/* Left Section - Personal Details */}
            <Box sx={{ flex: 1 }}>
              {customerDetails.map((detail, index) => (
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
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto',
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
                  •{' '}
                  <Box component="span" sx={{ fontWeight: 'bold' }}>
                    {detail.label}
                  </Box>{' '}
                  {detail.value}
                </Typography>
              ))}
            </Box>

            {/* Vertical Divider */}
            <Box
              sx={{
                width: '1px',
                backgroundColor: 'rgba(17, 182, 122, 0.2)',
                mx: 1,
                opacity: 0,
                animation: 'dividerFadeIn 0.5s ease-out 1s forwards',
                '@keyframes dividerFadeIn': {
                  from: {
                    opacity: 0,
                    height: '0%',
                  },
                  to: {
                    opacity: 1,
                    height: '100%',
                  },
                },
              }}
            />

            {/* Right Section - Address */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  mb: 0.8,
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  opacity: 0,
                  animation: 'slideIn 0.4s ease-out 2.4s forwards', // Start after left section
                  '@keyframes slideIn': {
                    from: {
                      opacity: 0,
                      transform: 'translateX(10px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                }}
              >
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  Address:
                </Box>
              </Typography>
              {customerAddress.map((line, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    lineHeight: 1.6,
                    mb: 0.4,
                    fontFamily: 'monospace',
                    opacity: 0,
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto',
                    animation: `slideIn 0.4s ease-out ${2.8 + index * 0.2}s forwards`, // Staggered after "Address:"
                    '@keyframes slideIn': {
                      from: {
                        opacity: 0,
                        transform: 'translateX(10px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    },
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        {/* Typing indicator for verification stage */}
        <TypingIndicator
          show={stage === 'verifying'}
          message="AI is processing customer data..."
          size="small"
        />

        {/* Customer completion indicator */}
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
              Customer details verified successfully
            </Typography>
          </Box>
        )}
      </Box>
    </Grow>
  );
};

export default CustomerDetailsPanel;
