import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Fab,
  Box,
  Grow,
  Tooltip,
  Paper,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Fade,
} from '@mui/material';
import {
  Apps,
  SwapHoriz,
  Refresh,
  AutoAwesome,
  Close,
  Send,
  Launch,
  Menu,
  ClearAll,
} from '@mui/icons-material';
import QuickAppLauncher from './QuickAppLauncher';

const MoreFunctionButton = ({ onClick }) => {
  const { splashVisible } = useSelector((state) => state.app);
  const [showButton, setShowButton] = useState(false);
  const [showSatellites, setShowSatellites] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showQuickLauncher, setShowQuickLauncher] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message:
        "Hello! I'm your NeoBank AI Assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
      isTyping: false,
    },
  ]);
  const [botIsTyping, setBotIsTyping] = useState(false);
  const chatMessagesRef = React.useRef(null);

  // Show button after splash screen fades
  useEffect(() => {
    let timeoutId = null;

    if (!splashVisible) {
      timeoutId = setTimeout(() => {
        setShowButton(true);
      }, 1200);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [splashVisible]);

  // Auto-scroll to bottom when chat history changes
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory, botIsTyping]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add user message
      const newUserMessage = {
        type: 'user',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString(),
        isTyping: false,
      };

      setChatHistory((prev) => [...prev, newUserMessage]);
      setChatMessage('');

      // Show bot typing indicator
      setBotIsTyping(true);

      // Simple bot response without complex animations
      setTimeout(() => {
        const botResponse = {
          type: 'bot',
          message:
            "Thank you for your message! I'm here to help you with your banking needs.",
          timestamp: new Date().toLocaleTimeString(),
          isTyping: false,
        };

        setChatHistory((prev) => [...prev, botResponse]);
        setBotIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMainButtonClick = () => {
    setShowSatellites(!showSatellites);
    if (onClick) onClick();
  };

  const handleQuickLaunchClick = () => {
    console.log('Quick Launch clicked');
    setShowQuickLauncher(true);
    setShowSatellites(false);
  };

  const handleCloseQuickLauncher = () => {
    setShowQuickLauncher(false);
  };

  const satelliteButtons = [
    {
      icon: <Refresh />,
      tooltip: 'Reset',
      position: { bottom: 0, right: 100 },
      delay: 100,
      onClick: () => console.log('Reset clicked'),
    },
    {
      icon: <Apps />,
      tooltip: 'Quick Launch',
      position: { bottom: 50, right: 80 },
      delay: 200,
      onClick: handleQuickLaunchClick,
    },
    {
      icon: <SwapHoriz />,
      tooltip: 'Switch View',
      position: { bottom: 90, right: 50 },
      delay: 300,
      onClick: () => {
        console.log('Switch View clicked');
        setShowSatellites(false);
        if (onClick) onClick('switchView');
      },
    },
    {
      icon: <AutoAwesome />,
      tooltip: 'AI Chatbot',
      position: { bottom: 110, right: 0 },
      delay: 400,
      onClick: () => {
        console.log('AI Chatbot clicked');
        setShowChatbot(true);
        setShowSatellites(false);
      },
    },
  ];

  return (
    <Grow in={showButton} timeout={600}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          width: 160,
          height: 160,
        }}
        onMouseEnter={() => setShowSatellites(true)}
        onMouseLeave={() => setShowSatellites(false)}
      >
        {/* Satellite Buttons Container */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 160,
            height: 160,
            zIndex: 1001,
          }}
        >
          {satelliteButtons.map((satellite, index) => (
            <Grow
              key={index}
              in={showSatellites}
              timeout={600}
              style={{
                transformOrigin: 'center center',
                transitionDelay: showSatellites
                  ? `${satellite.delay}ms`
                  : '0ms',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: satellite.position.bottom,
                  right: satellite.position.right,
                  zIndex: 1002,
                }}
              >
                <Tooltip title={satellite.tooltip} placement="left" arrow>
                  <Fab
                    size="small"
                    onMouseEnter={() => setShowSatellites(true)}
                    onClick={(e) => {
                      e.stopPropagation();
                      satellite.onClick();
                    }}
                    sx={{
                      width: 40,
                      height: 40,
                      background:
                        'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
                      color: 'white',
                      boxShadow:
                        '0 4px 16px rgba(17, 182, 122, 0.3), 0 2px 6px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, #0c8a5a 0%, #095d44 100%)',
                        transform: 'scale(1.1)',
                        boxShadow:
                          '0 6px 20px rgba(17, 182, 122, 0.4), 0 3px 8px rgba(0,0,0,0.15)',
                      },
                      '&:active': {
                        transform: 'scale(0.9)',
                      },
                    }}
                  >
                    {React.cloneElement(satellite.icon, {
                      sx: {
                        fontSize: '1.1rem',
                        transform:
                          satellite.tooltip === 'Switch View'
                            ? 'rotate(90deg)'
                            : 'none',
                      },
                    })}
                  </Fab>
                </Tooltip>
              </Box>
            </Grow>
          ))}
        </Box>

        {/* Main Button */}
        <Fab
          onMouseEnter={() => setShowSatellites(true)}
          onClick={handleMainButtonClick}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 1003,
            background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
            color: 'white',
            width: 56,
            height: 56,
            boxShadow:
              '0 8px 32px rgba(33, 150, 243, 0.3), 0 2px 8px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: showSatellites ? 'rotate(180deg)' : 'rotate(0deg)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              transform: showSatellites
                ? 'scale(1.05) rotate(180deg)'
                : 'scale(1.05) rotate(0deg)',
              boxShadow:
                '0 12px 40px rgba(33, 150, 243, 0.4), 0 4px 12px rgba(0,0,0,0.2)',
            },
            '&:active': {
              transform: showSatellites
                ? 'scale(0.95) rotate(180deg)'
                : 'scale(0.95) rotate(0deg)',
            },
          }}
        >
          {showSatellites ? (
            <ClearAll
              sx={{
                fontSize: '1.5rem',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          ) : (
            <Menu
              sx={{
                fontSize: '1.5rem',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          )}
        </Fab>

        {/* Quick App Launcher */}
        <QuickAppLauncher
          open={showQuickLauncher}
          onClose={handleCloseQuickLauncher}
        />

        {/* Simple Chatbot Popup */}
        <Fade in={showChatbot} timeout={400}>
          <Paper
            sx={{
              position: 'fixed',
              bottom: 200,
              right: 24,
              width: 380,
              height: 500,
              zIndex: 2000,
              borderRadius: '20px',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.98) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(17, 182, 122, 0.2)',
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
                color: 'white',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: 'rgba(255,255,255,0.2)',
                  }}
                >
                  <AutoAwesome sx={{ fontSize: '1.2rem' }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: '1rem', fontWeight: 600 }}
                  >
                    NeoBank AI Assistant
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Online • Ready to help
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => setShowChatbot(false)}
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* Chat Messages */}
            <Box
              ref={chatMessagesRef}
              sx={{
                flex: 1,
                p: 2,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {chatHistory.map((chat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent:
                      chat.type === 'user' ? 'flex-end' : 'flex-start',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '75%',
                      p: 1.5,
                      borderRadius: '12px',
                      background:
                        chat.type === 'user'
                          ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          : 'rgba(240, 240, 240, 0.8)',
                      color: chat.type === 'user' ? 'white' : 'text.primary',
                      boxShadow:
                        chat.type === 'user'
                          ? '0 4px 16px rgba(59, 130, 246, 0.3)'
                          : '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.875rem', lineHeight: 1.4 }}
                    >
                      {chat.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.7,
                        fontSize: '0.7rem',
                        display: 'block',
                        mt: 0.5,
                      }}
                    >
                      {chat.timestamp}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {botIsTyping && (
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '12px',
                      background: 'rgba(240, 240, 240, 0.8)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
                    >
                      AI is typing...
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Input Area */}
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid rgba(0,0,0,0.08)',
                background: 'rgba(250,250,250,0.8)',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <TextField
                  multiline
                  maxRows={3}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  variant="outlined"
                  size="small"
                  sx={{ flex: 1 }}
                />
                <IconButton
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  sx={{
                    background:
                      'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
                    color: 'white',
                    width: 40,
                    height: 40,
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #0c8a5a 0%, #095d44 100%)',
                    },
                    '&:disabled': {
                      background: 'rgba(0,0,0,0.12)',
                      color: 'rgba(0,0,0,0.26)',
                    },
                  }}
                >
                  <Send sx={{ fontSize: '1.1rem' }} />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* Chatbot backdrop */}
        {showChatbot && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.2)',
              zIndex: 1999,
            }}
            onClick={() => setShowChatbot(false)}
          />
        )}
      </Box>
    </Grow>
  );
};

export default MoreFunctionButton;
