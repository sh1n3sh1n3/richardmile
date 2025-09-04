// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
// import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

// const icon = (name: string) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

// const ICONS = {
//   blog: icon('ic_blog'),
//   cart: icon('ic_cart'),
//   chat: icon('ic_chat'),
//   mail: icon('ic_mail'),
//   user: icon('ic_user'),
//   file: icon('ic_file'),
//   lock: icon('ic_lock'),
//   label: icon('ic_label'),
//   blank: icon('ic_blank'),
//   kanban: icon('ic_kanban'),
//   folder: icon('ic_folder'),
//   banking: icon('ic_banking'),
//   booking: icon('ic_booking'),
//   invoice: icon('ic_invoice'),
//   calendar: icon('ic_calendar'),
//   disabled: icon('ic_disabled'),
//   external: icon('ic_external'),
//   menuItem: icon('ic_menu_item'),
//   ecommerce: icon('ic_ecommerce'),
//   analytics: icon('ic_analytics'),
//   dashboard: icon('ic_dashboard'),
// };

const navConfig = [
  {
    title: 'THE BRAND',
    path: PATH_PAGE.brand.root,
  },
  {
    title: 'SAVOIR-FAIRE',
    path: '#',
  },
  {
    title: 'COLLECTIONS',
    path: PATH_PAGE.collections,
  },
  {
    title: 'FRIENDS & PARTNERS',
    path: PATH_PAGE.friends,
  },
  {
    title: 'STORE LOCATOR',
    path: '#',
  },
  {
    title: 'EVENTS',
    path: '#',
  },
];

const subItemConfig1 = [
  {
    title: 'Historical models',
    path: '#',
  },
  {
    title: 'Pre-Owned',
    path: '#',
  },
];

const subItemConfig2 = [
  {
    title: 'Servicing',
    path: PATH_PAGE.servicing,
  },
  {
    title: 'Book an appointment',
    path: '#',
  },
];

const subItemConfig3 = [
  {
    title: 'Contact',
    path: PATH_PAGE.contact,
  },
  {
    title: 'Accessibility',
    path: '#',
  },
  {
    title: 'Most viewed pages',
    path: '#',
  },
];

const subItemConfig4 = [
  {
    title: 'Legals',
    path: '#',
  },
  {
    title: 'Sitemap',
    path: '#',
  },
  {
    title: 'Credits',
    path: '#',
  },
];

export { subItemConfig1, subItemConfig2, subItemConfig3, subItemConfig4 };
export default navConfig;
