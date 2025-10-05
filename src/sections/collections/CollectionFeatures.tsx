import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid } from '@mui/material';
// components
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

interface CollectionFeaturesProps {
  features: Array<{
    title: string;
    data: Array<{
      title: string;
      description: string;
    }>;
  }>;
}

const StyledRoot = styled('div')<{ backgroundColor: string }>(({ theme, backgroundColor }) => ({
  width: '100%',
  paddingTop: '100px',
  paddingBottom: '100px',
  backgroundColor,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    paddingTop: '60px',
    paddingBottom: '60px',
    minHeight: '80vh',
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: '40px',
    paddingBottom: '40px',
    minHeight: '70vh',
  },
}));

const StyledContainer = styled('div')(({ theme }) => ({
  padding: '0 80px',
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
  },
}));

const StyledFeatureGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '80px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
    alignItems: 'center',
  },
}));

const StyledSectionTitle = styled(Typography)<{ textColor: string }>(({ theme, textColor }) => ({
  fontSize: '44px',
  fontWeight: 700,
  lineHeight: 1.1,
  color: textColor,
  textAlign: 'left',
  textTransform: 'uppercase',
  flexShrink: 0,
  maxWidth: '450px',
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
    textAlign: 'center',
    maxWidth: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '28px',
  },
}));

const StyledFeaturesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '60px',
  flex: 1,
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));

const StyledLeftColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  width: '50%',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    minHeight: 'auto',
  },
}));

const StyledRightColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  justifyContent: 'space-between',
  width: '50%',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

const StyledFeatureCard = styled(Box)<{ textColor: string }>(({ theme, textColor }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

const StyledFeatureTitle = styled(Typography)<{ textColor: string }>(({ theme, textColor }) => ({
  fontSize: '22px',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  borderBottom: `1px solid ${textColor}`,
  color: textColor,
  textAlign: 'left',
  textTransform: 'uppercase',
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
  },
}));

const StyledFeatureDescription = styled(Typography)<{ textColor: string }>(
  ({ theme, textColor }) => ({
    fontSize: '18px',
    lineHeight: 1.6,
    color: textColor === '#ffffff' ? '#a1a1a1' : '#373737',
    textAlign: 'left',
    '& ul': {
      margin: 0,
      paddingLeft: theme.spacing(2),
    },
    '& li': {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  })
);

// ----------------------------------------------------------------------

export default function CollectionFeatures({ features }: CollectionFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <>
      {features.map((featureGroup, groupIndex) => {
        const isEven = groupIndex % 2 === 0;
        const backgroundColor = isEven ? '#000000' : '#ffffff';
        const textColor = isEven ? '#ffffff' : '#000000';

        return (
          <StyledRoot key={groupIndex} backgroundColor={backgroundColor}>
            <MotionContainer width={'100%'}>
              <StyledContainer>
                <StyledFeatureGroup>
                  <m.div variants={varFade().inUp}>
                    <StyledSectionTitle textColor={textColor}>
                      {featureGroup.title}
                    </StyledSectionTitle>
                  </m.div>

                  <StyledFeaturesContainer>
                    <StyledLeftColumn>
                      <m.div variants={varFade().inUp} style={{ width: '100%' }}>
                        <StyledFeatureCard textColor={textColor}>
                          <StyledFeatureTitle textColor={textColor}>
                            {featureGroup.data[0]?.title}
                          </StyledFeatureTitle>
                          <StyledFeatureDescription
                            textColor={textColor}
                            dangerouslySetInnerHTML={{
                              __html:
                                featureGroup.data[0]?.description.replace(/\n/g, '<br>') || '',
                            }}
                          />
                        </StyledFeatureCard>
                      </m.div>
                    </StyledLeftColumn>

                    <StyledRightColumn>
                      <m.div variants={varFade().inUp} style={{ width: '100%' }}>
                        <StyledFeatureCard textColor={textColor}>
                          <StyledFeatureTitle textColor={textColor}>
                            {featureGroup.data[1]?.title}
                          </StyledFeatureTitle>
                          <StyledFeatureDescription
                            textColor={textColor}
                            dangerouslySetInnerHTML={{
                              __html:
                                featureGroup.data[1]?.description.replace(/\n/g, '<br>') || '',
                            }}
                          />
                        </StyledFeatureCard>
                      </m.div>

                      <m.div variants={varFade().inUp} style={{ width: '100%' }}>
                        <StyledFeatureCard textColor={textColor}>
                          <StyledFeatureTitle textColor={textColor}>
                            {featureGroup.data[2]?.title}
                          </StyledFeatureTitle>
                          <StyledFeatureDescription
                            textColor={textColor}
                            dangerouslySetInnerHTML={{
                              __html:
                                featureGroup.data[2]?.description.replace(/\n/g, '<br>') || '',
                            }}
                          />
                        </StyledFeatureCard>
                      </m.div>
                    </StyledRightColumn>
                  </StyledFeaturesContainer>
                </StyledFeatureGroup>
              </StyledContainer>
            </MotionContainer>
          </StyledRoot>
        );
      })}
    </>
  );
}
