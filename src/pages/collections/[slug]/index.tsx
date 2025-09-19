import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Alert, Button } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main';
// components
import LoadingScreen from 'src/components/loading-screen';
import { useLoading } from 'src/contexts/LoadingContext';
// sections
import {
  CollectionHero,
  CollectionIntroduction,
  CollectionBackground,
  CollectionProduction,
  CollectionFeatures,
  CollectionImageGallery,
} from 'src/sections/collections';

// ----------------------------------------------------------------------

// Types
interface Collection {
  buttomImage: any;
  leftImage: any;
  rightImage: any;
  topImage: any;
  _id: string;
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: string;
  imageUp: string;
  imageDown: string;
  description: string;
  limited: boolean;
  new: boolean;
  featured?: boolean;
  published?: boolean;
  order?: number;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  specifications?: {
    movement: string;
    powerReserve: string;
    waterResistance: string;
    caseMaterial: string;
    strapMaterial: string;
    buckle: string;
  };
  availability?: {
    inStock: boolean;
    limitedEdition: boolean;
    quantity: number | null;
  };
  introduction?: {
    title: string;
    description: string;
    images1: string;
    images2: string;
    images3: string;
    background: string;
    backgroundIsVideo: boolean;
  };
  production?: Array<{
    title: string;
    description: string;
    imageSource: string;
  }>;
  features?: Array<{
    title: string;
    data: Array<{
      title: string;
      description: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Collection;
  message?: string;
  error?: string;
}

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '1200px !important',
}));

// ----------------------------------------------------------------------

CollectionSlugPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CollectionSlugPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { setLoading: setGlobalLoading, setLoadingMessage, setProgress } = useLoading();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch collection data
  const fetchCollection = async (collectionSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      setGlobalLoading(true, 'Loading Collection...', 'page');
      setLoadingMessage('Fetching collection details...');
      setProgress(20);

      const response = await fetch(`/api/collections/${collectionSlug}`);
      setProgress(60);

      const result: ApiResponse = await response.json();
      setProgress(80);

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to fetch collection');
      }

      setCollection(result.data);
      setLoadingMessage('Collection loaded successfully');
      setProgress(100);
    } catch (err) {
      console.error('Error fetching collection:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch collection');
      setLoadingMessage('Error loading collection');
    } finally {
      setTimeout(() => {
        setLoading(false);
        setGlobalLoading(false);
      }, 1000); // Show loading for at least 1 second for better UX
    }
  };

  // Fetch collection when slug is available
  useEffect(() => {
    if (slug && typeof slug === 'string') {
      fetchCollection(slug);
    }
  }, [slug]);

  // Handle back to collections
  const handleBackToCollections = () => {
    router.push('/collections');
  };

  console.log(collection);

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Collection... | Alpine Creations</title>
        </Head>
        <LoadingScreen message="Loading Collection..." showProgress={true} progress={100} />
      </>
    );
  }

  if (error) {
    return (
      <StyledRoot>
        <StyledContainer maxWidth="md">
          <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={handleBackToCollections} sx={{ mt: 2 }}>
            Back to Collections
          </Button>
        </StyledContainer>
      </StyledRoot>
    );
  }

  if (!collection) {
    return (
      <StyledRoot>
        <StyledContainer maxWidth="md">
          <Alert severity="warning" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            Collection not found
          </Alert>
          <Button variant="contained" onClick={handleBackToCollections} sx={{ mt: 2 }}>
            Back to Collections
          </Button>
        </StyledContainer>
      </StyledRoot>
    );
  }

  return (
    <>
      <Head>
        <title>
          {collection.seoTitle || `${collection.name} - ${collection.subtitle}`} | Alpine Creations
        </title>
        <meta name="description" content={collection.seoDescription || collection.description} />
      </Head>

      <CollectionHero collection={collection} />

      <CollectionIntroduction collection={collection} />

      <CollectionBackground collection={collection} />

      {/* Production Sections */}
      {collection.production?.map((productionItem, index) => {
        // If item has title and description, render CollectionProduction
        if (productionItem.title && productionItem.description) {
          return <CollectionProduction key={index} productionItem={productionItem} />;
        }

        // If item has only imageSource (no title/description), render CollectionBackground
        if (productionItem.imageSource) {
          return (
            <CollectionBackground
              key={index}
              collection={{
                introduction: {
                  background: productionItem.imageSource,
                  backgroundIsVideo: false,
                },
              }}
            />
          );
        }

        // Skip rendering if no valid data
        return null;
      })}

      {/* Image Gallery Section */}
      {(collection.topImage ||
        collection.buttomImage ||
        collection.leftImage ||
        collection.rightImage) && <CollectionImageGallery collection={collection} />}

      {/* Features Section */}
      {collection.features && collection.features.length > 0 && (
        <CollectionFeatures features={collection.features} />
      )}
    </>
  );
}
