import { ButtonProps } from '@mui/material';

// ----------------------------------------------------------------------

export type LabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type LabelVariant = 'filled' | 'outlined' | 'soft';

export interface LinkButtonProps extends ButtonProps {
  hoverStartIcon?: React.ReactNode;
  hoverEndIcon?: React.ReactNode;
  hoverText?: string;
  transitionDuration?: number;
}
