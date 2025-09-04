// @mui
// import { useTheme } from '@mui/material/styles';
// locales
// import { useLocales } from 'src/locales';
// hooks
// import useResponsive from '../../hooks/useResponsive';
//
import { StyledHero, StyledHeroImage } from '../styls';

// ----------------------------------------------------------------------

export default function BrandConceptHero() {
  // const theme = useTheme();
  // const { translate } = useLocales();
  // const isDesktop = useResponsive('up', 'md');

  return (
    <StyledHero>
      <StyledHeroImage url="https://media.richardmille.com/wp-content/uploads/2021/09/07163746/rm_backgroundCMS.jpg?dpr=1&width=2000" />
    </StyledHero>
  );
}
