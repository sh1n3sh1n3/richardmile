import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

const GREY = {
  0: '#FFFFFF',
  100: '#FAFAFA',
  200: '#F5F5F5',
  300: '#E0E0E0',
  400: '#BDBDBD',
  500: '#9E9E9E',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

const PRIMARY = {
  lighter: '#FFFFFF',
  light: '#F8F8F8',
  main: '#000000',
  dark: '#000000',
  darker: '#000000',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#F5F5F5',
  light: '#E0E0E0',
  main: '#9E9E9E',
  dark: '#616161',
  darker: '#424242',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#E3F2FD',
  light: '#90CAF9',
  main: '#2196F3',
  dark: '#1976D2',
  darker: '#0D47A1',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#E8F5E8',
  light: '#81C784',
  main: '#4CAF50',
  dark: '#388E3C',
  darker: '#1B5E20',
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#FFF8E1',
  light: '#FFD54F',
  main: '#FF9800',
  dark: '#F57C00',
  darker: '#E65100',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFEBEE',
  light: '#EF5350',
  main: '#F44336',
  dark: '#D32F2F',
  darker: '#B71C1C',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: { black: '#000000', white: '#FFFFFF' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.12),
  action: {
    hover: alpha(GREY[500], 0.04),
    selected: alpha(GREY[500], 0.08),
    disabled: alpha(GREY[500], 0.6),
    disabledBackground: alpha(GREY[500], 0.12),
    focus: alpha(GREY[500], 0.12),
    hoverOpacity: 0.04,
    disabledOpacity: 0.48,
  },
};

export default function palette(themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: '#000000',
      secondary: '#616161',
      disabled: '#BDBDBD',
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[100],
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',// #373737
      disabled: '#757575',
    },
    background: {
      paper: '#000000',
      default: '#000000',
      neutral: alpha(GREY[500], 0.08),
    },
    action: {
      ...COMMON.action,
      active: GREY[400],
    },
  } as const;

  return themeMode === 'light' ? light : dark;
}
