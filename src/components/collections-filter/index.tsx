import React, { useState, MouseEvent } from 'react';
// @mui
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// icons
import Iconify from '../iconify';

// ----------------------------------------------------------------------

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
  height: 40,
  borderRadius: 20,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  minWidth: 120,
  justifyContent: 'center',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

// ----------------------------------------------------------------------

interface CollectionsFilterProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  categories?: Array<{ value: string; label: string }>;
}

const defaultCategories = [
  { value: 'all', label: 'All Collections' },
  { value: 'Tourbillon', label: 'Tourbillon' },
  { value: 'Sapphire', label: 'Sapphire' },
  { value: 'Ultraflat', label: 'Ultraflat' },
  { value: 'Chronograph', label: 'Chronograph' },
  { value: 'Extra Flat', label: 'Extra Flat' },
  { value: 'Accessories', label: 'Accessories' },
];

export default function CollectionsFilter({
  onCategoryChange,
  selectedCategory,
  categories = defaultCategories,
}: CollectionsFilterProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    handleClose();
  };

  const selectedLabel =
    categories.find((cat) => cat.value === selectedCategory)?.label || 'All Collections';

  return (
    <Box>
      <StyledButton
        onClick={handleClick}
        endIcon={<Iconify icon="eva:arrow-ios-downward-fill" width={16} />}
        aria-controls={open ? 'category-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Typography variant="body2">{selectedLabel}</Typography>
      </StyledButton>

      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 160,
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {categories.map((category) => (
          <StyledMenuItem
            key={category.value}
            onClick={() => handleCategorySelect(category.value)}
            selected={selectedCategory === category.value}
          >
            <Typography variant="body2">{category.label}</Typography>
          </StyledMenuItem>
        ))}
      </Menu>
    </Box>
  );
}
