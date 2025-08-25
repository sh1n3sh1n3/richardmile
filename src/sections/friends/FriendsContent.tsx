import { m } from 'framer-motion';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Container, Typography, Grid, Card } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Image from 'src/components/image';
import { MotionContainer, varFade } from '../../components/animate';
//
import { StyledScaleUpImage, StyledRoot } from '../styls';

// ----------------------------------------------------------------------

const StyledPartnerCard = styled(Card)<{ index: number }>(({ theme, index }) => ({
  height: '100%',
  cursor: 'pointer',
  background: 'transparent',
  [theme.breakpoints.up('md')]: {
    paddingTop: index % 3 === 1 ? 0 : theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function FriendsContent() {
  const theme = useTheme();
  const { translate } = useLocales();
  const isDesktop = useResponsive('up', 'md');

  const partner = {
    name: 'ALAIN PROST',
    image:
      'https://media.richardmille.com/wp-content/uploads/2019/01/23171147/LMA2498-768x432.jpg?dpr=1&width=2000',
  };

  return (
    <StyledRoot>
      <Container maxWidth="xl" component={MotionContainer}>
        <Grid container>
          {[...new Array(30)].map((_, index) => (
            <Grid item xs={12} md={4} key={index}>
              <m.div variants={varFade().inUp} style={{ height: '100%' }}>
                <StyledPartnerCard index={index}>
                  <StyledScaleUpImage>
                    <Image src={partner.image} alt={partner.name} />
                  </StyledScaleUpImage>
                  <Typography variant="h6">{partner.name}</Typography>
                </StyledPartnerCard>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledRoot>
  );
}
