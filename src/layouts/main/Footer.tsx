// next
import { useRouter } from 'next/router';
// @mui
import { Box, Grid, Stack, Divider, Container, Typography } from '@mui/material';
// _mock
import { NavItem } from 'src/components/nav-section';
import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo';
import LanguageBar from '../../components/language-bar';
import SocialIcons from '../../components/social-icons';
//
import navConfig, {
  subItemConfig1,
  subItemConfig2,
  subItemConfig3,
  subItemConfig4,
} from './nav/config-navigation';

// ----------------------------------------------------------------------

export default function Footer() {
  const { pathname } = useRouter();

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
          {`Richard Mille • ${pathname.split('/')[1] || 'Index'}`}
        </Typography>

        <Divider sx={{ my: 3 }} />

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
          <Grid item xs={12} md={4}>
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={{ xs: 0, md: 1 }} sx={{ textAlign: 'left' }}>
              {navConfig.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  sx={{
                    typography: 'h6',
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
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

            <Divider sx={{ my: 2 }} />

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
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, textAlign: 'left' }}>
                  Follow us
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <SocialIcons />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

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
          </Grid>
        </Grid>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            pb: { xs: 2, md: 5 },
            mt: { xs: 5, md: 10 },
            color: 'text.disabled',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="body1" component="div">
            © Richard Mille 2025
          </Typography>

          <LanguageBar />
        </Stack>
      </Container>
    </Box>
  );

  return mainFooter;
}
