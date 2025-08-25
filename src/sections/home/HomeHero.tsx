import { useEffect, useState, useRef } from 'react';
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
import HomeVideo from './HomeVideo';
import ProcessingButton from './ProcessingButton';
// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();
  const { translate } = useLocales();
  const { scrollYProgress } = useScroll();
  const isDesktop = useResponsive('up', 'md');

  const [videoLoadingStates, setVideoLoadingStates] = useState<boolean[]>([
    true,
    true,
    true,
    false,
    true,
    true,
    true,
  ]); // Track each video individually
  const [videoPlayingStates, setVideoPlayingStates] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]); // Track when videos are playing
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(
    () =>
      scrollYProgress.on('change', (scrollHeight) => {
        // console.log(scrollHeight);
        // if (scrollHeight > 0.02) {
        //   setHide(true);
        // } else {
        //   setHide(false);
        // }
      }),
    [scrollYProgress]
  );

  const scrollToNextSection = () => {
    if (currentSection < sections.length - 1 && !isScrolling) {
      setIsScrolling(true);
      // Set loading state for the next section if it has a video
      if (sections[currentSection + 1].hasVideo) {
        setVideoLoadingStates((prev) => {
          const newStates = [...prev];
          newStates[currentSection + 1] = true;
          return newStates;
        });
        // Set playing state for the next section
        setVideoPlayingStates((prev) => {
          const newStates = [...prev];
          newStates[currentSection + 1] = true;
          return newStates;
        });
      }
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);

      if (sectionsRef.current) {
        const targetScroll = nextSection * window.innerHeight;
        sectionsRef.current.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      }

      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 1000);
    }

    if (currentSection === sections.length - 1) {
      setIsScrolling(true);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  // Handle scroll to previous section
  const scrollToPrevSection = () => {
    if (currentSection > 0 && !isScrolling) {
      setIsScrolling(true);
      // Set loading state for the previous section if it has a video
      if (sections[currentSection - 1].hasVideo) {
        setVideoLoadingStates((prev) => {
          const newStates = [...prev];
          newStates[currentSection - 1] = true;
          return newStates;
        });
        // Set playing state for the previous section
        setVideoPlayingStates((prev) => {
          const newStates = [...prev];
          newStates[currentSection - 1] = true;
          return newStates;
        });
      }
      const prevSection = currentSection - 1;
      setCurrentSection(prevSection);

      if (sectionsRef.current) {
        const targetScroll = prevSection * window.innerHeight;
        setIsScrolling(true);
        sectionsRef.current.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      }

      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const handleVideoLoad = (sectionIndex: number) => {
    setVideoLoadingStates((prev) => {
      const newStates = [...prev];
      newStates[sectionIndex] = false;
      return newStates;
    });
    // Set playing state to true when video loads (starts playing)
    setVideoPlayingStates((prev) => {
      const newStates = [...prev];
      newStates[sectionIndex] = true;
      return newStates;
    });
  };

  // Handle video play state for specific section
  const handleVideoPlay = (sectionIndex: number) => {
    setVideoPlayingStates((prev) => {
      const newStates = [...prev];
      newStates[sectionIndex] = true;
      return newStates;
    });
  };

  // Handle video pause state for specific section
  const handleVideoPause = (sectionIndex: number) => {
    setVideoPlayingStates((prev) => {
      const newStates = [...prev];
      newStates[sectionIndex] = false;
      return newStates;
    });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default if we're in the hero section
      e.preventDefault();

      if (isScrolling) return;

      if (e.deltaY > 0) {
        // Scrolling down
        scrollToNextSection();
      } else {
        // Scrolling up
        if (scrollYProgress.get() === 1) {
          setIsScrolling(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => setIsScrolling(false), 1000);
          return;
        } else {
          scrollToPrevSection();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, isScrolling]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        scrollToNextSection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        // Scrolling up
        if (scrollYProgress.get() === 1) {
          setIsScrolling(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => setIsScrolling(false), 1000);
          return;
        } else {
          scrollToPrevSection();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling]);

  // Auto-advance to next section after video duration
  useEffect(() => {
    const autoAdvanceTimer = setTimeout(() => {
      if (currentSection < sections.length - 1 && !isScrolling) {
        scrollToNextSection();
      }
    }, 8000); // 8 seconds per section

    return () => clearTimeout(autoAdvanceTimer);
  }, [currentSection, isScrolling]);

  const sections = [
    {
      id: 1,
      hasVideo: true,
      src: 'https://video.richardmille.com/mobile/the-brand-history-rm-homepage.mp4',
    },
    {
      id: 2,
      hasVideo: true,
      src: 'https://video.richardmille.com/mobile/RM-33-03_packshot_169-header.mp4',
    },
    {
      id: 3,
      hasVideo: true,
      src: 'https://video.richardmille.com/mobile/header-collection-women-04_1.mp4',
    },
    {
      id: 4,
      hasVideo: true,
      src: 'https://video.richardmille.com/mobile/30-01-LMC_packshot_169_header-1.mp4',
    },
    {
      id: 5,
      hasVideo: true,
      src: 'https://video.richardmille.com/mobile/RM-33-03_packshot_169-header.mp4',
    },
    {
      id: 6,
      hasVideo: true,
      src: 'https://video.richardmille.com/mobile/RMB01_packshot_169_header-2.mp4',
    },
  ];

  return (
    <>
      <div className="page-wrapper page-wrapper--no-padding" ref={containerRef}>
        <div className="page-wrapper__content">
          <div className="home">
            <div className="home__container" style={{ height: '100vh' }} ref={sectionsRef}>
              {sections.map((item, index) => (
                <m.section
                  key={item.id}
                  className="home__section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <HomeVideo
                    onVideoLoad={() => handleVideoLoad(index)}
                    onVideoPlay={() => handleVideoPlay(index)}
                    onVideoPause={() => handleVideoPause(index)}
                    videoSrc={item.src}
                  />

                  {/* Processing button for each video section */}
                  <ProcessingButton
                    next={scrollToNextSection}
                    isVideoLoading={videoLoadingStates[index]}
                    isVideoPlaying={videoPlayingStates[index]}
                    canNavigate={!isScrolling}
                    onClick={() => scrollToNextSection()}
                    isScrolling={isScrolling}
                    isStop={currentSection === 5}
                  />
                </m.section>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - separate from scroll-snap container */}
      </div>
    </>
  );
}
