import { m } from 'framer-motion';
// @mui
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Grid, TextField, MenuItem } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// hooks
import Image from 'src/components/image';
import useResponsive from '../../hooks/useResponsive';
// components
import { MotionContainer, varFade } from '../../components/animate';
//
import {
  StyledRoot,
  StyledSection,
  StyledArrowIcon,
  StyledOverlayImage,
  StyledSectionImage,
  StyledSectionTitle,
  StyledImageContainer,
  StyledSectionContent,
  StyledNavigationItem,
  StyledFullHeightImage,
} from '../styls';

// ----------------------------------------------------------------------

export default function ServicingContent() {
  const theme = useTheme();
  const { translate } = useLocales();

  const [model, setModel] = useState('');

  const handleChangeModel = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setModel(ev.target.value);
  };

  return (
    <StyledRoot>
      <Box
        component={MotionContainer}
        sx={{ pt: { xs: 10, md: 20 }, pb: { xs: 5, md: 20 }, bgcolor: theme.palette.common.white }}
      >
        <Grid container>
          <Grid item xs={12} md={10}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>
                  SERVICES COST
                </StyledSectionTitle>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  A servicing involves many steps and requires the entire expertise of our
                  watchmakers. Its cost depends a lot on the complexity of the timepiece. Find the
                  service pricing for your watch in the drop-down menu
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  <StyledNavigationItem onClick={() => {}}>
                    <Typography
                      variant="h6"
                      className="navigation-text"
                      sx={{ fontWeight: 600 }}
                    >{`${translate('SELECT YOUR MODEL')}`}</Typography>
                    <StyledArrowIcon
                      className="navigation-arrow"
                      icon="tabler:arrow-up-right"
                      sx={{ color: 'primary.main' }}
                    />
                  </StyledNavigationItem>
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
      </Box>

      <Container
        disableGutters
        maxWidth={false}
        component={MotionContainer}
        sx={{ bgcolor: theme.palette.common.white }}
      >
        <Grid container>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2017/12/23174448/RM056-04-e1573564149552.jpg?dpr=1&width=1000"
                  alt="Richard Mille Watch Servicing"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>COMMITMENT</StyledSectionTitle>
                <StyledSectionContent sx={{ color: 'common.black', mb: { xs: 2, md: 0 } }}>
                  Your Richard Mille watch is a sophisticated and complex mechanical device,
                  designed and constructed using the most modern watchmaking techniques and
                  materials that exist. It has been assembled and optimised by master watchmakers.
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  Each piece is finished and assembled by hand, reflecting what is best in the
                  culture of &apos;Haute Horlogerie&apos;.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://bo.richardmille.com/wp-content/uploads/2025/04/rm_037_sf_44-1.jpg?dpr=1&width=1000"
                  alt="Richard Mille Watch Servicing"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>WARRANTY</StyledSectionTitle>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  A watch is a fine mechanical object and as such it need to be cared for in exactly
                  the same way as any quality machine such as a sport car. That is to say: through
                  the course of time the oil in the watch needs to be renewed and the mechanism
                  checked for wear and tear in exactly the same manner one would never drive a fine
                  car for many thousands of miles without servicing.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2019/02/23171032/warranty.jpg?dpr=1&width=1000"
                  alt="Richard Mille Watch Servicing"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>
                  WARRANTY DOCUMENTATION
                </StyledSectionTitle>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  A UNIQUE 3+2 WARRANTY SERVICE CONCEPT
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  Each Richard Mille timepiece is accompanied by a unique warranty card embedded
                  with a holographic security seal on its surface issued by our manufacture in Les
                  Breuleux, Switzerland. In addition, this document is signed and dated by the
                  official Richard Mille boutique staff at the time of purchase.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://bo.richardmille.com/wp-content/uploads/2025/04/RM-43-01-Digital-passporbigt.jpg?dpr=1&width=1000"
                  alt="Richard Mille Watch Servicing"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>
                  Digital Warranty
                </StyledSectionTitle>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  Richard Mille is introducing a new vision of watch ownership with a fully digital
                  warranty platform designed to replace traditional physical guarantees. Based on
                  the blockchain technology, this system ensures the authenticity and traceability
                  of each timepiece.
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  The RM 43-01 and RM UP-01 Ferrari are the first models to feature full digital
                  certifications, with the service set to expand to additional references in the
                  coming months.
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  Through this platform, owners can access detailed watch information and the user
                  manual, book an appointment in one of our boutiques, transfer ownership securely,
                  and report the watch as lost or stolen.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
        </Grid>
      </Container>

      <Box
        component={MotionContainer}
        sx={{ pt: { xs: 5, md: 20 }, pb: { xs: 5, md: 10 }, bgcolor: theme.palette.common.white }}
      >
        <Grid container spacing={8}>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>
                  SERVICING AND OILING
                </StyledSectionTitle>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  Oil is at the heart of every machine, and oil’s ability to lubricate is limited to
                  a specific period of time as well the amount of metallic particles it can absorb,
                  exactly as we experience in automotive engines. We advise having the watch
                  serviced regularly every 3 years, and its water resistance checked yearly if the
                  watch is subjected to immersion on a regular basis.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        <Grid item xs={12} md={12}>
          <m.div variants={varFade().inUp}>
            <StyledFullHeightImage url="https://media.richardmille.com/wp-content/uploads/2019/01/23171258/SAV4.jpg?dpr=1&width=2000" />
          </m.div>
        </Grid>
      </Grid>

      <Container
        disableGutters
        maxWidth={false}
        component={MotionContainer}
        sx={{ bgcolor: theme.palette.common.white }}
      >
        <Grid container>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2017/12/23174509/CF061007Nom-Personnalise%CC%81.jpg?dpr=1&width=1000"
                  alt="Richard Mille Watch Servicing"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>
                  MAINTENANCE PROGRAM
                </StyledSectionTitle>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  Regular maintenance is essential for keeping your Richard Mille watch in perfect
                  working order over the long term. Each phase of the maintenance schedule must be
                  completed within the timeframes and intervals indicated to ensure your watch
                  continues to deliver performance and reliability. Bear in mind that the specific
                  operations involved in maintenance may vary according to the conditions under
                  which a watch is used.
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  The intervention may involve only the case, or may also include the movement of
                  your watch. Where a complete service is called for, the steps of this process are
                  as described in the following drop-down list.
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  A distinction is to be made between the processes applicable to automatic, manual
                  winding models and those relevant for tourbillon timepieces.
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  Though the maintenance of most tourbillons and automatic tourbillons is taken care
                  of in-house, maintenance of certain tourbillons and grand complications is
                  conducted by Audemars Piguet Le Locle, in the Neuchâtel Canton of Switzerland. All
                  cases, for both automatic and tourbillon watches, are reviewed and polished at the
                  Richard Mille case factory, in Les Breuleux, Switzerland.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
        </Grid>
      </Container>

      <Box component={MotionContainer} sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 10, md: 15 } }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <StyledSection>
              <StyledSectionTitle>Select your model</StyledSectionTitle>
            </StyledSection>
            <StyledSection>
              <TextField
                variant="standard"
                select
                fullWidth
                label="Model"
                value={model}
                onChange={handleChangeModel}
              >
                {[...new Array(20)].map((_, index) => (
                  <MenuItem key={index} value={index}>
                    {`RM 00${index + 1} Tourbillon`}
                  </MenuItem>
                ))}
              </TextField>
            </StyledSection>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledSection sx={{ height: 1 }}>
              <Box
                sx={{
                  height: 1,
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: theme.spacing(5),
                    border: `solid 1px ${theme.palette.text.disabled}`,
                  }}
                >
                  <StyledNavigationItem onClick={() => {}}>
                    <Typography
                      variant="h6"
                      className="navigation-text"
                      sx={{ fontWeight: 600 }}
                    >{`${translate('SELECT YOUR MODEL')}`}</Typography>
                    <StyledArrowIcon
                      className="navigation-arrow"
                      icon="tabler:arrow-up-right"
                      sx={{ color: 'common.white' }}
                    />
                  </StyledNavigationItem>
                </Box>
              </Box>
            </StyledSection>
          </Grid>
        </Grid>
      </Box>

      <Container disableGutters maxWidth={false} component={MotionContainer}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <m.div variants={varFade().inUp}>
              <StyledOverlayImage sx={{ height: 400, overflow: 'hidden' }}>
                <Image
                  src="https://media.richardmille.com/wp-content/uploads/2019/01/23172027/iso.jpg?dpr=1&width=2000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledOverlayImage>
            </m.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <m.div variants={varFade().inUp}>
              <StyledOverlayImage
                sx={{
                  height: 400,
                  display: 'flex',
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="https://media.richardmille.com/wp-content/uploads/2019/01/23172029/footer-push-1.jpg?dpr=1&width=2000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledOverlayImage>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
