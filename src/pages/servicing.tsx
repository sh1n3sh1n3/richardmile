// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// components
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ServicingContent, ServicingHero } from 'src/sections/servicing';
import ScrollProgress from '../components/scroll-progress';

// ----------------------------------------------------------------------

ServicingConceptPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicingConceptPage() {
  return (
    <>
      <Head>
        <title>The Servicing | Richard Mille</title>
      </Head>

      <ScrollProgress />

      <ServicingHero />

      <Box
        sx={{
          overflow: 'visible',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <ServicingContent />
      </Box>
    </>
  );
}
