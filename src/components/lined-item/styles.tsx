// @mui
import {  Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledItem = styled(Typography)(({ theme }) => ({
    position: 'relative',
    textTransform: 'capitalize',
    transition: 'color 0.6s ease',
    color: theme.palette.text.primary,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      width: '100%',
      height: '1px',
      backgroundColor: theme.palette.text.primary,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s ease-in-out',
    },
    '&:hover::after': {
      transform: 'scaleX(1)',
    }
  }));