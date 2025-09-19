// import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography, IconButton } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useFriendsPageContext } from 'src/contexts/FriendsPageContext';
// import useResponsive from '../../hooks/useResponsive';
// components
import { MotionContainer, varFade } from '../../components/animate';
import Iconify from 'src/components/iconify';
//
import { StyledHeroContent, StyledHeroVideo, StyledVideoOverlay } from '../styls';

// ----------------------------------------------------------------------

export default function FriendsHero() {
  // const theme = useTheme();
  const { translate } = useLocales();
  const { heroContent, error } = useFriendsPageContext();
  // const { scrollYProgress } = useScroll();
  // const isDesktop = useResponsive('up', 'md');

  // const [hide, setHide] = useState(false);

  // useEffect(
  //   () =>
  //     scrollYProgress.on('change', (scrollHeight) => {
  //       console.log(scrollHeight);
  //       if (scrollHeight > 0.02) {
  //         setHide(true);
  //       } else {
  //         setHide(false);
  //       }
  //     }),
  //   [scrollYProgress]
  // );

  // Fallback content if no hero content is available
  const fallbackContent = {
    video: 'https://video.richardmille.com/desktop/1290861657.mp4',
    title: 'Friends & partners',
    description:
      "Discover the brand through its partners. Alpine Creations's friends are varied and contrasting. Meet them.",
  };

  const FriendsHeroContent = heroContent || fallbackContent;

  const scrollToFriendsContent = () => {
    const friendsContent = document.querySelector('[data-section="friends-content"]');
    if (friendsContent) {
      friendsContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Loading state is now handled by the parent component with full-screen animation

  // Show error state with fallback content
  if (error) {
    console.warn('Failed to load hero content, using fallback:', error);
  }

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Video Background */}
      <StyledHeroVideo autoPlay muted loop playsInline preload="metadata">
        <source src={FriendsHeroContent.video} type="video/mp4" />
        Your browser does not support the video tag.
      </StyledHeroVideo>

      {/* Video Overlay for better text readability */}
      <StyledVideoOverlay />

      {/* Content */}
      <Container maxWidth="xl" component={MotionContainer}>
        <StyledHeroContent>
          <Box sx={{ position: 'absolute', bottom: 0, left: 0 }}>
            <m.div variants={varFade().inUp}>
              <Box sx={{ maxWidth: 620 }}>
                <Typography
                  variant="h1"
                  sx={{
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                  }}
                >
                  {`${translate(FriendsHeroContent.title)}`}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  {`${translate(FriendsHeroContent.description)}`}
                </Typography>

                {/* Down Arrow */}
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'start' }}>
                  <m.div
                    variants={varFade().inUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.5 }}
                  >
                    <IconButton
                      onClick={scrollToFriendsContent}
                      sx={{
                        width: 50,
                        height: 50,
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
                        style={{ width: 50, height: 50, transform: 'matrix(2, 0, 0, 2, 0, 0)' }}
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
