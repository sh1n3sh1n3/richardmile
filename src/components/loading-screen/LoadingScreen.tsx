import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(() => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999999,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000000',
}));

const StyledTitle = styled(Typography)(() => ({
  color: '#ffffff',
  fontWeight: 400,
  fontSize: '18px',
  letterSpacing: '0.05em',
  textAlign: 'center',
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
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledTitle>ALPINE CREATIONS</StyledTitle>
      </m.div>
    </StyledRoot>
  );
}
