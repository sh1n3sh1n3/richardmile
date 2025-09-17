import React from 'react';
import { Box, CircularProgress, Typography, alpha, styled } from '@mui/material';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
}));

const StyledSpinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
}));

const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  textAlign: 'center',
}));

interface RichardMilleSpinnerProps {
  size?: number;
  message?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: 'circular' | 'dots' | 'pulse';
}

export default function RichardMilleSpinner({
  size = 40,
  message,
  showProgress = false,
  progress = 0,
  variant = 'circular',
}: RichardMilleSpinnerProps) {
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[0, 1, 2].map((index) => (
              <m.div
                key={index}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                  }}
                />
              </m.div>
            ))}
          </Box>
        );

      case 'pulse':
        return (
          <m.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Box
              sx={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: alpha('#000', 0.1),
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            />
          </m.div>
        );

      default:
        return <StyledSpinner size={size} />;
    }
  };

  return (
    <StyledContainer>
      {renderSpinner()}

      {message && <StyledText variant="body2">{message}</StyledText>}

      {showProgress && (
        <Box sx={{ width: '100%', maxWidth: 200 }}>
          <Box
            sx={{
              width: '100%',
              height: 4,
              backgroundColor: alpha('#000', 0.1),
              borderRadius: 2,
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
          <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
      )}
    </StyledContainer>
  );
}
