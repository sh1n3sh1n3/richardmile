// import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { useRouter } from 'next/router';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// locales
// import { useLocales } from 'src/locales';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import { varFade } from '../../components/animate';
//
import { StyledHeroContent } from '../styls';

interface HeroSectionProps {
  onVideoLoad?: () => void;
  onVideoPlay?: () => void;
  onVideoPause?: () => void;
  videoSrc: string;
  label: string;
  title: string;
  description: string;
  router?: string;
}
export default function HomeVideo({
  onVideoLoad,
  onVideoPlay,
  onVideoPause,
  videoSrc,
  label,
  title,
  description,
  router,
}: HeroSectionProps) {
  // const theme = useTheme();
  // const { translate } = useLocales();
  // const { scrollYProgress } = useScroll();
  const isDesktop = useResponsive('up', 'md');
  const nextRouter = useRouter();

  const handleTitleClick = () => {
    if (router) {
      nextRouter.push(router);
    }
  };

  return (
    <>
      <div data-index="0" className="home__section__bg js-section-bg">
        <div className="home__section__media js-section-media">
          <video
            data-index="0"
            data-active="0"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={onVideoLoad}
            onPlay={onVideoPlay}
            onPause={onVideoPause}
          />
        </div>
        <span className="home__overlay" />
      </div>

      {/* Content */}
      <div className="home__text js-text">
        <StyledHeroContent>
          <Box sx={{ position: 'absolute', bottom: isDesktop ? 0 : 50, left: 0 }}>
            <m.div variants={varFade().inUp}>
              <Box sx={{ maxWidth: 800 }}>
                <Typography variant="inherit" sx={{ mb: isDesktop ? 6 : 2 }}>
                  {label}
                </Typography>
                <Typography
                  variant={isDesktop ? 'h1' : 'h3'}
                  onClick={handleTitleClick}
                  sx={{
                    cursor: router ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    '&:hover': router
                      ? {
                          opacity: 0.8,
                          transform: 'translateY(-2px)',
                        }
                      : {},
                  }}
                >
                  {/* {`${translate('RICHARD MILLE UNIVERSE')}`} */}
                  {title}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  {description}
                </Typography>
              </Box>
            </m.div>
          </Box>
        </StyledHeroContent>
      </div>
    </>
  );
}
