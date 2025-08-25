// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main';
// components
import { FriendsHero, FriendsContent } from 'src/sections/friends';
import ScrollProgress from '../components/scroll-progress';
// sections

// ----------------------------------------------------------------------

FriendsPage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function FriendsPage() {
  return (
    <>
      <Head>
        <title> The starting point for your next project | Rechard Mille</title>
      </Head>

      <ScrollProgress />

      <FriendsHero />

      <Box
        sx={{
          overflow: 'visible',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <FriendsContent />
      </Box>
    </>
  );
}
