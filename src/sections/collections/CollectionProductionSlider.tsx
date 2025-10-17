import { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import Iconify from '../../components/iconify';
// components
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

interface CollectionProductionSliderProps {
  productionData: {
    title: string;
    images: string[];
  };
}

const StyledRoot = styled('div')(({ theme }) => ({
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
  gap: '80px',
  padding: '0 10px',
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
  fontSize: '22px',
  lineHeight: 1.6,
  color: theme.palette.common.black,
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}));

const StyledSliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '600px',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('md')]: {
    height: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '400px',
  },
}));

const StyledSliderTrack = styled(Box)<{ translateX: number }>(({ translateX }) => ({
  display: 'flex',
  height: '100%',
  transform: `translateX(${translateX}%)`,
  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const StyledSlide = styled(Box)<{ isActive: boolean; isSide: boolean }>(
  ({ theme, isActive, isSide }) => ({
    flex: isActive ? '0 0 50%' : '0 0 25%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 1,
    transform: isActive ? 'scale(1)' : 'scale(0.95)',
    zIndex: isActive ? 3 : isSide ? 2 : 1,
    [theme.breakpoints.down('md')]: {
      flex: isActive ? '0 0 60%' : '0 0 20%',
    },
    [theme.breakpoints.down('sm')]: {
      flex: isActive ? '0 0 70%' : '0 0 15%',
    },
  })
);

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'transform 0.3s ease-in-out',
  userSelect: 'none',
  pointerEvents: 'none',
}));

const StyledNavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: theme.palette.common.white,
  width: '48px',
  height: '48px',
  zIndex: 10,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '40px',
    height: '40px',
  },
}));

const StyledLeftButton = styled(StyledNavigationButton)(({ theme }) => ({
  left: theme.spacing(2),
}));

const StyledRightButton = styled(StyledNavigationButton)(({ theme }) => ({
  right: theme.spacing(2),
}));

const StyledDotsContainer = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
}));

const StyledDot = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.common.white : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    transform: 'scale(1.2)',
  },
}));

// ----------------------------------------------------------------------

export default function CollectionProductionSlider({
  productionData,
}: CollectionProductionSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use production images
  const images = productionData.images || [];

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  // Create extended array for infinite loop effect
  const getVisibleSlides = () => {
    if (images.length <= 1) return images;

    const prevIndex = (currentSlide - 1 + images.length) % images.length;
    const nextIndex = (currentSlide + 1) % images.length;

    return [images[prevIndex], images[currentSlide], images[nextIndex]];
  };

  const visibleSlides = getVisibleSlides();

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart) return;

    const deltaX = Math.abs(e.clientX - dragStart.x);
    const deltaY = Math.abs(e.clientY - dragStart.y);

    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!dragStart || !isDragging) {
      setDragStart(null);
      return;
    }

    const deltaX = e.clientX - dragStart.x;
    const threshold = 50; // Minimum drag distance to trigger slide change

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setDragStart(null);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragStart) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - dragStart.x);
    const deltaY = Math.abs(touch.clientY - dragStart.y);

    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!dragStart || !isDragging) {
      setDragStart(null);
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - dragStart.x;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setDragStart(null);
    setIsDragging(false);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <StyledRoot data-section="collection-production">
      <Container maxWidth={false} component={MotionContainer}>
        <StyledContainer>
          {/* Text Section */}
          <StyledTextSection>
            <m.div variants={varFade().inLeft}>
              <StyledTitle>{productionData.title}</StyledTitle>
            </m.div>
          </StyledTextSection>

          {/* Image Section */}
          <StyledImageSection>
            <m.div variants={varFade().inRight}>
              <StyledSliderContainer
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => {
                  setDragStart(null);
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <StyledSliderTrack translateX={0}>
                  {visibleSlides.map((image, index) => {
                    const isActive = index === 1; // Center slide is always active
                    const isSide = index === 0 || index === 2; // Side slides

                    return (
                      <StyledSlide
                        key={`${currentSlide}-${index}`}
                        isActive={isActive}
                        isSide={isSide}
                      >
                        <StyledImage
                          src={image}
                          alt={`${productionData.title} - Image ${currentSlide + 1}`}
                          draggable={false}
                        />
                      </StyledSlide>
                    );
                  })}
                </StyledSliderTrack>

                {/* Navigation Controls */}
                {images.length > 1 && (
                  <>
                    <StyledLeftButton onClick={goToPrevious}>
                      <Iconify icon="eva:arrow-left-fill" />
                    </StyledLeftButton>

                    <StyledRightButton onClick={goToNext}>
                      <Iconify icon="eva:arrow-right-fill" />
                    </StyledRightButton>

                    <StyledDotsContainer direction="row" spacing={1}>
                      {images.map((_, index) => (
                        <StyledDot
                          key={index}
                          active={index === currentSlide}
                          onClick={() => goToSlide(index)}
                        />
                      ))}
                    </StyledDotsContainer>
                  </>
                )}
              </StyledSliderContainer>
            </m.div>
          </StyledImageSection>
        </StyledContainer>
      </Container>
    </StyledRoot>
  );
}
