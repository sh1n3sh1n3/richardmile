import { alpha, Box, Menu, styled } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledFilterButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  textTransform: 'none',
  height: theme.spacing(5),
  borderRadius: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
}));

export const StyledFilterTextArea = styled(Box)(({ theme }) => ({
  flex: 1,
  height: '100%',
  display: 'flex',
  fontWeight: 600,
  letterSpacing: 0.5,
  fontSize: '0.75rem',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'uppercase',
  padding: theme.spacing(0, 2),
  color: theme.palette.common.white,
  borderTopLeftRadius: theme.spacing(3),
  borderBottomLeftRadius: theme.spacing(3),
  backgroundColor: theme.palette.common.black,
  border: `1px solid ${theme.palette.text.disabled}`,
}));

export const StyledFilterIconArea = styled(Box)<{ isFilter: boolean }>(({ theme, isFilter }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: theme.spacing(5),
  padding: theme.spacing(0, 1.5),
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
  ...(isFilter && {
    padding: theme.spacing(0, 2),
    borderRadius: theme.spacing(3),
  }),
}));

export const StyledFilterSelect = styled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: 'flex',
  borderWidth: 1,
  cursor: 'pointer',
  alignItems: 'center',
  height: theme.spacing(5),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(3),
  position: 'relative',
  textTransform: 'none',
  backgroundColor: 'transparent',
  border: `solid 1px ${theme.palette.text.disabled}`,
  color: theme.palette.text.primary,
  ...(isOpen && {
    borderWidth: 0,
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  }),
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: theme.shadows[8],
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    border: `solid 1px ${theme.palette.text.disabled}`,
    backgroundColor: theme.palette.background.paper,
    minWidth: 150,
  },
  '& .MuiMenuItem-root': {
    padding: theme.spacing(1.5, 2),
    fontSize: '0.875rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
      },
    },
  },
}));

export const StyledFilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

export const StyledResetButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  height: theme.spacing(5),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(3),
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  border: `1px solid ${theme.palette.text.disabled}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.8),
  },
}));
