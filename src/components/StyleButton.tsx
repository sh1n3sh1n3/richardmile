import { forwardRef } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';
// components
// import Iconify from './iconify';

// ----------------------------------------------------------------------

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.9s ease-in-out',
  
  '& .button-content': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    transition: 'all 0.9s ease-in-out',
  },
  
  '& .button-text': {
    transition: 'all 0.9s ease-in-out',
    transform: 'translateX(0)',
  },
  
  '& .button-icon': {
    transition: 'all 0.9s ease-in-out',
    transform: 'translateX(0)',
  },
  
  '&:hover': {
    '& .button-content': {
      gap: theme.spacing(2),
    },
    
    '& .button-text': {
      transform: 'translateX(8px)',
    },
    
    '& .button-icon': {
      transform: 'translateX(-8px)',
    },
  },
}));

// ----------------------------------------------------------------------

interface StyleButtonProps extends ButtonProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

const StyleButton = forwardRef<HTMLButtonElement, StyleButtonProps>(
  ({ children, startIcon, endIcon, ...other }, ref) => (
    <StyledButton ref={ref} {...other}>
      <div className="button-content">
        {startIcon && (
          <div className="button-icon">
            {startIcon}
          </div>
        )}
        
        <span className="button-text">
          {children}
        </span>
        
        {endIcon && (
          <div className="button-icon">
            {endIcon}
          </div>
        )}
      </div>
    </StyledButton>
  )
);

StyleButton.displayName = 'StyleButton';

export default StyleButton;
