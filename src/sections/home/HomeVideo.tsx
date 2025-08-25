import { useEffect, useState } from 'react';
import { m, useScroll } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import { MotionContainer, varFade } from '../../components/animate';
//
import { StyledHero, StyledHeroVideo, StyledHeroContent, StyledVideoOverlay } from '../styls';

interface HeroSectionProps {
  onVideoLoad?: () => void;
  onVideoPlay?: () => void;
  onVideoPause?: () => void;
  videoSrc: string;
}
export default function HomeVideo({
  onVideoLoad,
  onVideoPlay,
  onVideoPause,
  videoSrc,
}: HeroSectionProps) {
  const theme = useTheme();
  const { translate } = useLocales();
  const { scrollYProgress } = useScroll();
  const isDesktop = useResponsive('up', 'md');

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
                  New Model
                </Typography>
                <Typography variant={isDesktop ? 'h1' : 'h3'}>
                  {`${translate('RICHARD MILLE UNIVERSE')}`}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  The story behind
                </Typography>
              </Box>
            </m.div>
          </Box>
        </StyledHeroContent>
      </div>
    </>
  );
}
