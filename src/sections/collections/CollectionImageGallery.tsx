import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

interface CollectionImageGalleryProps {
  collection: {
    topImage: string;
    buttomImage: string;
    leftImage: string;
    rightImage: string;
  };
}

const StyledRoot = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: '100px',
  paddingBottom: '100px',
  backgroundColor: '#000000',
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
  padding: '0 10px',
  maxWidth: '1400px !important',
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
  },
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '600px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    height: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '400px',
  },
}));

const StyledMainImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadius,
  transition: 'opacity 0.3s ease-in-out',
}));

const StyledStepper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  width: '100%',
  maxWidth: '800px',
  margin: `${theme.spacing(4)} auto 0`,
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'nowrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    overflowX: 'auto',
    padding: `0 ${theme.spacing(1)}`,
  },
}));

const StyledStepperLine = styled(Box)<{ isActive: boolean }>(({ theme, isActive }) => ({
  height: '1px',
  backgroundColor: '#666666',
  flex: 1,
  maxWidth: '150px',
  width: '80px',
  marginBottom: '4px',
  transition: 'background-color 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    width: '15px',
    maxWidth: '20px',
    marginBottom: '2px',
    flex: 'none',
  },
}));

const StyledStepperDot = styled(Box)<{ isActive: boolean }>(({ theme, isActive }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: isActive ? '#ffffff' : 'transparent',
  border: '2px solid #ffffff',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '8px',
    height: '8px',
    border: '1px solid #ffffff',
  },
}));

const StyledStepperLabel = styled(Typography)<{ isActive: boolean }>(({ theme, isActive }) => ({
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: isActive ? '#ffffff' : '#999999',
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  transition: 'color 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    marginBottom: theme.spacing(0.5),
  },
}));

const StyledStepperItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  minWidth: '120px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '50px',
    flex: '0 0 auto',
  },
}));

// ----------------------------------------------------------------------

export default function CollectionImageGallery({ collection }: CollectionImageGalleryProps) {
  const [activeImage, setActiveImage] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

  const imageMap = {
    top: collection.topImage,
    bottom: collection.buttomImage,
    left: collection.leftImage,
    right: collection.rightImage,
  };

  const stepperItems = [
    { key: 'top' as const, label: 'TOP VIEW', image: collection.topImage },
    { key: 'right' as const, label: 'RIGHT VIEW', image: collection.rightImage },
    { key: 'bottom' as const, label: 'BACK VIEW', image: collection.buttomImage },
    { key: 'left' as const, label: 'LEFT VIEW', image: collection.leftImage },
  ].filter((item) => item.image); // Only show items that have images

  const handleStepperClick = (position: 'top' | 'bottom' | 'left' | 'right') => {
    setActiveImage(position);
  };

  // Don't render if no images are available
  if (
    !collection.topImage &&
    !collection.buttomImage &&
    !collection.leftImage &&
    !collection.rightImage
  ) {
    return null;
  }

  return (
    <StyledRoot>
      <MotionContainer width={'100%'}>
        <StyledContainer>
          <m.div variants={varFade().inUp}>
            <StyledImageContainer>
              <StyledMainImage
                src={imageMap[activeImage]}
                alt={`Collection view - ${activeImage}`}
              />
            </StyledImageContainer>

            {/* Stepper Navigation */}
            <StyledStepper>
              {stepperItems.map((item, index) => (
                <Box key={item.key} display="flex" alignItems="flex-end">
                  <StyledStepperItem onClick={() => handleStepperClick(item.key)}>
                    <StyledStepperLabel isActive={activeImage === item.key}>
                      {item.label}
                    </StyledStepperLabel>
                    <StyledStepperDot isActive={activeImage === item.key} />
                  </StyledStepperItem>

                  {/* Line between items */}
                  {index < stepperItems.length - 1 && (
                    <StyledStepperLine
                      isActive={
                        activeImage === item.key || activeImage === stepperItems[index + 1]?.key
                      }
                    />
                  )}
                </Box>
              ))}
            </StyledStepper>
          </m.div>
        </StyledContainer>
      </MotionContainer>
    </StyledRoot>
  );
}
