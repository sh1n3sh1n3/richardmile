// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from '../../components/iconify';
import { MotionContainer } from '../../components/animate';
import { PATH_PAGE } from 'src/routes/paths';
import {
  StyledHero,
  StyledHeroVideo,
  StyledHeroContent,
  StyledVideoOverlay,
  StyledNavigationItem,
  StyledArrowIcon,
} from '../styls';

// ----------------------------------------------------------------------

export default function BrandHero() {
  const { translate } = useLocales();

  const { push } = useRouter();

  const handleNavigationClick = (section: string) => {
    push(PATH_PAGE.brand[section as keyof typeof PATH_PAGE.brand]);
  };

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
        <StyledHeroContent>
          <Box sx={{ position: 'absolute', bottom: 0, left: 0 }}>
            <Stack
              spacing={{ xs: 5, md: 20 }}
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Box sx={{ maxWidth: 460 }}>
                <Typography variant="h1">{`${translate('The Brand')}`}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  The first watch to carry Richard Mille's name, the RM 001 Tourbillon, launched the
                  millennium and marked the beginning of a new era in watchmaking.
                </Typography>
              </Box>

              <Stack spacing={1}>
                <StyledNavigationItem onClick={() => handleNavigationClick('history')}>
                  <Typography
                    variant="h6"
                    className="navigation-text"
                    sx={{ fontWeight: 600 }}
                  >{`${translate('HISTORY')}`}</Typography>
                  <StyledArrowIcon className="navigation-arrow" icon="tabler:arrow-up-right" />
                </StyledNavigationItem>

                <StyledNavigationItem onClick={() => handleNavigationClick('concept')}>
                  <Typography
                    variant="h6"
                    className="navigation-text"
                    sx={{ fontWeight: 600 }}
                  >{`${translate('CONCEPT')}`}</Typography>
                  <StyledArrowIcon className="navigation-arrow" icon="tabler:arrow-up-right" />
                </StyledNavigationItem>
              </Stack>
            </Stack>
          </Box>
        </StyledHeroContent>
      </Container>
    </>
  );
}
