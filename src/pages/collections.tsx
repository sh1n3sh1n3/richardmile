import { m } from 'framer-motion';
// next
import Head from 'next/head';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Card, Stack, Container, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// hooks
// assets
import { collections } from 'src/assets/data';
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
  const theme = useTheme();

  const { translate } = useLocales();

  const isOffset = useOffSetTop(SCROLL_HEIGHT);

  return (
    <>
      <Head>
        <title>Collections | Richard Mille</title>
      </Head>

      <ScrollProgress />

      <StyledRoot>
        <Container maxWidth={false} component={MotionContainer}>
          <StyledHero isOffset={isOffset}>
            <m.div variants={varFade().inUp}>
              <StyledTitle>Richard Mille Watches</StyledTitle>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Filter />
              </Box>
            </m.div>
          </StyledHero>

          <Grid container spacing={4} sx={{ mt: { xs: 1, md: 2 } }}>
            {collections.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <m.div variants={varFade().inUp}>
                  <StyledCard>
                    <StyledImage imageUp={item.imageUp} imageDown={item.imageDown} />

                    <Stack sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                        {item.subtitle}
                      </Typography>
                    </Stack>
                  </StyledCard>
                </m.div>
              </Grid>
            ))}
          </Grid>

          <m.div variants={varFade().inUp}>
            <Box
              maxWidth={{ xs: 1, md: 1 / 2 }}
              sx={{ textAlign: 'center', mt: 8, mb: 3, mx: 'auto' }}
            >
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                Diminutive marvels of technology, painstakingly produced in limited quantities,
                Richard Mille timepieces are designed specifically for men and women with a true
                appreciation for the art of fine watchmaking.
              </Typography>
            </Box>
          </m.div>
        </Container>
      </StyledRoot>
    </>
  );
}
