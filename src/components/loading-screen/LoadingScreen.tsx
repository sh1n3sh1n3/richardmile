import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
//
import Logo from '../logo';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const StyledLogoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 300,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontSize: '0.875rem',
}));

// ----------------------------------------------------------------------

interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export default function LoadingScreen({
  message = 'Loading...',
  showProgress = false,
  progress = 0,
}: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <StyledRoot>
      <StyledLogoContainer>
        {/* Outer rotating ring */}
        <Box
          component={m.div}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            ease: 'linear',
            repeat: Infinity,
          }}
          sx={{
            width: 120,
            height: 120,
            position: 'absolute',
            border: (theme) => `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: '50%',
          }}
        />

        {/* Middle pulsing ring */}
        <Box
          component={m.div}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          sx={{
            width: 80,
            height: 80,
            position: 'absolute',
            border: (theme) => `2px solid ${alpha(theme.palette.primary.main, 0.4)}`,
            borderRadius: '50%',
          }}
        />

        {/* Logo with subtle animation */}
        <m.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <Logo disabledLink sx={{ width: 48, height: 48 }} />
        </m.div>
      </StyledLogoContainer>

      {/* Loading message */}
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <StyledText variant="body2">{message}</StyledText>
      </m.div>

      {/* Progress bar */}
      {showProgress && (
        <Box
          sx={{
            width: 200,
            height: 2,
            backgroundColor: alpha('#000', 0.1),
            borderRadius: 1,
            marginTop: 3,
            overflow: 'hidden',
          }}
        >
          <m.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              height: '100%',
              backgroundColor: 'currentColor',
              color: 'primary.main',
            }}
          />
        </Box>
      )}
    </StyledRoot>
  );
}
