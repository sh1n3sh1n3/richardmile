
import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

interface CMSLayoutProps {
  children: ReactNode;
}

export default function CMSLayout({ children }: CMSLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Richard Mille CMS
          </Typography>
        </Toolbar>
      </AppBar> */}
      
      <Container maxWidth="xl" sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}
