import { StackProps, ListItemButtonProps } from '@mui/material';

// ----------------------------------------------------------------------

export type INavItem = {
  item: NavListProps;
};

export type NavItemProps = INavItem & ListItemButtonProps;

export type NavListProps = {
  title: string;
  path: string;
};

export interface NavSectionProps extends StackProps {
  data: {
    title: string;
    path: string;
  }[];
}
