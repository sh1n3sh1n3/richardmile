import { ReactNode } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function CompactLayout({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      {children}
    </Box>
  );
}
