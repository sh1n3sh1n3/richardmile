import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// @mui
import { Box } from '@mui/material';
//
import Nav from './nav/Nav';
import Header from './Header';
import Footer from './Footer';
import { GlobalMetadata } from '../../components/head';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (open && !target.closest('[data-nav-drawer]') && !target.closest('[data-nav-toggle]')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Add/remove scrollbar hiding class based on current page
  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add('home-page-scrollbar-hidden');
    } else {
      document.body.classList.remove('home-page-scrollbar-hidden');
    }

    return () => {
      document.body.classList.remove('home-page-scrollbar-hidden');
    };
  }, [isHomePage]);

  return (
    <Box>
      <GlobalMetadata />
      <Header openNav={open} setOpenNav={setOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Nav openNav={open} setOpenNav={setOpen} />

        {children}
      </Box>

      <Footer />
    </Box>
  );
}
