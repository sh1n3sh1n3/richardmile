import { useState } from 'react';
// @mui
import { Stack } from '@mui/material';
// locales
// components
import { NavItem } from 'src/components/nav-section';
import { LinedTextItem } from 'src/components/lined-item';
import { useLocales } from '../../locales';
//
import MenuPopover from '../menu-popover';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { allLangs, currentLang, onChangeLang } = useLocales();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (newLang: string) => {
    onChangeLang(newLang);
    handleClosePopover();
  };

  return (
    <>
      <LinedTextItem
        item={{ title: currentLang.label, path: '#' }}
        onClick={handleOpenPopover}
        sx={{
          typography: 'caption',
          textTransform: 'uppercase',
        }}
      />

      <MenuPopover
        open={openPopover}
        arrow="top-left"
        onClose={handleClosePopover}
        sx={{ width: 100, mt: 1 }}
      >
        <Stack spacing={0.75}>
          {allLangs.map((option) => (
            <NavItem
              key={option.value}
              item={{ title: option.label, path: '#' }}
              onClick={() => handleChangeLang(option.value)}
              sx={{
                typography: 'body2',
                fontWeight: 400,
              }}
            />
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
