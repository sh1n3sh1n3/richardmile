import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography, IconButton } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// components
import { MotionContainer, varFade } from '../../components/animate';
//
import { StyledHeroContent, StyledHeroVideo, StyledVideoOverlay } from '../styls';

// ----------------------------------------------------------------------

interface CollectionHeroProps {
  collection?: {
    name: string;
    subtitle: string;
    description: string;
    imageUp: string;
    imageDown: string;
  };
}

export default function CollectionHero({ collection }: CollectionHeroProps) {
  const { translate } = useLocales();

  // Fallback content if no collection is available
  const fallbackContent = {
    video: 'https://video.richardmille.com/desktop/1290861657.mp4',
    title: 'Collection Details',
    description: 'Discover the intricate details and craftsmanship of this exceptional timepiece.',
  };

  const heroContent = collection
    ? {
        video: 'https://video.richardmille.com/desktop/1290861657.mp4', // Default video, can be customized per collection
        title: collection.name,
        description: collection.description || collection.subtitle,
      }
    : fallbackContent;

  const scrollToCollectionContent = () => {
    const collectionContent = document.querySelector('[data-section="collection-content"]');
    if (collectionContent) {
      collectionContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Video Background */}
      <StyledHeroVideo autoPlay muted loop playsInline preload="metadata">
        <source src={heroContent.video} type="video/mp4" />
        Your browser does not support the video tag.
      </StyledHeroVideo>

      {/* Video Overlay for better text readability */}
      <StyledVideoOverlay />

      {/* Content */}
      <Container maxWidth="xl" component={MotionContainer}>
        <StyledHeroContent>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              padding: { xs: '0 20px', sm: '0 40px', md: '0' },
              width: { xs: '100%', md: 'auto' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <m.div variants={varFade().inUp}>
              <Box
                sx={{
                  maxWidth: { xs: '100%', md: 620 },
                  padding: { xs: '0 20px', md: '0' },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    whiteSpace: { xs: 'normal', md: 'nowrap' },
                    maxWidth: '100%',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                    lineHeight: { xs: 1.2, md: 1.1 },
                    wordBreak: { xs: 'break-word', md: 'normal' },
                  }}
                >
                  {heroContent.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 2,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    lineHeight: { xs: 1.4, md: 1.6 },
                    maxWidth: { xs: '100%', md: '500px' },
                    mx: { xs: 'auto', md: '0' },
                  }}
                >
                  {heroContent.description}
                </Typography>

                {/* Down Arrow */}
                <Box
                  sx={{
                    mt: { xs: 3, md: 4 },
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'start' },
                  }}
                >
                  <m.div
                    variants={varFade().inUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.5 }}
                  >
                    <IconButton
                      onClick={scrollToCollectionContent}
                      sx={{
                        width: { xs: 40, md: 50 },
                        height: { xs: 40, md: 50 },
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 60 60"
                        xmlSpace="preserve"
                        style={{
                          width: '100%',
                          height: '100%',
                          transform: 'matrix(2, 0, 0, 2, 0, 0)',
                        }}
                      >
                        <polyline
                          points="35.7,29 30,34.7 24.3,29"
                          style={{
                            fill: 'none',
                            stroke: 'rgb(255, 255, 255)',
                            strokeWidth: 1.5,
                          }}
                        />
                      </svg>
                    </IconButton>
                  </m.div>
                </Box>
              </Box>
            </m.div>
          </Box>
        </StyledHeroContent>
      </Container>
    </Box>
  );
}
