// @mui
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    textTransform: 'capitalize',
    position: 'relative',
    '& .MuiButton-startIcon': {
      transition: 'all 0.3s ease-in-out',
      opacity: 0,
    },
    '& .MuiButton-endIcon': {
      transition: 'all 0.3s ease-in-out',
      opacity: 1,
    },
    '&:hover': {
      '& .MuiButton-startIcon': {
        opacity: 1,
      },
      '& .MuiButton-endIcon': {
        opacity: 0,
      },
    },
  }));
