import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, MenuItem, Typography, Stack, Divider } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
//
import Iconify from '../iconify';
import {
  StyledMenu,
  StyledResetButton,
  StyledFilterButton,
  StyledFilterSelect,
  StyledFilterTextArea,
  StyledFilterIconArea,
  StyledFilterContainer,
} from './styles';
import { CollectionsFilterProps, FilterCategory } from './types';

// ----------------------------------------------------------------------

const filterCategories: FilterCategory[] = [
  {
    name: 'CONCEPT',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Lifestyle', value: 'lifestyle' },
      { label: 'Sport', value: 'sport' },
      { label: 'Watch Culture', value: 'watch-culture' },
    ],
  },
  {
    name: 'RANGE',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Tourbillon', value: 'tourbillon' },
      { label: 'Sapphire', value: 'sapphire' },
      { label: 'Ultraflat', value: 'ultraflat' },
      { label: 'Chronograph', value: 'chronograph' },
      { label: 'Extra Flat', value: 'extra-flat' },
      { label: 'Accessories', value: 'accessories' },
    ],
  },
  {
    name: 'TYPE',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Under €500K', value: 'under-500k' },
      { label: '€500K - €1M', value: '500k-1m' },
      { label: 'Over €1M', value: 'over-1m' },
    ],
  },
  {
    name: 'MATERIAL',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Material 1', value: 'under-500k' },
      { label: 'Material 2', value: '500k-1m' },
      { label: 'Material 3', value: 'over-1m' },
    ],
  },
  {
    name: 'COLOR',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Color 1', value: 'under-500k' },
      { label: 'Color 2', value: '500k-1m' },
      { label: 'Color 3', value: 'over-1m' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Filter({
  categories = [],
  selectedCategory = 'all',
  onCategoryChange,
}: CollectionsFilterProps) {
  const theme = useTheme();
  const { translate } = useLocales();

  const [isFilter, setIsFilter] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    concept: 'all',
    range: 'all',
    type: 'all',
    material: 'all',
    color: 'all',
  });

  const [anchorEl, setAnchorEl] = useState<Record<string, HTMLElement | null>>({
    concept: null,
    range: null,
    type: null,
    material: null,
    color: null,
  });

  const handleFilterClick = (filterName: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setAnchorEl((prev) => ({
      ...prev,
      [filterName]: event.currentTarget,
    }));
  };

  const handleFilterClose = (filterName: string) => () => {
    setAnchorEl((prev) => ({
      ...prev,
      [filterName]: null,
    }));
  };

  const handleFilterSelect = (filterName: string, value: string) => () => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    handleFilterClose(filterName)();
  };

  const handleClick = () => {
    setIsFilter(!isFilter);
  };

  const handleResetAll = () => {
    setSelectedFilters({
      concept: 'all',
      range: 'all',
      type: 'all',
      material: 'all',
      color: 'all',
    });
    setIsFilter(false);
  };

  const getSelectedLabel = (filterName: string) => {
    const category = filterCategories.find((cat) => cat.name.toLowerCase() === filterName);
    const selectedValue = selectedFilters[filterName];
    const option = category?.options.find((opt) => opt.value === selectedValue);
    return option?.label || category?.name || filterName;
  };

  const hasActiveFilters = Object.values(selectedFilters).some((value) => value !== 'all');

  return (
    <StyledFilterContainer>
      <StyledFilterButton onClick={handleClick}>
        {!isFilter && (
          <StyledFilterTextArea>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              {`${translate('FILTERS')}`}
            </Typography>
          </StyledFilterTextArea>
        )}
        <StyledFilterIconArea isFilter={isFilter}>
          <Iconify icon="material-symbols:filter-list" />
        </StyledFilterIconArea>
      </StyledFilterButton>

      {isFilter &&
        filterCategories.map((category) => {
          const filterName = category.name.toLowerCase();
          const isOpen = Boolean(anchorEl[filterName]);
          const selectedLabel = getSelectedLabel(filterName);

          return (
            <Box key={category.name}>
              <StyledFilterSelect isOpen={isOpen} onClick={handleFilterClick(filterName)}>
                <Stack spacing={1} direction="row" alignItems="center">
                  <Typography variant="caption" sx={{ textTransform: 'uppercase' }}>{`${translate(
                    category.name
                  )}`}</Typography>
                  <Iconify
                    icon={isOpen ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                  />
                  <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
                  <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                    {`${translate(selectedLabel)}`}
                  </Typography>
                </Stack>
              </StyledFilterSelect>

              <StyledMenu
                anchorEl={anchorEl[filterName]}
                open={isOpen}
                onClose={handleFilterClose(filterName)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {category.options.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={handleFilterSelect(filterName, option.value)}
                    selected={selectedFilters[filterName] === option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </StyledMenu>
            </Box>
          );
        })}

      {isFilter && hasActiveFilters && (
        <StyledResetButton onClick={handleResetAll}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Reset all
          </Typography>
        </StyledResetButton>
      )}
    </StyledFilterContainer>
  );
}
