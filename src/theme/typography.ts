// import { Playfair_Display } from '@next/font/google';

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

export const primaryFont = {
  style: {
    fontFamily: '"Neue Haas Grotesk", sans-serif',
  },
};

// Temporarily disabled Google Fonts to fix the runtime error
// export const secondaryFont = Playfair_Display({
//   weight: ['400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Georgia', 'Times New Roman', 'serif'],
// });

export const secondaryFont = {
  style: {
    fontFamily: 'Georgia, Times New Roman, serif',
  },
};

// ----------------------------------------------------------------------

// LEARN MORE
// https://nextjs.org/docs/basic-features/font-optimization#google-fonts

const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 700,
    lineHeight: 1.1,
    fontSize: pxToRem(56),
    letterSpacing: '-0.02em',
    ...responsiveFontSizes({ sm: 64, md: 72, lg: 80 }),
  },
  h2: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(40),
    letterSpacing: '-0.01em',
    ...responsiveFontSizes({ sm: 44, md: 48, lg: 56 }),
  },
  h3: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.3,
    fontSize: pxToRem(32),
    letterSpacing: '-0.01em',
    ...responsiveFontSizes({ sm: 36, md: 40, lg: 44 }),
  },
  h4: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 500,
    lineHeight: 1.4,
    fontSize: pxToRem(28),
    ...responsiveFontSizes({ sm: 30, md: 32, lg: 36 }),
  },
  h5: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 500,
    lineHeight: 1.4,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 28, lg: 30 }),
  },
  h6: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 500,
    lineHeight: 1.4,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 22, md: 24, lg: 26 }),
  },
  subtitle1: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    letterSpacing: '0.01em',
  },
  body1: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    letterSpacing: '0.01em',
  },
  body2: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: pxToRem(14),
    letterSpacing: '0.01em',
  },
  caption: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: '0.02em',
  },
  overline: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: primaryFont.style.fontFamily,
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    letterSpacing: '0.02em',
    textTransform: 'none',
  },
} as const;

export default typography;
