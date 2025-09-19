import { m } from 'framer-motion';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// hooks
import Image from 'src/components/image';
// import useResponsive from '../../hooks/useResponsive';
// components
import { MotionContainer, varFade } from '../../components/animate';
//
import {
  StyledRoot,
  StyledSection,
  StyledHeroVideo,
  StyledSectionImage,
  StyledSectionTitle,
  StyledImageContainer,
  StyledSectionContent,
  StyledFullHeightImage,
  StyledOverlayImage,
} from '../styls';

// ----------------------------------------------------------------------

const StyledQuoteAuthor = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: 1,
  fontSize: `${16 / 16}rem`,
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

export default function BrandConceptContent() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <StyledRoot>
      <Container disableGutters maxWidth={false} component={MotionContainer}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle>{`${translate(
                  'A NEW ERA IN WATCHMAKING'
                )}`}</StyledSectionTitle>
                <StyledSectionContent>
                  The RM 001 Tourbillon, the first watch ever to bear the Alpine Creations name,
                  literally and figuratively launched the millennium: the year was 2001, and the
                  model marked the beginning of a new era in watchmaking. Today, the
                  collection&apos;s more than eighty models point resolutely towards the future,
                  whilst holding steadfast to the time-honoured traditions of fine watchmaking.
                </StyledSectionContent>
                <StyledSectionContent>
                  Like that landmark watch, the RM 001, Alpine Creations&apos;s success is a product
                  of three crucial elements: the best of cutting edge innovative technology, a
                  strong artistic and architectural dimension, and watches designed to be robust and
                  easy to use, yet also highly sophisticated. Each piece is finished and assembled
                  by hand, reflecting the very best in Haute Horlogerie.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2021/12/06173125/concept_v2.jpg?dpr=1&width=1000"
                  alt="RM 001 Tourbillon - First Alpine Creations Watch"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>

          <Grid item xs={12} md={12}>
            <m.div variants={varFade().inUp}>
              <StyledFullHeightImage url="https://media.richardmille.com/wp-content/uploads/2018/02/23172228/histoire.jpg?dpr=1&width=2000" />
            </m.div>
          </Grid>
        </Grid>

        <Grid container spacing={8} sx={{ bgcolor: theme.palette.common.white }}>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2019/01/23171310/IMG_6508.jpg?dpr=1&width=1000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>
                  MATERIALS INNOVATION
                </StyledSectionTitle>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  From the very inception of the brand, Alpine Creations endeavoured to apply to
                  watchmaking techniques and materials found in the most innovative sectors, such as
                  Formula 1 race car development or the aerospace industry, always with the goal of
                  creating an extreme timepiece that was both uncompromising and gimmick-free.
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  The brand has laid claim to a number of world innovations in the application, use
                  and design of new technological materials that have vastly extended the field of
                  horological knowledge and invention.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
        </Grid>
      </Container>

      <Box
        component={MotionContainer}
        sx={{ pt: { xs: 10, md: 40 }, pb: { xs: 5, md: 10 }, bgcolor: theme.palette.common.white }}
      >
        <Grid container>
          <Grid item xs={12} md={10}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  &apos;I wanted to design utterly innovative products that would break with the
                  prevailing classicism and adhere to a single principle: nothing is too good for
                  the result.&apos;
                </StyledSectionContent>
                <StyledQuoteAuthor>Alpine Creations</StyledQuoteAuthor>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
      </Box>

      <Box component={MotionContainer} sx={{ pt: { xs: 5, md: 20 }, pb: { xs: 5, md: 10 } }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionContent>
                  This first timepiece, the inspiration for the many to follow in the ensuing years,
                  was consciously intended to serve as a landmark for the brand, an embodiment of
                  concepts that could outline a vision for 21st century watchmaking.
                </StyledSectionContent>
                <StyledSectionContent>
                  Within a short time, the terms futuristic and high-tech became buzzwords shared by
                  public and press in attempting to decipher the emotional attraction exerted by the
                  RM 001.
                </StyledSectionContent>
                <StyledSectionContent>
                  From avid collectors to specialised journalists, not many failed to immediately
                  recognise that the philosophy behind this watch represented a critical rupture
                  with the past, all the while demonstrating a deep respect for the culture, skills
                  and traditions of fine watchmaking.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2018/01/23172822/richard-mille-rm-001-tourbillon-8567.jpg?dpr=1&width=1000"
                  alt="RM 001 Tourbillon - First Alpine Creations Watch"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
          <Grid item xs={12} md={8}>
            <m.div variants={varFade().inUp}>
              <StyledSection sx={{ pt: 30 }}>
                <StyledSectionContent>
                  &apos;A Alpine Creations watch is the expression of our love for all things
                  technical, and for automobiles and aeronautics in particular.&apos;
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
        </Grid>
      </Box>

      <Box
        component={MotionContainer}
        sx={{ pt: { xs: 5, md: 20 }, pb: { xs: 5, md: 10 }, bgcolor: theme.palette.common.white }}
      >
        <Grid container spacing={8}>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>
                  THE CONCEPT DEFINES THE COMPONENTS
                </StyledSectionTitle>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  A watch designed by Alpine Creations is characterised by the absence of
                  superfluity. Just as we find in today&apos;s high-speed racing cars, function
                  dictates form; there is neither use nor room for an approach driven solely by
                  aesthetics. For the brand, every pinion, lever and spring must fulfil its mission,
                  meeting the highest standards of security and precision.
                </StyledSectionContent>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  This conviction is manifest not only visually, but in every design choice at every
                  phase of production. Even the famous spline screws, highly visible on the
                  watchcase exterior and used throughout the movement, are the outcome of months of
                  study and investment. Each screw, for instance, requires more than 20 operations
                  to manufacture.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
        </Grid>
      </Box>

      <Container
        maxWidth="md"
        component={MotionContainer}
        sx={{ pt: { xs: 5, md: 20 }, pb: { xs: 5, md: 10 } }}
      >
        <Grid container spacing={8}>
          <Grid item xs={12} md={12}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionContent>
                  The inspiration for the RM 001 can be found in concepts and materials associated
                  with Formula 1 racing car design and development. Just as this inspiration
                  continues to serve as a founding principle of the brand’s philosophy today, so a
                  holistic approach to the wristwatch is the keystone of Richard Mille’s
                  methodology.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={12}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2021/12/06173412/concept_montage.jpg?dpr=1&width=2000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
        </Grid>
      </Container>

      <Box component={MotionContainer} sx={{ pt: { xs: 5, md: 20 }, pb: { xs: 5, md: 10 } }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle>LATEST TECHNOLOGICAL BREAKTHROUGHS</StyledSectionTitle>
                <StyledSectionContent>
                  Every model includes innovative developments inspired by the latest technological
                  breakthroughs. The quest for perfection is a matter of balancing all possible
                  features and options. This is precisely why there are virtually no standard pieces
                  in a Alpine Creations watch. The concept defines the components, the components do
                  not define the watch.
                </StyledSectionContent>
                <StyledSectionContent>
                  As a result of research conducted in the world of technology and the methods
                  applied to address the forces at play on the racetrack, Alpine Creations&apos;s
                  watches have undergone improvements in baseplate rigidity, in the energy
                  transmission of the going train gear teeth, and the addition of greater
                  flexibility to specific parts of the movement, providing supplementary shock
                  resistance.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2018/12/23172048/RM38-01-mvt-02-e1573232899679.jpg?dpr=1&width=1000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle>AN ICONIC VISUAL IDENTITY</StyledSectionTitle>
                <StyledSectionContent>
                  The creation of a timepiece demands a balancing act between total volume, the
                  physical requirements of the movement and its specific features, however, the
                  user&apos;s comfort is equally essential.
                </StyledSectionContent>
                <StyledSectionContent>
                  This was at the heart of the original tonneau shape developed by Alpine Creations
                  at the brand&apos;s beginning. Regardless of whether a particular RM model is slim
                  or massive, its shape ensures optimal comfort, never interfering with the
                  owner&apos;s physical movements.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2019/01/23171252/richard-mille-rm-003-v1-tourbillon-14328.jpg?dpr=1&width=1000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
        </Grid>
      </Box>

      <Box
        component={MotionContainer}
        sx={{ pt: { xs: 5, md: 20 }, bgcolor: theme.palette.common.white }}
      >
        <Grid container spacing={8}>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2021/12/06173540/concept_bas-pagev2.jpg?dpr=1&width=1000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle sx={{ color: 'common.black' }}>
                  A RECOGNISABLE CREATION
                </StyledSectionTitle>
                <StyledSectionContent sx={{ color: 'common.black' }}>
                  The characteristic, ergonomic shape of the watchcase has come to exemplify the
                  brand’s iconic visual identity. However, even models that stray from the tonneau
                  form, such as the rectangular RM 016 Automatic and RM 017 Tourbillon, or the
                  round-cased RM 025, RM 033, RM 39-01 or RM 63-02 incontrovertibly embody the
                  brand’s essence and are instantly recognisable as Alpine Creations creations, even
                  at a distance.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        <Grid item xs={12} md={12}>
          <m.div variants={varFade().inUp}>
            <StyledFullHeightImage url="https://media.richardmille.com/wp-content/uploads/2019/01/23170850/richard-mille-rm-025-tourbillon-chronograph-divers-watch-16611.jpg?dpr=1&width=2000" />
          </m.div>
        </Grid>
      </Grid>

      <Box component={MotionContainer} sx={{ pt: { xs: 5, md: 20 }, pb: { xs: 2, md: 5 } }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <StyledSection>
                <StyledSectionTitle>20 YEARS OF NEW MATERIAL RESEARCH</StyledSectionTitle>
                <StyledSectionContent>
                  The first ever Alpine Creations were born of experimental research on innovative
                  materials. Many viewed this choice as an especially risky wager. Thanks to
                  relentless R&D, hard work and perseverance, the brand distinguished itself,
                  reinventing the concept of watchmaking mechanicals. Whereas domains as diverse as
                  aviation, the automotive industry and telecommunications were quick to embrace
                  technological change, horology took refuge in a conservatism founded on techniques
                  handed down through centuries, and materials belonging to a bygone era.
                </StyledSectionContent>
                <StyledSectionContent>
                  For as long as collectors maintained that the value of a watch was intrinsically
                  dependant on the weight it added to the wrist and the nobility of the metal
                  employed, gold made perfect sense. But Alpine Creations, with his ever-lighter
                  ever-higher performance materials, quickly demolished this long-standing
                  perception.
                </StyledSectionContent>
                <StyledSectionContent>
                  Each material is chosen for the specific, clearly-defined qualities and improved
                  efficiency they bring to watchmaking. Novel materials such as these are the
                  foundation for achieving advanced chronometric results, whilst simultaneously
                  broadening the possibilities open to horology in the 21st century.
                </StyledSectionContent>
                <StyledSectionContent>
                  Taking leads from research and development in the high-tech aeronautics and racing
                  car industries, materials new to watchmaking such as titanium, carbon nanofibres,
                  ALUSIC®, Aluminium-Lithium, Anticorodal 100, Phynox, Carbon TPT®, graphene and
                  many others have made their grand entrance into the world of watchmaking via
                  Alpine Creations.
                </StyledSectionContent>
                <StyledSectionContent>
                  Experimental research using innovative and sometimes revolutionary materials
                  outstandingly adapted to precise technical objectives has led to the creation of
                  limited-edition models such as the RM 012, with its tubular-architecture movement
                  of tiny Phynox tubes, or the RM 27-01 Rafael Nadal Tourbillon, the lightest
                  tourbillon wristwatch in the world at only 18.84 grams including the strap.
                </StyledSectionContent>
              </StyledSection>
            </m.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2018/12/23172104/11-03_MCL-remontoir-poussoirs.jpg?dpr=1&width=1000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledImageContainer>
            </m.div>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2018/01/23172815/richard-mille-rm-38-01-tourbillon-bubba-watson-8583.jpg?dpr=1&width=1000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledImageContainer>
            </m.div>
            <m.div variants={varFade().inUp}>
              <StyledImageContainer>
                <StyledSectionImage
                  src="https://media.richardmille.com/wp-content/uploads/2018/01/23173240/RM-27-01_Cables.jpg?dpr=1&width=1000"
                  alt="Materials Innovation - Formula 1 and Aerospace Technology"
                />
              </StyledImageContainer>
            </m.div>
          </Grid>
        </Grid>

        <Box
          component={MotionContainer}
          sx={{
            pt: { xs: 10, md: 40 },
            pb: { xs: 5, md: 10 },
            bgcolor: theme.palette.common.white,
          }}
        >
          <Grid container>
            <Grid item xs={12} md={10}>
              <m.div variants={varFade().inUp}>
                <StyledSection>
                  <StyledSectionContent sx={{ color: 'common.black' }}>
                    &apos;The brand has one foot in the 19th century—because we are faithful to the
                    great Swiss tradition of horology, with extremely complex movements assembled
                    and finished by hand—and the other foot in the 21st century.&apos;
                  </StyledSectionContent>
                </StyledSection>
              </m.div>
            </Grid>
            <Grid item xs={12} md={2} />
          </Grid>
        </Box>

        <Grid container spacing={8}>
          <Grid item xs={12} md={12}>
            <m.div variants={varFade().inUp}>
              <StyledHeroVideo autoPlay muted loop playsInline>
                <source
                  src="https://media.richardmille.com/wp-content/uploads/2019/05/06194101/concept-RM12.mp4"
                  type="video/mp4"
                />
              </StyledHeroVideo>
            </m.div>
          </Grid>
        </Grid>

        <Box sx={{ mt: 10 }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <m.div variants={varFade().inUp}>
                <StyledOverlayImage sx={{ height: 300, overflow: 'hidden' }}>
                  <Image
                    src="https://media.richardmille.com/wp-content/uploads/2019/01/28165543/push_history_resized.jpg?dpr=1&width=2000"
                    alt="Materials Innovation - Formula 1 and Aerospace Technology"
                  />
                </StyledOverlayImage>
              </m.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <m.div variants={varFade().inUp}>
                <StyledOverlayImage
                  sx={{
                    height: 300,
                    display: 'flex',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Image
                    ratio="1/1"
                    src="https://media.richardmille.com/wp-content/uploads/2019/01/23172017/Historical-Models-cover.jpg?dpr=1&width=2000"
                    alt="Materials Innovation - Formula 1 and Aerospace Technology"
                  />
                </StyledOverlayImage>
              </m.div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledRoot>
  );
}
