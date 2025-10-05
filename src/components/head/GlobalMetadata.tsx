import Head from 'next/head';
import { useLogo } from '../../contexts/LogoContext';

export default function GlobalMetadata() {
  const { logoConfig, isLoaded, isBackendLoaded } = useLogo();

  // Don't render until both localStorage and backend data are loaded
  if (!isLoaded || !isBackendLoaded) {
    return null;
  }

  const brandName = logoConfig.text || '';
  const defaultDescription = `Discover ${brandName} - Premium luxury brand with exceptional quality and craftsmanship`;

  return (
    <Head>
      {/* Global meta tags that use dynamic brand name */}
      <meta name="application-name" content={brandName} />
      <meta name="apple-mobile-web-app-title" content={brandName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Default description if no page-specific description is provided */}
      <meta name="description" content={defaultDescription} />

      {/* Open Graph defaults */}
      <meta property="og:site_name" content={brandName} />
      <meta property="og:type" content="website" />

      {/* Twitter defaults */}
      <meta name="twitter:site" content={`@${brandName.replace(/\s+/g, '').toLowerCase()}`} />

      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}
