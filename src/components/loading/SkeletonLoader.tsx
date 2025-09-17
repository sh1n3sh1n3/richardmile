import React from 'react';
import { Box, Skeleton, alpha, styled } from '@mui/material';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[500], 0.1),
  '&::after': {
    background: `linear-gradient(90deg, transparent, ${alpha(
      theme.palette.primary.main,
      0.1
    )}, transparent)`,
  },
}));

interface SkeletonLoaderProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | 'false';
  count?: number;
  spacing?: number;
  className?: string;
}

export default function SkeletonLoader({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  animation = 'wave',
  count = 1,
  spacing = 1,
  className,
}: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <m.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <StyledSkeleton
        variant={variant}
        width={width}
        height={height}
        animation={animation}
        className={className}
      />
    </m.div>
  ));

  if (count === 1) {
    return skeletons[0];
  }

  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}>{skeletons}</Box>;
}

// Predefined skeleton layouts for common use cases
export function CardSkeleton() {
  return (
    <Box sx={{ p: 2 }}>
      <SkeletonLoader variant="rectangular" height={200} sx={{ mb: 2 }} />
      <SkeletonLoader variant="text" width="80%" height={24} sx={{ mb: 1 }} />
      <SkeletonLoader variant="text" width="60%" height={20} sx={{ mb: 1 }} />
      <SkeletonLoader variant="text" width="40%" height={16} />
    </Box>
  );
}

export function VideoSkeleton() {
  return (
    <Box sx={{ position: 'relative', aspectRatio: '16/9' }}>
      <SkeletonLoader variant="rectangular" height="100%" />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SkeletonLoader variant="circular" width={60} height={60} />
      </Box>
    </Box>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <Box>
      <SkeletonLoader count={lines} spacing={1} />
    </Box>
  );
}
