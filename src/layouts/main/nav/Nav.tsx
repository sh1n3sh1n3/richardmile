import { useMemo } from 'react';
// @mui
import { Box, Drawer, SwipeableDrawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// config
import { HEADER, NAV } from 'src/config-global';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// components
import Scrollbar from 'src/components/scrollbar';
import NavSection from 'src/components/nav-section/NavSection';
//
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  setOpenNav: (open: boolean) => void;
};

export default function Nav({ openNav, setOpenNav }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const renderContent = (
    <Scrollbar
      sx={{
        pt: isDesktop ? `${HEADER.H_DASHBOARD_DESKTOP}px` : `${HEADER.H_MOBILE}px`,
        px: { xs: 3, lg: 5 },
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <NavSection data={navConfig} onClick={() => setOpenNav(false)} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  const {easing} = theme.transitions;
  const durations = theme.transitions.duration;

  const desktopPaperSx = useMemo(
    () => ({
      zIndex: 9999,
      width: NAV.W_DASHBOARD,
      overflow: 'hidden',
      willChange: 'transform',
      transform: openNav ? 'translateX(0)' : `translateX(-100%)`,
      transition: theme.transitions.create('transform', {
        duration: openNav ? durations.enteringScreen * 3 : durations.leavingScreen * 3,
        easing: openNav ? easing.easeOut : easing.sharp,
      }),
      ...bgBlur({
        color: theme.palette.background.default,
      }),
      boxShadow: openNav ? theme.shadows[8] : 'none',
    }),
    [openNav, theme, durations, easing]
  );

  return (
    <Box
      component="nav"
      data-nav-drawer
      sx={{
        flexShrink: { lg: 0 },
      }}
    >
      {isDesktop ? (
        <Drawer
          variant="persistent"
          open
          PaperProps={{ sx: desktopPaperSx }}
          ModalProps={{ keepMounted: true }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <SwipeableDrawer
          open={openNav}
          onClose={() => setOpenNav(false)}
          onOpen={() => setOpenNav(true)}
          disableDiscovery
          ModalProps={{ 
            keepMounted: true,
            disableScrollLock: false,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
              willChange: 'transform',
              transition: theme.transitions.create('transform', {
                duration: durations.standard,
                easing: easing.easeOut,
              }),
              ...bgBlur({
                color: theme.palette.background.default,
              }),
            },
          }}
        >
          {renderContent}
        </SwipeableDrawer>
      )}
    </Box>
  );
}
