// @mui
import { Divider, Grid, Stack } from '@mui/material';
// layouts
import {
  subItemConfig1,
  subItemConfig2,
  subItemConfig3,
  subItemConfig4,
} from 'src/layouts/main/nav/config-navigation';
// components
import LanguageBar from 'src/components/language-bar';
//
import NavItem from './NavItem';
import { NavSectionProps } from './types';
import SocialIcons from 'src/components/social-icons/SocialIcons';

// ----------------------------------------------------------------------

export default function NavSection({ data, sx, ...other }: NavSectionProps) {
  return (
    <Stack sx={sx} {...other}>
      <Stack spacing={{ xs: 0, md: 1 }}>
        {data.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            sx={{
              typography: 'h4',
              fontWeight: 600,
            }}
          />
        ))}
      </Stack>

      <Divider sx={{ my: { xs: 1.5, md: 5 } }} />

      <Grid
        container
        justifyContent={{
          xs: 'center',
          md: 'space-between',
        }}
        sx={{
          textAlign: {
            xs: 'center',
            md: 'left',
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <Stack spacing={{ xs: 0, md: 1 }} sx={{ textAlign: 'left' }}>
            {subItemConfig1.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                sx={{
                  typography: 'subtitle1',
                  fontWeight: 400,
                }}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={{ xs: 0, md: 1 }} sx={{ textAlign: 'left' }}>
            {subItemConfig2.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                sx={{
                  typography: 'subtitle1',
                  fontWeight: 400,
                }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: { xs: 1.5, md: 5 } }} />

      <Grid
        container
        justifyContent={{
          xs: 'center',
          md: 'space-between',
        }}
        sx={{
          textAlign: {
            xs: 'center',
            md: 'left',
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <Stack spacing={{ xs: 0, md: 1 }} sx={{ textAlign: 'left' }}>
            {subItemConfig3.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                sx={{
                  typography: 'subtitle2',
                  fontWeight: 400,
                }}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={{ xs: 0, md: 1 }} sx={{ textAlign: 'left' }}>
            {subItemConfig4.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                sx={{
                  typography: 'subtitle2',
                  fontWeight: 400,
                }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <SocialIcons />
        <LanguageBar sx={{ textTransform: 'uppercase' }} />
      </Stack>
    </Stack>
  );
}
