// @mui
import { useTheme } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// config
import { NAV } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';
// import { useSettingsContext } from '../../../components/settings';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  setOpenNav: (open: boolean) => void;
};

export default function NavToggleButton({
  sx,
  openNav,
  setOpenNav,
  ...other
}: IconButtonProps & Props) {
  const theme = useTheme();

  // const { themeLayout, onToggleLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  // Show toggle button on both desktop and mobile
  return (
    <IconButton
      size="small"
      onClick={() => setOpenNav(!openNav)}
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',
        left: isDesktop ? NAV.W_DASHBOARD - 12 : 12,
        zIndex: theme.zIndex.appBar + 1,
        border: `dashed 1px ${theme.palette.divider}`,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={openNav ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </IconButton>
  );
}
