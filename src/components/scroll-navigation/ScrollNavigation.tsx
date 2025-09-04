import { useState, useEffect } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {  IconButton, Tooltip } from '@mui/material';
// components
import Iconify from '../iconify';

// ----------------------------------------------------------------------

const StyledNavigation = styled('div')(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(3),
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const StyledDot = styled('div')<{ active: boolean }>(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : alpha(theme.palette.common.white, 0.3),
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  border: `2px solid ${active ? theme.palette.primary.main : 'transparent'}`,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : alpha(theme.palette.common.white, 0.6),
    transform: 'scale(1.2)',
  },
}));

const StyledScrollButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  color: theme.palette.common.white,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease-in-out',
}));

// ----------------------------------------------------------------------

interface ScrollNavigationProps {
  sections: string[];
}

export default function ScrollNavigation({ sections }: ScrollNavigationProps) {
  // const theme = useTheme();
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollPosition / windowHeight);
      setActiveSection(Math.min(currentSection, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <StyledNavigation>
      <Tooltip title="Go to top" placement="left">
        <StyledScrollButton onClick={scrollToTop}>
          <Iconify icon="eva:arrow-up-fill" width={20} height={20} />
        </StyledScrollButton>
      </Tooltip>

      {sections.map((section, index) => (
        <Tooltip key={section} title={`Section ${index + 1}`} placement="left">
          <StyledDot
            active={activeSection === index}
            onClick={() => scrollToSection(index)}
          />
        </Tooltip>
      ))}

      <Tooltip title="Go to bottom" placement="left">
        <StyledScrollButton onClick={scrollToBottom}>
          <Iconify icon="eva:arrow-down-fill" width={20} height={20} />
        </StyledScrollButton>
      </Tooltip>
    </StyledNavigation>
  );
}
