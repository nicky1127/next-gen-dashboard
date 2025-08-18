// File: src/components/common/QuickAppLauncher.jsx
import React from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Fade,
  Divider,
} from '@mui/material';
import { Close, Launch } from '@mui/icons-material';

/**
 * QuickAppLauncher Component
 * A wide, short popup that appears when clicking the Quick Launch satellite button
 * @param {boolean} open - Whether the launcher is open
 * @param {function} onClose - Function to close the launcher
 */
const QuickAppLauncher = ({ open = false, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 2000,
            display: open ? 'block' : 'none',
          }}
          onClick={onClose}
        />
      </Fade>

      {/* Floating Bubble Effects */}
      {open && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '200px',
            zIndex: 2000,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Animated floating bubbles */}
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(17, 182, 122, ${0.1 + Math.random() * 0.2}) 0%, transparent 70%)`,
                border: '1px solid rgba(17, 182, 122, 0.1)',
                bottom: '20px',
                left: `${60 + Math.random() * 30}%`,
                animation: `floatUp${index} ${3 + Math.random() * 2}s ease-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                '@keyframes floatUp0': {
                  '0%': {
                    transform: 'translateY(0) scale(0)',
                    opacity: 0,
                  },
                  '20%': {
                    transform: 'translateY(-20px) scale(1)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'translateY(-100px) scale(0.5)',
                    opacity: 0,
                  },
                },
                '@keyframes floatUp1': {
                  '0%': {
                    transform: 'translateY(0) translateX(0) scale(0)',
                    opacity: 0,
                  },
                  '20%': {
                    transform: 'translateY(-15px) translateX(10px) scale(1)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'translateY(-80px) translateX(20px) scale(0.3)',
                    opacity: 0,
                  },
                },
                '@keyframes floatUp2': {
                  '0%': {
                    transform: 'translateY(0) translateX(0) scale(0)',
                    opacity: 0,
                  },
                  '20%': {
                    transform: 'translateY(-25px) translateX(-15px) scale(1)',
                    opacity: 1,
                  },
                  '100%': {
                    transform:
                      'translateY(-120px) translateX(-30px) scale(0.2)',
                    opacity: 0,
                  },
                },
                '@keyframes floatUp3': {
                  '0%': {
                    transform: 'translateY(0) scale(0)',
                    opacity: 0,
                  },
                  '20%': {
                    transform: 'translateY(-18px) scale(1)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'translateY(-90px) scale(0.4)',
                    opacity: 0,
                  },
                },
                '@keyframes floatUp4': {
                  '0%': {
                    transform: 'translateY(0) translateX(0) scale(0)',
                    opacity: 0,
                  },
                  '20%': {
                    transform: 'translateY(-30px) translateX(25px) scale(1)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'translateY(-110px) translateX(45px) scale(0.1)',
                    opacity: 0,
                  },
                },
                '@keyframes floatUp5': {
                  '0%': {
                    transform: 'translateY(0) translateX(0) scale(0)',
                    opacity: 0,
                  },
                  '20%': {
                    transform: 'translateY(-22px) translateX(-20px) scale(1)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'translateY(-95px) translateX(-40px) scale(0.3)',
                    opacity: 0,
                  },
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Launcher Panel with Bubble Effect */}
      <Fade in={open} timeout={0}>
        <Paper
          sx={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90vw',
            maxWidth: '1200px',
            height: '100px',
            zIndex: 2001,
            borderRadius: '20px',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,250,250,0.99) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(17, 182, 122, 0.2)',
            boxShadow:
              '0 12px 40px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
            display: open ? 'flex' : 'none',
            alignItems: 'center',
            overflow: 'hidden',
            // Bubble animation - starts from bottom right where satellite button is
            animation: open
              ? 'bubbleExpand 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
              : 'none',
            transformOrigin: 'calc(100% - 100px) 100%', // Origin point near satellite button
            '@keyframes bubbleExpand': {
              '0%': {
                transform: 'translateX(-50%) scale(0)',
                borderRadius: '50px',
                opacity: 0,
              },
              '60%': {
                transform: 'translateX(-50%) scale(1.05)',
                borderRadius: '25px',
                opacity: 0.8,
              },
              '100%': {
                transform: 'translateX(-50%) scale(1)',
                borderRadius: '20px',
                opacity: 1,
              },
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '20px',
              padding: '1px',
              background:
                'linear-gradient(135deg, rgba(17, 182, 122, 0.15) 0%, rgba(17, 182, 122, 0.05) 100%)',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'exclude',
              maskComposite: 'exclude',
            },
            // Floating bubble decorations
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
              animation: open ? 'bubbleFloat 3s ease-in-out infinite' : 'none',
              zIndex: 1,
              '@keyframes bubbleFloat': {
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
          {/* Left Section - Icon and Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              pl: 3,
              pr: 2,
              position: 'relative',
              zIndex: 2,
              minWidth: '200px',
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 8px rgba(17, 182, 122, 0.3)',
              }}
            >
              <Launch
                sx={{
                  color: 'white',
                  fontSize: '1rem',
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  lineHeight: 1.2,
                }}
              >
                Quick Launch
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                }}
              >
                External tools
              </Typography>
            </Box>
          </Box>

          {/* Vertical Divider */}
          <Box
            sx={{
              width: '1px',
              height: '50px',
              backgroundColor: 'rgba(17, 182, 122, 0.2)',
              mx: 1,
              position: 'relative',
              zIndex: 2,
            }}
          />

          {/* Content Area - App Icons Lineup */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Banking App Icons */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                paddingRight: '10px', // Add padding to prevent edge clipping
                marginRight: '-10px', // Offset the padding to maintain layout
                // Hide scrollbar completely
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                // For Firefox
                scrollbarWidth: 'none',
                // For IE and Edge
                msOverflowStyle: 'none',
              }}
            >
              {[
                {
                  name: 'PayFlow',
                  file: 'payflow_logo.svg',
                  url: 'https://payflow.example.com',
                },
                {
                  name: 'CryptoVault',
                  file: 'cryptovault_logo.svg',
                  url: 'https://cryptovault.example.com',
                },
                {
                  name: 'LoanHub',
                  file: 'loanhub_logo.svg',
                  url: 'https://loanhub.example.com',
                },
                {
                  name: 'InvestPro',
                  file: 'investpro_logo.svg',
                  url: 'https://investpro.example.com',
                },
                {
                  name: 'TaxAssist',
                  file: 'taxassist_logo.svg',
                  url: 'https://taxassist.example.com',
                },
                {
                  name: 'BudgetWise',
                  file: 'budgetwise_logo.svg',
                  url: 'https://budgetwise.example.com',
                },
                {
                  name: 'SecureBank',
                  file: 'securebank_logo.svg',
                  url: 'https://securebank.example.com',
                },
                {
                  name: 'TradeLink',
                  file: 'tradelink_logo.svg',
                  url: 'https://tradelink.example.com',
                },
                {
                  name: 'FinanceHub',
                  file: 'financehub_logo.svg',
                  url: 'https://financehub.example.com',
                },
                {
                  name: 'MoneyFlow',
                  file: 'moneyflow_logo.svg',
                  url: 'https://moneyflow.example.com',
                },
              ].map((app, index) => (
                <Box
                  key={app.name}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    minWidth: '60px',
                    opacity: 0,
                    animation: `appSlideIn 0.4s ease-out ${index * 0.1}s forwards`,
                    '@keyframes appSlideIn': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(10px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                    '&:hover': {
                      '& .app-icon': {
                        transform: 'scale(1.08) translateY(-3px)',
                        filter: 'brightness(1.08) saturate(1.1)',
                      },
                    },
                  }}
                  onClick={() => {
                    console.log(`Opening ${app.name} at ${app.url}`);
                    // You can replace this with actual navigation logic
                    // window.open(app.url, '_blank');
                  }}
                >
                  <Box
                    className="app-icon"
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow:
                        '0 2px 6px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      willChange: 'transform, filter',
                    }}
                  >
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/assets/${app.file}`}
                      alt={app.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Section - Close Button */}
          <Box
            sx={{
              pr: 3,
              position: 'relative',
              zIndex: 2,
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                width: 32,
                height: 32,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  color: 'text.primary',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Close sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Box>

          {/* Background Decoration */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 15% 50%, rgba(17, 182, 122, 0.02) 0%, transparent 40%),
                radial-gradient(circle at 85% 50%, rgba(17, 182, 122, 0.01) 0%, transparent 30%)
              `,
              zIndex: 1,
              borderRadius: '20px',
            }}
          />

          {/* Subtle Circuit Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                linear-gradient(90deg, rgba(17, 182, 122, 0.02) 1px, transparent 1px),
                linear-gradient(rgba(17, 182, 122, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              opacity: 0.4,
              zIndex: 1,
              borderRadius: '20px',
            }}
          />
        </Paper>
      </Fade>
    </>
  );
};

export default QuickAppLauncher;
