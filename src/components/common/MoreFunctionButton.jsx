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

  // Auto-scroll to bottom when chat history changes or bot is typing
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory, botIsTyping]);

  // Show button after splash screen fades
  useEffect(() => {
    if (!splashVisible) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [splashVisible]);

  const simulateTyping = (message, callback) => {
    const words = message.split(' ');
    let currentText = '';
    let wordIndex = 0;

    const typeWord = () => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        callback(currentText);
        wordIndex++;
        setTimeout(typeWord, 150 + Math.random() * 100); // Variable typing speed
      }
    };

    typeWord();
  };

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

      // Simulate bot response with typing animation
      setTimeout(() => {
        const fullBotMessage =
          "Thank you for your message! I'm processing your request and will help you shortly. Our AI system is analyzing your needs to provide the best possible assistance.";

        // Add initial bot message with empty text
        const botMessageId = Date.now();
        const initialBotMessage = {
          id: botMessageId,
          type: 'bot',
          message: '',
          timestamp: new Date().toLocaleTimeString(),
          isTyping: true,
        };

        setChatHistory((prev) => [...prev, initialBotMessage]);
        setBotIsTyping(false);

        // Simulate typing animation
        simulateTyping(fullBotMessage, (currentText) => {
          setChatHistory((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, message: currentText } : msg
            )
          );
        });

        // Mark typing as complete after full message
        setTimeout(
          () => {
            setChatHistory((prev) =>
              prev.map((msg) =>
                msg.id === botMessageId ? { ...msg, isTyping: false } : msg
              )
            );
          },
          fullBotMessage.split(' ').length * 200
        );
      }, 1500); // Delay before bot starts typing
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

  const handleMouseEnter = () => {
    setShowSatellites(true);
  };

  const handleMouseLeave = () => {
    setShowSatellites(false);
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
      onClick: () => console.log('Switch view clicked'),
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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

        {/* Floating Bubble Effects for Chatbot */}
        {showChatbot && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 150,
              right: -50,
              width: '500px',
              height: '400px',
              zIndex: 1999,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            {/* Animated floating bubbles around chatbot */}
            {[...Array(4)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  width: `${Math.random() * 15 + 8}px`,
                  height: `${Math.random() * 15 + 8}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(17, 182, 122, ${0.15 + Math.random() * 0.15}) 0%, transparent 70%)`,
                  border: '1px solid rgba(17, 182, 122, 0.1)',
                  bottom: `${20 + Math.random() * 100}px`,
                  right: `${50 + Math.random() * 200}px`,
                  animation: `chatbotFloatUp${index} ${2.5 + Math.random() * 1.5}s ease-out infinite`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  '@keyframes chatbotFloatUp0': {
                    '0%': {
                      transform: 'translateY(0) scale(0)',
                      opacity: 0,
                    },
                    '20%': {
                      transform: 'translateY(-15px) scale(1)',
                      opacity: 1,
                    },
                    '100%': {
                      transform: 'translateY(-80px) scale(0.5)',
                      opacity: 0,
                    },
                  },
                  '@keyframes chatbotFloatUp1': {
                    '0%': {
                      transform: 'translateY(0) translateX(0) scale(0)',
                      opacity: 0,
                    },
                    '20%': {
                      transform: 'translateY(-12px) translateX(8px) scale(1)',
                      opacity: 1,
                    },
                    '100%': {
                      transform:
                        'translateY(-70px) translateX(15px) scale(0.3)',
                      opacity: 0,
                    },
                  },
                  '@keyframes chatbotFloatUp2': {
                    '0%': {
                      transform: 'translateY(0) translateX(0) scale(0)',
                      opacity: 0,
                    },
                    '20%': {
                      transform: 'translateY(-20px) translateX(-12px) scale(1)',
                      opacity: 1,
                    },
                    '100%': {
                      transform:
                        'translateY(-90px) translateX(-20px) scale(0.2)',
                      opacity: 0,
                    },
                  },
                  '@keyframes chatbotFloatUp3': {
                    '0%': {
                      transform: 'translateY(0) scale(0)',
                      opacity: 0,
                    },
                    '20%': {
                      transform: 'translateY(-18px) scale(1)',
                      opacity: 1,
                    },
                    '100%': {
                      transform: 'translateY(-85px) scale(0.4)',
                      opacity: 0,
                    },
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Chatbot Popup */}
        <Fade in={showChatbot} timeout={0}>
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
              // Bubble animation - moves from down to up from AI satellite button
              animation: showChatbot
                ? 'chatbotBubbleExpand 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                : 'none',
              transformOrigin: 'bottom right', // Origin point at satellite button location
              '@keyframes chatbotBubbleExpand': {
                '0%': {
                  transform: 'scale(0) translateY(150px)',
                  borderRadius: '50px',
                  opacity: 0,
                },
                '60%': {
                  transform: 'scale(1.05) translateY(-10px)',
                  borderRadius: '25px',
                  opacity: 0.8,
                },
                '100%': {
                  transform: 'scale(1) translateY(0)',
                  borderRadius: '20px',
                  opacity: 1,
                },
              },
              // Floating bubble decorations similar to QuickAppLauncher
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                borderRadius: '20px',
                background: `
                  radial-gradient(circle at 85% 20%, rgba(17, 182, 122, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 15% 80%, rgba(17, 182, 122, 0.05) 0%, transparent 40%),
                  radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)
                `,
                animation: showChatbot
                  ? 'chatbotBubbleFloat 3s ease-in-out infinite'
                  : 'none',
                zIndex: 1,
                '@keyframes chatbotBubbleFloat': {
                  '0%, 100%': {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 0.6,
                  },
                  '33%': {
                    transform: 'translate(2px, -1px) scale(1.02)',
                    opacity: 0.8,
                  },
                  '66%': {
                    transform: 'translate(-1px, 1px) scale(0.98)',
                    opacity: 0.7,
                  },
                },
              },
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
                    animation: 'sparkle 2s ease-in-out infinite',
                    '@keyframes sparkle': {
                      '0%, 100%': {
                        transform: 'scale(1)',
                        boxShadow: '0 0 10px rgba(255,255,255,0.3)',
                      },
                      '50%': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 0 20px rgba(255,255,255,0.6)',
                      },
                    },
                  }}
                >
                  <AutoAwesome
                    sx={{
                      fontSize: '1.2rem',
                      animation: 'sparkleIcon 3s ease-in-out infinite',
                      '@keyframes sparkleIcon': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.7 },
                      },
                    }}
                  />
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
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
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
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0,0,0,0.05)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(17, 182, 122, 0.3)',
                  borderRadius: '10px',
                  '&:hover': {
                    background: 'rgba(17, 182, 122, 0.5)',
                  },
                },
              }}
            >
              {chatHistory.map((chat, index) => (
                <Box
                  key={chat.id || index}
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
                      {/* Typing cursor for bot messages */}
                      {chat.type === 'bot' && chat.isTyping && (
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-block',
                            width: '2px',
                            height: '1em',
                            backgroundColor: '#667eea',
                            ml: 0.3,
                            animation: 'cursor 1s infinite',
                            '@keyframes cursor': {
                              '0%, 50%': { opacity: 1 },
                              '51%, 100%': { opacity: 0 },
                            },
                          }}
                        />
                      )}
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

              {/* Bot typing indicator */}
              {botIsTyping && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '12px',
                      background: 'rgba(240, 240, 240, 0.8)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 0.3,
                        '& > div': {
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#667eea',
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
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      background:
                        'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                      '& fieldset': {
                        borderColor: 'rgba(100, 116, 139, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(100, 116, 139, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#64748b',
                        borderWidth: '2px',
                      },
                      '&.Mui-focused': {
                        background:
                          'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#334155',
                      '&::placeholder': {
                        color: '#94a3b8',
                        opacity: 1,
                      },
                    },
                  }}
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

        {/* Background overlay when satellites are shown */}
        {showSatellites && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 998,
              pointerEvents: 'none',
            }}
          />
        )}

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
