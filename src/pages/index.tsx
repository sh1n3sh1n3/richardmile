import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main';
// components
import ScrollProgress from '../components/scroll-progress';
import { LoadingScreen, RichardMilleSpinner } from '../components/loading';
import { PageHead } from '../components/head';
import { useLoading } from '../contexts/LoadingContext';
// sections
import { HomeHero } from '../sections/home';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

interface Section {
  _id: string;
  hasVideo: boolean;
  label: string;
  title: string;
  description: string;
  src: string;
  router?: string;
}

export default function HomePage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const { setLoading: setGlobalLoading, setLoadingMessage } = useLoading();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        setGlobalLoading(true, 'Loading Alpine Creations...', 'page');
        setLoadingMessage('Fetching latest collections...');

        const response = await fetch('/api/sections/index');
        if (response.ok) {
          const data = await response.json();
          setSections(data);
          setLoadingMessage('Experience loaded successfully');
        } else {
          console.error('Failed to fetch sections:', response.status);
          setLoadingMessage('Using default content');
        }
      } catch (error) {
        console.error('Failed to fetch sections:', error);
        setLoadingMessage('Connection error - using offline content');
      } finally {
        setTimeout(() => {
          setLoading(false);
          setGlobalLoading(false);
        }, 1000); // Show loading for at least 1 second for better UX
      }
    };

    fetchSections();
  }, [setGlobalLoading, setLoadingMessage]);

  // Show loading screen while fetching data
  if (loading) {
    return (
      <>
        <PageHead title="Loading..." />
        <LoadingScreen message="Loading..." showProgress={true} progress={100} />
      </>
    );
  }

  return (
    <>
      <PageHead
        title="The starting point for your next project"
        description="Discover our premium collection and experience luxury at its finest"
      />

      <ScrollProgress />

      <HomeHero sections={sections} loading={loading} />

      <Box
        sx={{
          overflow: 'visible',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      />
    </>
  );
}
