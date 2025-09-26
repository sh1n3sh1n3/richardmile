import { m } from 'framer-motion';
// next
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Stack,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
// locales
// import { useLocales } from 'src/locales';
// components
import { PageHead } from '../components/head';
// hooks
// assets
import { collections } from 'src/assets/data/collections';
// config
import { HEADER, SCROLL_HEIGHT } from 'src/config-global';
// layouts
import MainLayout from 'src/layouts/main';
import useOffSetTop from '../hooks/useOffSetTop';
// components
import Filter from '../components/collections-filter';
import ScrollProgress from '../components/scroll-progress';
import { MotionContainer, varFade } from '../components/animate';

// ----------------------------------------------------------------------

// Types
interface Collection {
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
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Collection[];
  count: number;
  message?: string;
  error?: string;
}

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(25), // Increased to account for fixed hero
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.background.default,
}));

const StyledHero = styled('div')<{ isOffset: boolean }>(({ theme, isOffset }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  textAlign: 'center',
  boxShadow: theme.shadows[4],
  paddingTop: HEADER.H_DASHBOARD_DESKTOP,
  backgroundColor: 'transparent',
  [theme.breakpoints.up('md')]: {
    height: HEADER.H_DASHBOARD_DESKTOP,
    ...(isOffset && {
      paddingTop: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
    }),
  },
}));

const StyledTitle = styled(m.h2)(({ theme }) => ({
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[20],
  },
}));

const StyledImage = styled('div')<{ imageUp: string; imageDown: string }>(
  ({ theme, imageUp, imageDown }) => ({
    width: 180,
    height: 226,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      opacity: 1,
      position: 'absolute',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${imageUp})`,
      transition: 'opacity 0.3s ease-in-out',
    },
    '&::after': {
      content: '""',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
      opacity: 0,
      position: 'absolute',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${imageDown})`,
      transition: 'opacity 0.3s ease-in-out',
    },
    '&:hover::before': {
      opacity: 0,
    },
    '&:hover::after': {
      opacity: 1,
    },
  })
);

// ----------------------------------------------------------------------

CollectionsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CollectionsPage() {
  // const theme = useTheme();
  // const { translate } = useLocales();
  const router = useRouter();

  const isOffset = useOffSetTop(SCROLL_HEIGHT);

  // State for collections data
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [usingFallback, setUsingFallback] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<
    Array<{ value: string; label: string }>
  >([]);

  // Fetch available categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/collections/categories');
      const result = await response.json();

      if (result.success && result.data) {
        // Transform categories to the format expected by the Filter component
        const categories = [
          { value: 'all', label: 'All Collections' },
          ...result.data.map((category: string) => ({
            value: category,
            label: category,
          })),
        ];
        setAvailableCategories(categories);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Use default categories as fallback
      setAvailableCategories([
        { value: 'all', label: 'All Collections' },
        { value: 'Tourbillon', label: 'Tourbillon' },
        { value: 'Sapphire', label: 'Sapphire' },
        { value: 'Ultraflat', label: 'Ultraflat' },
        { value: 'Chronograph', label: 'Chronograph' },
        { value: 'Extra Flat', label: 'Extra Flat' },
        { value: 'Accessories', label: 'Accessories' },
      ]);
    }
  };

  // Fetch collections data
  const fetchCollections = async (category: string = 'all') => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (category !== 'all') {
        params.append('category', category);
      }

      const response = await fetch(`/api/collections?${params.toString()}`);
      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to fetch collections');
      }

      setCollections(result.data);
      setUsingFallback(false);
    } catch (err) {
      console.error('Error fetching collections:', err);
      console.log('Falling back to static collections data');
      setUsingFallback(true);

      // Fallback to static data
      let filteredCollections = collections;
      if (category !== 'all') {
        filteredCollections = collections.filter((item) => item.category === category);
      }

      // Transform static data to match API response format
      const transformedCollections = filteredCollections.map((item, index) => ({
        ...item,
        _id: item.id, // Use id as _id for consistency
        order: index + 1,
        featured: item.new || item.limited,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: item.id,
        seoTitle: `${item.name} - ${item.subtitle}`,
        seoDescription: item.description,
        tags: [
          item.category.toLowerCase(),
          ...(item.limited ? ['limited'] : []),
          ...(item.new ? ['new'] : []),
        ],
        specifications: {
          movement: 'Automatic',
          powerReserve: '50 hours',
          waterResistance: '50m',
          caseMaterial: 'Carbon TPT',
          strapMaterial: 'Rubber',
          buckle: 'Titanium',
        },
        availability: {
          inStock: !item.limited,
          limitedEdition: item.limited,
          quantity: item.limited ? Math.floor(Math.random() * 10) + 1 : null,
        },
      }));

      setCollections(transformedCollections);
      setError(null); // Clear error since we have fallback data
    } finally {
      setLoading(false);
    }
  };

  // Load categories and collections on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCollections(selectedCategory);
  }, [selectedCategory]);

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle collection click
  const handleCollectionClick = (collection: Collection) => {
    const slug = collection.slug || collection.id;
    router.push(`/collections/${slug}`);
  };

  return (
    <>
      <PageHead
        title="Collections"
        description="Discover our exclusive collections of premium products"
      />

      <ScrollProgress />

      <StyledRoot>
        <Container maxWidth={false} component={MotionContainer}>
          <StyledHero isOffset={isOffset}>
            <m.div variants={varFade().inUp}>
              <StyledTitle>Alpine Creations Collections</StyledTitle>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Filter
                  onCategoryChange={handleCategoryChange}
                  selectedCategory={selectedCategory}
                  categories={availableCategories}
                />
              </Box>
            </m.div>
          </StyledHero>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress size={60} />
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box sx={{ mt: 4 }}>
              <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
                {error}
              </Alert>
            </Box>
          )}

          {/* Fallback Data Notice */}
          {usingFallback && !error && (
            <Box sx={{ mt: 4 }}>
              <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
                Using cached collections data. Some features may be limited.
              </Alert>
            </Box>
          )}

          {/* Collections Grid */}
          {!loading && !error && (
            <Grid container spacing={4} sx={{ mt: { xs: 1, md: 2 } }}>
              {collections.length === 0 ? (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <Typography variant="h6" sx={{ color: 'text.disabled' }}>
                      No collections found for the selected category.
                    </Typography>
                  </Box>
                </Grid>
              ) : (
                collections.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item._id || item.id}>
                    <m.div variants={varFade().inUp}>
                      <StyledCard onClick={() => handleCollectionClick(item)}>
                        <StyledImage imageUp={item.imageUp} imageDown={item.imageDown} />

                        <Stack sx={{ textAlign: 'center' }}>
                          <Typography variant="subtitle1">{item.name}</Typography>
                          <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                            {item.subtitle}
                          </Typography>
                          {/* Show additional info if available */}
                          {item.limited && (
                            <Typography
                              variant="caption"
                              sx={{ color: 'warning.main', fontWeight: 600 }}
                            >
                              LIMITED EDITION
                            </Typography>
                          )}
                          {item.new && (
                            <Typography
                              variant="caption"
                              sx={{ color: 'success.main', fontWeight: 600 }}
                            >
                              NEW
                            </Typography>
                          )}
                        </Stack>
                      </StyledCard>
                    </m.div>
                  </Grid>
                ))
              )}
            </Grid>
          )}

          <m.div variants={varFade().inUp}>
            <Box
              maxWidth={{ xs: 1, md: 1 / 2 }}
              sx={{ textAlign: 'center', mt: 8, mb: 3, mx: 'auto' }}
            >
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                Diminutive marvels of technology, painstakingly produced in limited quantities,
                Alpine Creations timepieces are designed specifically for men and women with a true
                appreciation for the art of fine watchmaking.
              </Typography>
            </Box>
          </m.div>
        </Container>
      </StyledRoot>
    </>
  );
}
