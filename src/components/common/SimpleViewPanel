import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Chip, Divider } from '@mui/material';
import { Phone, Person, Support, Security } from '@mui/icons-material';

const SimpleViewPanel = () => {
  const { stage, data } = useSelector((state) => state.customer);
  const { splashVisible } = useSelector((state) => state.app);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (!splashVisible) {
      const timer = setTimeout(() => {
        setShowPanel(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [splashVisible]);

  // Consolidated data from all panels
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
    status: {
      stage: stage,
      verification: 'Pending',
    },
  };

  return (
    <Paper
      sx={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
        borderRadius: 0,
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden',
        px: 6,
        transform: showPanel ? 'translateY(0)' : 'translateY(-20px)',
        opacity: showPanel ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Brand Logo - Left */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mr: 4,
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/neobank-trademark.svg`}
          alt="NeoBank"
          sx={{
            width: 32,
            height: 32,
            mr: 1.5,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          NeoBank
        </Typography>
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

      {/* Support Needs - Condensed */}
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
                '& .MuiChip-label': {
                  px: 0.5,
                },
              }}
            />
          ))}
          {consolidatedData.support.needs.length > 2 && (
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.65rem',
                color: 'text.secondary',
                alignSelf: 'center',
              }}
            >
              +{consolidatedData.support.needs.length - 2}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, borderColor: 'rgba(17, 182, 122, 0.2)' }}
      />

      {/* Status Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
        <Security sx={{ color: 'primary.main', fontSize: '1.2rem', mr: 1 }} />
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.7rem',
              color: 'text.secondary',
              display: 'block',
            }}
          >
            Reason: {consolidatedData.ivr.callReason}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={
                consolidatedData.customer.verified ? 'Verified' : 'Pending'
              }
              size="small"
              sx={{
                height: '16px',
                fontSize: '0.6rem',
                backgroundColor: consolidatedData.customer.verified
                  ? 'rgba(56, 161, 105, 0.1)'
                  : 'rgba(255, 152, 0, 0.1)',
                color: consolidatedData.customer.verified
                  ? '#38a169'
                  : '#e65100',
                '& .MuiChip-label': {
                  px: 0.5,
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Spacer to push actions to right */}
      <Box sx={{ flex: 1 }} />

      {/* Quick Actions */}
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
              '0%, 100%': {
                opacity: 1,
                transform: 'scale(1)',
              },
              '50%': {
                opacity: 0.7,
                transform: 'scale(1.2)',
              },
            },
          }}
        />
      </Box>

      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 10% 50%, rgba(17, 182, 122, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 90% 50%, rgba(17, 182, 122, 0.02) 0%, transparent 40%)
          `,
          zIndex: 1,
        }}
      />
    </Paper>
  );
};

export default SimpleViewPanel;
