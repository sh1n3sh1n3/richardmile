// import { useState } from 'react';
import { m } from 'framer-motion';
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
import { StyledHeroContent } from '../styls';

// ----------------------------------------------------------------------

export default function FriendsHero() {
  // const theme = useTheme();
  const { translate } = useLocales();
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

  return (
    <Container maxWidth="xl" component={MotionContainer}>
      <StyledHeroContent sx={{ ...({ opacity: 0 }) }}>
        <Box sx={{ position: 'absolute', bottom: 0, left: 0 }}>
          <m.div variants={varFade().inUp}>
            <Box sx={{ maxWidth: 620 }}>
              <Typography variant="h1">{`${translate('Friends & partners')}`}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Discover the brand through its partners. Richard Mille’s friends are varied and
                contrasting. Meet them.
              </Typography>
            </Box>
          </m.div>
        </Box>
      </StyledHeroContent>
    </Container>
  );
}
