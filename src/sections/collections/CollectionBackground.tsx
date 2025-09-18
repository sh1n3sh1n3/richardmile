import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

interface CollectionBackgroundProps {
  collection?: {
    introduction?: {
      background: string;
      backgroundIsVideo: boolean;
    };
  };
}

const StyledBackgroundSection = styled(Box)<{ backgroundImage?: string }>(
  ({ theme, backgroundImage }) => ({
    width: '100%',
    height: '100vh',
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      [theme.breakpoints.down('md')]: {
        backgroundAttachment: 'scroll', // Better performance on mobile
        height: '80vh',
      },
      [theme.breakpoints.down('sm')]: {
        height: '70vh',
      },
    }),
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Subtle overlay for better text readability if needed
    },
  })
);

const StyledVideoBackground = styled('video')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
}));

// ----------------------------------------------------------------------

export default function CollectionBackground({ collection }: CollectionBackgroundProps) {
  // Use introduction background if available
  const backgroundUrl = collection?.introduction?.background;
  const isVideo = collection?.introduction?.backgroundIsVideo;

  // Fallback background
  const fallbackBackground =
    'https://media.richardmille.com/wp-content/uploads/2023/02/10203219/RM88_back.png?dpr=1&width=250';

  if (isVideo && backgroundUrl) {
    return (
      <StyledBackgroundSection>
        <StyledVideoBackground autoPlay muted loop playsInline preload="metadata">
          <source src={backgroundUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideoBackground>
      </StyledBackgroundSection>
    );
  }

  return <StyledBackgroundSection backgroundImage={backgroundUrl || fallbackBackground} />;
}
