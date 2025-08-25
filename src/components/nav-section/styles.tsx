// @mui
import {  Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledItem = styled(Typography)(({ theme }) => ({
    position: 'relative',
    textTransform: 'capitalize',
    transition: 'color 0.6s ease',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.disabled,
    }
  }));