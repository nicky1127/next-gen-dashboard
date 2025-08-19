// File: src/components/common/BankWallpaper.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, Grow } from '@mui/material';
import { TrendingUp, Security, Speed, Analytics } from '@mui/icons-material';

const BankWallpaper = ({ isSimpleView = false }) => {
  const [showExpandedContent, setShowExpandedContent] = useState(false);

  // Show expanded content when switching to simple view
  useEffect(() => {
    if (isSimpleView) {
      const timer = setTimeout(() => {
        setShowExpandedContent(true);
      }, 300); // Delay to allow smooth transition

      return () => clearTimeout(timer);
    } else {
      setShowExpandedContent(false);
    }
  }, [isSimpleView]);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bank-wallpaper.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        // Overlay to make text more readable in expanded mode
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isSimpleView
            ? 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(250,250,250,0.6) 100%)'
            : 'transparent',
          transition: 'all 0.5s ease-in-out',
          zIndex: 1,
        },
      }}
    >
      {/* Expanded Content - Only show in simple view */}
      {isSimpleView && (
        <Fade in={showExpandedContent} timeout={800}>
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              maxWidth: '800px',
              px: 4,
            }}
          >
            {/* Main Heading */}
            <Grow in={showExpandedContent} timeout={1000}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 300,
                  color: '#1a1a1a',
                  mb: 2,
                  letterSpacing: '-0.02em',
                }}
              >
                Banking Workspace
              </Typography>
            </Grow>

            <Grow in={showExpandedContent} timeout={1200}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 400,
                  color: '#666666',
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Maximize your productivity with our streamlined interface
              </Typography>
            </Grow>

            {/* Feature Cards */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: 3,
                mt: 4,
              }}
            >
              {[
                {
                  icon: <TrendingUp />,
                  title: 'Analytics',
                  desc: 'Real-time insights',
                },
                {
                  icon: <Security />,
                  title: 'Security',
                  desc: 'Bank-grade protection',
                },
                {
                  icon: <Speed />,
                  title: 'Performance',
                  desc: 'Lightning fast',
                },
                {
                  icon: <Analytics />,
                  title: 'Intelligence',
                  desc: 'AI-powered decisions',
                },
              ].map((feature, index) => (
                <Grow
                  key={feature.title}
                  in={showExpandedContent}
                  timeout={1000}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <Box
                    sx={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.95) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(17, 182, 122, 0.1)',
                      borderRadius: '16px',
                      p: 3,
                      textAlign: 'center',
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(17, 182, 122, 0.15)',
                        borderColor: 'rgba(17, 182, 122, 0.3)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: 'white',
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        sx: { fontSize: '1.5rem' },
                      })}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#1a1a1a',
                        mb: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.875rem',
                        color: '#666666',
                        lineHeight: 1.4,
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </Box>
                </Grow>
              ))}
            </Box>

            {/* Call to Action */}
            <Grow in={showExpandedContent} timeout={1400}>
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  background:
                    'linear-gradient(135deg, rgba(17, 182, 122, 0.08) 0%, rgba(17, 182, 122, 0.12) 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(17, 182, 122, 0.2)',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: '#1a1a1a',
                    fontSize: '1rem',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Enhanced Workspace Active
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666666',
                    fontSize: '0.875rem',
                  }}
                >
                  You now have maximum screen space for banking operations and
                  customer interactions
                </Typography>
              </Box>
            </Grow>
          </Box>
        </Fade>
      )}

      {/* Original SVG Content - Show in normal view */}
      {!isSimpleView && (
        <Fade in={!isSimpleView} timeout={500}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          />
        </Fade>
      )}
    </Box>
  );
};

export default BankWallpaper;
