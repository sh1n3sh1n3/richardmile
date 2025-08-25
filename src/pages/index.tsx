// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main';
// components
import ScrollProgress from '../components/scroll-progress';
// sections
import { HomeHero } from '../sections/home';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title> The starting point for your next project | Rechard Mille</title>
      </Head>

      <ScrollProgress />

      <HomeHero />

      <Box
        sx={{
          overflow: 'visible',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      ></Box>
    </>
  );
}
