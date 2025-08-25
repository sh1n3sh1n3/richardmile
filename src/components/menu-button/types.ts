import { IconButtonProps } from '@mui/material';
import { IconifyProps } from '../iconify/types';

// ----------------------------------------------------------------------

export interface MenuButtonProps extends Omit<IconButtonProps, 'children'> {
  openNav: boolean;
  setOpenNav: (open: boolean) => void;
}
