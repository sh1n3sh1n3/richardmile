import { m } from 'framer-motion';
import { alpha, Box, styled, Typography } from '@mui/material';
// utils
import Iconify from 'src/components/iconify';
import { bgGradient } from '../utils/cssStyles';
// components

// ----------------------------------------------------------------------

export const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

export const StyledVideoOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.common.black, 0.3),
}));

export const StyledHero = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  position: 'fixed',
}));

export const StyledHeroVideo = styled('video')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    // Ensure video covers full height on mobile
    minHeight: '100vh',
  },
}));

export const StyledHeroImage = styled('div')<{ url: string }>(({ theme, url }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: url,
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

export const StyledHeroContent = styled('div')(({ theme }) => ({
  zIndex: 3,
  height: '100vh',
  textAlign: 'left',
  position: 'relative',
  bottom: theme.spacing(10),
  backgroundColor: 'transparent',
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    bottom: theme.spacing(20),
  },
}));

export const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(0),
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(16),
  },
}));

export const StyledSectionTitle = styled(m.h2)(({ theme }) => ({
  fontWeight: 700,
  fontSize: `${32 / 16}rem`,
  marginTop: 0,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.primary,
  [theme.breakpoints.up('md')]: {
    fontSize: `${40 / 16}rem`,
  },
}));

export const StyledSectionContent = styled(Typography)(({ theme }) => ({
  fontSize: `${16 / 16}rem`,
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
  [theme.breakpoints.up('md')]: {
    fontSize: `${18 / 16}rem`,
    marginBottom: theme.spacing(8),
  },
}));

export const StyledImageContainer = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

export const StyledSectionImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export const StyledFullHeightImage = styled(Box)<{ url: string }>(({ theme, url }) => ({
  width: '100%',
  height: '100vh',
  backgroundSize: 'cover',
  backgroundImage: `url(${url})`,
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  [theme.breakpoints.up('md')]: {
    height: '100vh',
  },
}));

export const StyledFullHeightVideo = styled('video')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  margin: theme.spacing(8, 0),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: alpha(theme.palette.common.black, 0.3),
  },
  [theme.breakpoints.up('md')]: {
    height: '100vh',
  },
}));

export const StyledNavigationItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  position: 'relative',
  gap: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    '& .navigation-text': {
      order: 2,
    },
    '& .navigation-arrow': {
      order: 1,
    },
  },
}));

export const StyledArrowIcon = styled(Iconify)(({ theme }) => ({
  order: 2,
  width: 24,
  height: 24,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease-in-out',
  [theme.breakpoints.up('md')]: {
    width: 32,
    height: 32,
  },
}));

export const StyledScaleUpImage = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  transition: 'all 0.6s ease-in-out',
  overflow: 'hidden',
  position: 'relative',
  '& .wrapper': {
    transition: 'all 0.6s ease-in-out !important',
    '& img': {
      transition: 'all 0.6s ease-in-out !important',
      filter: 'brightness(0.8)',
    },
  },
  '&:hover': {
    '& .wrapper': {
      transform: 'scale(1.1)',
      '& img': {
        filter: 'brightness(0.4)',
      },
    },
  },
}));

export const StyledOverlayImage = styled(Box)(({ theme }) => ({
  opacity: 1,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  transition: 'all 0.9s ease-in-out',
  position: 'relative',
  '& .wrapper': {
    transition: 'all 0.9s ease-in-out !important',
    '& img': {
      transition: 'all 0.9s ease-in-out !important',
      filter: 'brightness(0.8)',
    },
  },
  '&:hover': {
    opacity: 0,
    '& .wrapper': {
      transform: 'scale(1.1)',
      '& img': {
        filter: 'brightness(0.4)',
      },
    },
  },
}));
