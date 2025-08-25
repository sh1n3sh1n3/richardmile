// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, Box, Container } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// config
import { HEADER, SCROLL_HEIGHT } from '../../config-global';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Logo from 'src/components/logo';
import MenuButton from 'src/components/menu-button';
import { LinedTextItem } from 'src/components/lined-item';
import LanguagePopover from '../../components/language-popover';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  setOpenNav: (open: boolean) => void;
};

export default function Header({ openNav, setOpenNav }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(SCROLL_HEIGHT);

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        bgcolor: 'transparent',
        height: HEADER.H_MOBILE,
        zIndex: 99999,
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            visibility: 'hidden',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
        }),
      }}
    >
      <Toolbar sx={{ height: 1 }}>
        <Container maxWidth="xl" sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <MenuButton openNav={openNav} setOpenNav={setOpenNav} />

          <Box
            sx={{
              top: '50%',
              left: '50%',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Logo />
          </Box>

          {isDesktop && (
            <Stack
              flexGrow={1}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={{ xs: 0.5, sm: 3 }}
            >
              <LinedTextItem
                item={{ title: 'SEARCH', path: '#' }}
                sx={{
                  typography: 'caption',
                }}
              />
              <LanguagePopover />
              <LinedTextItem
                item={{ title: 'COLLECTIONS', path: PATH_PAGE.collections }}
                sx={{
                  typography: 'caption',
                }}
              />
            </Stack>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}
