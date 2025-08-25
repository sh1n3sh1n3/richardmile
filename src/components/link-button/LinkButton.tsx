import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import { StyledButton } from './styles';
import { LinkButtonProps } from './types';

// ----------------------------------------------------------------------

const Label = forwardRef<HTMLSpanElement, LinkButtonProps>(
  ({ 
    children, 
    color = 'secondary', 
    variant = 'outlined', 
    startIcon, 
    endIcon, 
    sx, 
    transitionDuration = 0.3,
    ...other 
  }) => {
    const theme = useTheme();

    return (
      <StyledButton
        color={color}
        variant={variant}
        startIcon={startIcon}
        endIcon={endIcon}
        sx={{ 
          transition: `all ${transitionDuration}s ease-in-out`,
          ...sx 
        }}
        {...other}
      >
        {children}
      </StyledButton>
    );
  }
);

export default Label;
