// @mui
import { IconButton, Stack, SxProps } from '@mui/material';
// locales
import { _socials } from 'src/_mock/arrays';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SocialIcons({ ...other }) {
  return (
    <Stack
      spacing={1}
      direction="row"
      justifyContent={{ xs: 'center', md: 'flex-start' }}
      {...other}
    >
      {_socials.map((social) => (
        <IconButton key={social.name}>
          <Iconify icon={social.icon} />
        </IconButton>
      ))}
    </Stack>
  );
}
