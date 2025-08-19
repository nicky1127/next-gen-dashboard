import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Fade,
  Paper,
  Typography,
  Chip,
  Divider,
  Grow,
} from '@mui/material';
import { Phone, Person, Support, Security } from '@mui/icons-material';
import { setSplashVisible } from '../../store/slices/appSlice';
import SplashScreen from '../common/SplashScreen';
import SessionContextContainer from '../common/SessionContextContainer';
import WorkingWindowArea from '../common/WorkingWindowArea';
import MoreFunctionButton from '../common/MoreFunctionButton';

// Safe SimpleViewPanel component
const SimpleViewPanel = ({ onLogoClick, isMinimized }) => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    if (!splashVisible && !isMinimized) {
      timeoutId = setTimeout(() => {
        setShowPanel(true);
      }, 300);
    } else if (isMinimized) {
      setShowPanel(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [splashVisible, isMinimized]);

  const consolidatedData = {
    ivr: {
      waitTime: '00:00:05',
      callReason: 'Change of Address',
      callNumber: '07544129854',
    },
    customer: {
      name: data.name || 'Chris Smith',
      verified: data.verified !== undefined ? data.verified : false,
      phone: '07412459865',
      address: 'M19 0HD',
    },
    support: {
      needs: [
        '018 - Check address',
        '021 - Polish Speaking',
        '026 - Do not teleport',
      ],
    },
  };

  return (
    <Paper
      sx={{
        height: isMinimized ? '0px' : '60px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
        borderRadius: 0,
        borderBottom: isMinimized ? 'none' : '1px solid rgba(0,0,0,0.08)',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden',
        px: isMinimized ? 0 : 6,
        transform:
          showPanel && !isMinimized ? 'translateY(0)' : 'translateY(-60px)',
        opacity: showPanel && !isMinimized ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Brand Logo - Clickable to minimize/expand */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mr: 4,
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
        onClick={onLogoClick}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/neobank-trademark.svg`}
          alt="NeoBank"
          sx={{ width: 32, height: 32 }}
        />
      </Box>

      {/* IVR Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
        <Phone sx={{ color: 'primary.main', fontSize: '1.2rem', mr: 1 }} />
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.7rem',
              color: 'text.secondary',
              display: 'block',
            }}
          >
            Call: {consolidatedData.ivr.callNumber}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: '0.7rem', color: 'text.secondary' }}
          >
            Wait: {consolidatedData.ivr.waitTime}
          </Typography>
        </Box>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, borderColor: 'rgba(17, 182, 122, 0.2)' }}
      />

      {/* Customer Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
        <Person sx={{ color: 'primary.main', fontSize: '1.2rem', mr: 1 }} />
        <Box>
          <Typography
            variant="body2"
            sx={{ fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.2 }}
          >
            {consolidatedData.customer.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: '0.7rem', color: 'text.secondary' }}
          >
            {consolidatedData.customer.phone} •{' '}
            {consolidatedData.customer.address}
          </Typography>
        </Box>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, borderColor: 'rgba(17, 182, 122, 0.2)' }}
      />

      {/* Support Needs */}
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
        <Support sx={{ color: 'primary.main', fontSize: '1.2rem', mr: 1 }} />
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            flexWrap: 'wrap',
            maxWidth: '200px',
          }}
        >
          {consolidatedData.support.needs.slice(0, 2).map((need, index) => (
            <Chip
              key={index}
              label={need.split(' - ')[0]}
              size="small"
              sx={{
                height: '18px',
                fontSize: '0.65rem',
                backgroundColor: 'rgba(17, 182, 122, 0.1)',
                color: 'primary.main',
                '& .MuiChip-label': { px: 0.5 },
              }}
            />
          ))}
        </Box>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, borderColor: 'rgba(17, 182, 122, 0.2)' }}
      />

      {/* Status - Removed "Reason: Change of Address", keeping only verification status */}
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
        <Security sx={{ color: 'primary.main', fontSize: '1.2rem', mr: 1 }} />
        <Box>
          <Chip
            label={consolidatedData.customer.verified ? 'Verified' : 'Pending'}
            size="small"
            sx={{
              height: '16px',
              fontSize: '0.6rem',
              backgroundColor: consolidatedData.customer.verified
                ? 'rgba(56, 161, 105, 0.1)'
                : 'rgba(255, 152, 0, 0.1)',
              color: consolidatedData.customer.verified ? '#38a169' : '#e65100',
              '& .MuiChip-label': { px: 0.5 },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      {/* Status Indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{ fontSize: '0.65rem', color: 'text.secondary', mr: 1 }}
        >
          Quick View Active
        </Typography>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#11b67a',
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1, transform: 'scale(1)' },
              '50%': { opacity: 0.7, transform: 'scale(1.2)' },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

// Floating Logo Component
const FloatingLogo = ({ onClick, show }) => {
  return (
    <Grow in={show} timeout={600}>
      <Paper
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.98) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(17, 182, 122, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow:
              '0 12px 40px rgba(17, 182, 122, 0.25), 0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid rgba(17, 182, 122, 0.3)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
          // Subtle floating animation
          animation: 'floatAnimation 3s ease-in-out infinite',
          '@keyframes floatAnimation': {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-5px)',
            },
          },
          '&:hover': {
            animation: 'none',
            transform: 'scale(1.1)',
          },
        }}
        onClick={onClick}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/neobank-trademark.svg`}
          alt="NeoBank"
          sx={{
            width: 36,
            height: 36,
            transition: 'transform 0.3s ease-in-out',
          }}
        />

        {/* Pulse effect ring */}
        <Box
          sx={{
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderRadius: '50%',
            border: '2px solid rgba(17, 182, 122, 0.3)',
            animation: 'pulseRing 2s ease-in-out infinite',
            '@keyframes pulseRing': {
              '0%': {
                transform: 'scale(1)',
                opacity: 1,
              },
              '50%': {
                transform: 'scale(1.1)',
                opacity: 0.5,
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          }}
        />
      </Paper>
    </Grow>
  );
};

const MainLayout = () => {
  const dispatch = useDispatch();
  const { splashVisible } = useSelector((state) => state.app);
  const [isSimpleView, setIsSimpleView] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  const handleMoreFunctionClick = (action) => {
    console.log('More functions clicked:', action);

    // Only allow view switching when panel is not minimized
    if (action === 'switchView' && !isPanelMinimized) {
      setIsSimpleView(!isSimpleView);
    } else if (action === 'switchView' && isPanelMinimized) {
      console.log(
        'Cannot switch view while panel is minimized. Please expand the panel first.'
      );
    }
  };

  const handleLogoClick = () => {
    setIsPanelMinimized(!isPanelMinimized);
  };

  useEffect(() => {
    let timeoutId = null;

    if (splashVisible) {
      timeoutId = setTimeout(() => {
        dispatch(setSplashVisible(false));
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch, splashVisible]);

  // Track when panels have loaded once
  useEffect(() => {
    if (!splashVisible && !hasLoadedOnce) {
      const timer = setTimeout(() => {
        setHasLoadedOnce(true);
      }, 10000); // After all initial animations complete

      return () => clearTimeout(timer);
    }
  }, [splashVisible, hasLoadedOnce]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <SplashScreen />

      <Fade in={!splashVisible} timeout={800}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            visibility: splashVisible ? 'hidden' : 'visible',
          }}
        >
          {/* Toggle between views - Keep SessionContextContainer mounted but hidden */}
          <Box
            sx={{
              display: isSimpleView ? 'none' : 'block',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <SessionContextContainer skipAnimations={hasLoadedOnce} />
          </Box>

          {/* Simple View Panel - can be minimized */}
          {isSimpleView && (
            <SimpleViewPanel
              onLogoClick={handleLogoClick}
              isMinimized={isPanelMinimized}
            />
          )}

          {/* Floating Logo - shows when panel is minimized */}
          {isSimpleView && (
            <FloatingLogo onClick={handleLogoClick} show={isPanelMinimized} />
          )}

          <Box
            sx={{
              flex: 1,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <WorkingWindowArea
              isSimpleView={isSimpleView}
              isFullHeight={isPanelMinimized}
            />
          </Box>
        </Box>
      </Fade>

      <MoreFunctionButton onClick={handleMoreFunctionClick} />
    </Box>
  );
};

export default MainLayout;
