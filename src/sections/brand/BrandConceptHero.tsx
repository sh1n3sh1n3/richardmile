import { useEffect } from 'react';
import { m, useScroll } from 'framer-motion';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// hooks
// import useResponsive from '../../hooks/useResponsive';
// components
import { MotionContainer, varFade } from '../../components/animate';
//
import { StyledHero, StyledHeroVideo, StyledHeroContent, StyledVideoOverlay } from '../styls';

// ----------------------------------------------------------------------

export default function BrandConceptHero() {
  // const theme = useTheme();
  const { translate } = useLocales();
  const { scrollYProgress } = useScroll();
  // const isDesktop = useResponsive('up', 'md');

  // const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.on('change', (scrollHeight) => {
        console.log(scrollHeight);
        // if (scrollHeight > 0.02) {
        //   setHide(true);
        // } else {
        //   setHide(false);
        // }
      }),
    [scrollYProgress]
  );

  return (
    <>
      <StyledHero>
        <StyledHeroVideo autoPlay muted loop playsInline>
          <source
            src="https://media.richardmille.com/wp-content/uploads/2019/01/08123151/The-Brand_1_compressed.mp4"
            type="video/mp4"
          />
        </StyledHeroVideo>
        <StyledVideoOverlay />
      </StyledHero>

      <Container maxWidth="xl" component={MotionContainer}>
        <StyledHeroContent sx={{ ...({ opacity: 0 }) }}>
          <Box sx={{ position: 'absolute', bottom: 0, left: 0 }}>
            <m.div variants={varFade().inUp}>
              <Box sx={{ maxWidth: 520 }}>
                <Typography variant="h1">{`${translate('Concept')}`}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Diminutive marvels of technology, painstakingly produced in limited quantities,
                  Richard Mille timepieces are designed specifically for those with a true
                  appreciation of fine watchmaking.
                </Typography>
              </Box>
            </m.div>
          </Box>
        </StyledHeroContent>
      </Container>
    </>
  );
}
