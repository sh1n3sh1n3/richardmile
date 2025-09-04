import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Grid, Card } from '@mui/material';
// locales
// import { useLocales } from 'src/locales';
// hooks
import Image from 'src/components/image';
// import useResponsive from '../../hooks/useResponsive';
// components
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
  // const theme = useTheme();
  // const { translate } = useLocales();
  // const isDesktop = useResponsive('up', 'md');

  const sections = [
    {
      name: 'Ester Ledecká',
      image:
        'https://media.richardmille.com/wp-content/uploads/2019/02/03173603/coveester-768x492.jpg?dpr=1&width=2000',
    },
    {
      name: 'Diana Luna',
      image:
        'https://media.richardmille.com/wp-content/uploads/2017/12/23171929/DianaLuna-opti-768x512.jpg?dpr=1&width=2000',
    },
    {
      name: 'Cristie Kerr',
      image:
        'https://media.richardmille.com/wp-content/uploads/2014/12/23171117/5099094-768x512.jpg?dpr=1&width=2000',
    },
    {
      name: 'Jessica Korda',
      image:
        'https://media.richardmille.com/wp-content/uploads/2023/04/17161159/koradJ23-couv-2-deskto-768x480.jpg?dpr=1&width=2000',
    },
    {
      name: 'Pablo Mac Donough',
      image:
        'https://media.richardmille.com/wp-content/uploads/2011/12/11124659/couvBK-charles-R%C3%A9cup%C3%A9r%C3%A9-768x512.jpg?dpr=1&width=2000',
    },
    {
      name: 'Yusaku Miyazato',
      image:
        'https://media.richardmille.com/wp-content/uploads/2024/02/28153018/coveryuzu21-768x492.jpg?dpr=1&width=2000',
    }
  ]

  return (
    <StyledRoot>
      <Container maxWidth="xl" component={MotionContainer}>
        <Grid container>
          {sections.map((section, index) => (
            <Grid item xs={12} md={4} key={index}>
              <m.div variants={varFade().inUp} style={{ height: '100%' }}>
                <StyledPartnerCard index={index}>
                  <StyledScaleUpImage>
                    <Image src={section.image} alt={section.name} loading='lazy'/>
                  </StyledScaleUpImage>
                  <Typography variant="h6">{section.name}</Typography>
                </StyledPartnerCard>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledRoot>
  );
}
