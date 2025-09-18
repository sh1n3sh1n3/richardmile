import { useState, useRef } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// components
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

interface CollectionIntroductionProps {
  collection?: {
    name: string;
    subtitle: string;
    description: string;
    imageUp: string;
    imageDown: string;
    introduction?: {
      title: string;
      description: string;
      images1: string;
      images2: string;
      images3: string;
      background: string;
      backgroundIsVideo: boolean;
    };
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
  maxWidth: '1400px !important',
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

const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '600px',
  display: 'flex',
  gap: theme.spacing(2),
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
  [theme.breakpoints.down('md')]: {
    height: '500px',
    flexDirection: 'row',
    overflowX: 'auto',
    gap: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    height: '400px',
    gap: theme.spacing(0.5),
  },
}));

const StyledImageWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  height: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    flex: '0 0 auto',
    minWidth: '300px',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '250px',
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

export default function CollectionIntroduction({ collection }: CollectionIntroductionProps) {
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create image array from introduction data
  const images = collection?.introduction
    ? [
        collection.introduction.images1,
        collection.introduction.images2,
        collection.introduction.images3,
      ].filter((img) => img && img.trim() !== '')
    : collection
    ? [collection.imageUp, collection.imageDown]
    : [
        'https://media.richardmille.com/wp-content/uploads/2022/09/21141757/RM-88view.png?dpr=1&width=187.5',
        'https://media.richardmille.com/wp-content/uploads/2023/02/10203219/RM88_back.png?dpr=1&width=250',
      ];

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
    const threshold = 50; // Minimum drag distance to trigger image change

    if (Math.abs(deltaX) > threshold) {
      // Swap images based on drag direction
      const newImages = [...images].reverse();
      // In a real implementation, you might want to update the collection data
      // For now, we'll just log the action
      console.log('Images swapped via drag');
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
      console.log('Images swapped via touch drag');
    }

    setDragStart(null);
    setIsDragging(false);
  };

  // Use introduction data if available, otherwise fallback to collection data
  const title = collection?.introduction?.title || collection?.name || 'BALANCING ACT';
  const description =
    collection?.introduction?.description ||
    collection?.description ||
    'The RM 75-01 symbolizes the balance between technical mastery and bold aesthetics: a movement that brings together a flying tourbillon and a flying barrel. These two suspended elements offer an airy architecture, specially designed to integrate into a sapphire case.';

  return (
    <StyledRoot data-section="collection-content">
      <Container maxWidth="xl" component={MotionContainer}>
        <StyledContainer>
          {/* Text Section */}
          <StyledTextSection>
            <m.div variants={varFade().inLeft}>
              <StyledTitle>{title}</StyledTitle>
            </m.div>
            <m.div variants={varFade().inLeft}>
              <StyledDescription>{description}</StyledDescription>
            </m.div>
          </StyledTextSection>

          {/* Image Section */}
          <StyledImageSection>
            <m.div variants={varFade().inRight}>
              <StyledImageContainer
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setDragStart(null)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {images.map((image, index) => (
                  <StyledImageWrapper key={index}>
                    <StyledImage
                      src={image}
                      alt={`${title} - Image ${index + 1}`}
                      draggable={false}
                    />
                  </StyledImageWrapper>
                ))}
              </StyledImageContainer>
            </m.div>
          </StyledImageSection>
        </StyledContainer>
      </Container>
    </StyledRoot>
  );
}
