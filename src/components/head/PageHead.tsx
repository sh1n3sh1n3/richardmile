import Head from 'next/head';
import { usePageMetadata } from '../../hooks/usePageMetadata';

interface PageHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  canonical?: string;
}

export default function PageHead({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  canonical,
}: PageHeadProps) {
  const { title: dynamicTitle, description: dynamicDescription } = usePageMetadata(
    title,
    description
  );

  return (
    <Head>
      <title>{dynamicTitle}</title>

      {/* Basic Meta Tags */}
      <meta name="description" content={dynamicDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || dynamicTitle} />
      <meta property="og:description" content={ogDescription || dynamicDescription} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || dynamicTitle} />
      <meta name="twitter:description" content={ogDescription || dynamicDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="theme-color" content="#000000" />
    </Head>
  );
}
