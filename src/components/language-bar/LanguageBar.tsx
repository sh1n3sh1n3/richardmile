// @mui
import { Stack, SxProps, Typography, useTheme } from '@mui/material';
// locales
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

export default function LanguageBar({sx}: {sx?: SxProps}) {
  const theme = useTheme();
  const { allLangs, currentLang, onChangeLang } = useLocales();

  const handleChangeLang = (newLang: string) => {
    onChangeLang(newLang);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {allLangs.map((option) => {
        const isSelected = option.value === currentLang.value;
        
        return (
          <Typography
            key={option.value}
            variant="body2"
            onClick={() => handleChangeLang(option.value)}
            sx={{
              fontWeight: 600,
              cursor: 'pointer',
              position: 'relative',
              textTransform: 'capitalize',
              transition: 'color 0.6s ease',
              color: isSelected ? theme.palette.text.primary : theme.palette.text.disabled,
              '&:hover': {
                color: theme.palette.text.primary,
              },
              ...sx,
            }}
          >
            {option.value}
          </Typography>
        );
      })}
    </Stack>
  );
}
