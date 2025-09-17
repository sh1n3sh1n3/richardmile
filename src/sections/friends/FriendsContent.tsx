import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Grid, Card, Box } from '@mui/material';
// locales
// import { useLocales } from 'src/locales';
// hooks
import Image from 'src/components/image';
import { useFriendsPageContext } from 'src/contexts/FriendsPageContext';
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

  const { friends, error } = useFriendsPageContext();

  // Display only friends from backend
  const sections = friends.filter((friend) => friend.isActive);

  // Loading state is now handled by the parent component with full-screen animation

  if (error) {
    return (
      <StyledRoot data-section="friends-content">
        <Container maxWidth="xl" component={MotionContainer}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <Typography variant="h6" color="error" align="center">
              Failed to load friends: {error}
            </Typography>
          </Box>
        </Container>
      </StyledRoot>
    );
  }

  if (sections.length === 0) {
    return (
      <StyledRoot data-section="friends-content">
        <Container maxWidth="xl" component={MotionContainer}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <Typography variant="h6" color="text.secondary" align="center">
              No friends found. Please add some friends through the admin panel.
            </Typography>
          </Box>
        </Container>
      </StyledRoot>
    );
  }

  return (
    <StyledRoot data-section="friends-content">
      <Container maxWidth="xl" component={MotionContainer}>
        <Grid container>
          {sections.map((section, index) => (
            <Grid item xs={12} md={4} key={section._id || index}>
              <m.div variants={varFade().inUp} style={{ height: '100%' }}>
                <StyledPartnerCard index={index}>
                  <StyledScaleUpImage>
                    <Image src={section.image} alt={section.name} loading="lazy" />
                  </StyledScaleUpImage>
                  <Typography variant="h6">{section.name}</Typography>
                  {section.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {section.description}
                    </Typography>
                  )}
                  {section.profession && (
                    <Typography variant="caption" color="text.secondary">
                      {section.profession}
                    </Typography>
                  )}
                </StyledPartnerCard>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledRoot>
  );
}
