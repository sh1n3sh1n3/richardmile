import { forwardRef } from 'react';
// @mui
import { Box, IconButton, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
//
import Iconify from '../iconify';
import { MenuButtonProps } from './types';
import { LinedTextItem } from '../lined-item';
import { HEADER } from 'src/config-global';

// ----------------------------------------------------------------------

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ size = 'medium', color = 'inherit', openNav, setOpenNav, sx, ...other }, ref) => {
    const isDesktop = useResponsive('up', 'lg');

    return (
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
        {openNav ? (
          <IconButton
            ref={ref}
            size={size}
            color={color}
            data-nav-toggle
            sx={{
              ...sx,
            }}
            onClick={() => setOpenNav(false)}
            {...other}
          >
            <Iconify icon="eva:close-fill" width={30} height={30} />
          </IconButton>
        ) : (
          <IconButton
            ref={ref}
            size={size}
            color={color}
            data-nav-toggle
            sx={{
              ...sx,
            }}
            onClick={() => setOpenNav(true)}
            {...other}
          >
            <Iconify icon="tabler:menu-2" width={30} height={30} />
          </IconButton>
        )}

        {isDesktop && !openNav && (
          <LinedTextItem
            item={{ title: 'MENU', path: '#' }}
            data-nav-toggle
            sx={{
              typography: 'caption',
            }}
            onClick={() => setOpenNav(true)}
          />
        )}
      </Stack>
    );
  }
);

MenuButton.displayName = 'MenuButton';

export default MenuButton;
