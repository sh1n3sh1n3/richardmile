// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main';
// components
import { FriendsHero, FriendsContent } from 'src/sections/friends';
import ScrollProgress from '../components/scroll-progress';
import { LoadingScreen } from '../components/loading';
import { FriendsPageProvider, useFriendsPageContext } from 'src/contexts/FriendsPageContext';
// sections

// ----------------------------------------------------------------------

FriendsPage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

// Component that handles loading state
function FriendsPageContent() {
  const { loading } = useFriendsPageContext();

  // Show loading screen while fetching data
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... | Alpine Creations</title>
        </Head>
        <LoadingScreen message="Loading Friends..." showProgress={true} progress={75} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title> The starting point for your next project | Alpine Creations</title>
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

export default function FriendsPage() {
  return (
    <FriendsPageProvider>
      <FriendsPageContent />
    </FriendsPageProvider>
  );
}
