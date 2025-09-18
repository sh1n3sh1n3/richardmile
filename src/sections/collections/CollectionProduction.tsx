import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

interface CollectionProductionProps {
  productionItem: {
    title: string;
    description: string;
    imageSource: string;
  };
}

const StyledRoot = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: '100px',
  paddingBottom: '100px',
  backgroundColor: theme.palette.common.white,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    paddingTop: '60px',
    paddingBottom: '60px',
    minHeight: '80vh',
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: '40px',
    paddingBottom: '40px',
    minHeight: '70vh',
  },
}));

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '80px',
  padding: '0 10px',
  maxWidth: '1400px !important',
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
  },
}));

const StyledTextSection = styled(Box)(({ theme }) => ({
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    alignItems: 'center',
  },
}));

const StyledImageSection = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '44px',
  fontWeight: 700,
  lineHeight: 1.1,
  marginBottom: theme.spacing(3),
  color: theme.palette.common.black,
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '28px',
  },
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  lineHeight: 1.6,
  color: theme.palette.common.black,
  textAlign: 'left',
  whiteSpace: 'pre-line',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('md')]: {
    height: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '400px',
  },
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'transform 0.3s ease-in-out',
  userSelect: 'none',
  pointerEvents: 'none',
}));

// ----------------------------------------------------------------------

export default function CollectionProduction({ productionItem }: CollectionProductionProps) {
  return (
    <StyledRoot>
      <MotionContainer width={'100%'}>
        <StyledContainer>
          {/* Text Section */}
          <StyledTextSection>
            <m.div variants={varFade().inLeft}>
              <StyledTitle>{productionItem.title}</StyledTitle>
            </m.div>
            <m.div variants={varFade().inLeft}>
              <StyledDescription>{productionItem.description}</StyledDescription>
            </m.div>
          </StyledTextSection>

          {/* Image Section */}
          <StyledImageSection>
            <m.div variants={varFade().inRight}>
              <StyledImageContainer>
                <StyledImage
                  src={productionItem.imageSource}
                  alt={productionItem.title}
                  draggable={false}
                />
              </StyledImageContainer>
            </m.div>
          </StyledImageSection>
        </StyledContainer>
      </MotionContainer>
    </StyledRoot>
  );
}
