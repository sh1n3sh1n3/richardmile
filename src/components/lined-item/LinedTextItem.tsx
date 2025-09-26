// next
import NextLink from 'next/link';
// @mui
import { Link } from '@mui/material';
// locales
import { useLocales } from '../../locales';
//
import { StyledItem } from './styles';
import { NavItemProps } from './types';

// ----------------------------------------------------------------------
export default function LinedTextItem({ item, ...other }: NavItemProps) {
  const { translate } = useLocales();

  const { title, path } = item;

  const renderContent = <StyledItem {...other}>{`${translate(title)}`}</StyledItem>;

  const renderItem = () => (
    <Link component={NextLink} href={path} underline="none">
      {renderContent}
    </Link>
  );

  return <> {renderItem()} </>;
}
