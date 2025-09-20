import { useMemo } from 'react';
import { useLogo } from '../contexts/LogoContext';

interface PageMetadata {
  title: string;
  description?: string;
}

export function usePageMetadata(pageTitle: string, description?: string): PageMetadata {
  const { logoConfig, isBackendLoaded } = useLogo();

  const metadata = useMemo(() => {
    // Only use backend data if it's loaded, otherwise return empty to avoid showing default
    if (!isBackendLoaded) {
      return {
        title: '',
        description: '',
      };
    }

    // After backend is loaded, use the backend data or fall back to default
    const brandName = logoConfig.text || 'Alpine Creations';
    const fullTitle = pageTitle ? `${pageTitle} | ${brandName}` : brandName;

    return {
      title: fullTitle,
      description: description || `Discover ${brandName} - ${pageTitle || 'Premium luxury brand'}`,
    };
  }, [pageTitle, description, logoConfig.text, isBackendLoaded]);

  return metadata;
}

// Helper function to generate common page titles
export function generatePageTitle(pageName: string, isAdmin = false): string {
  if (isAdmin) {
    return `${pageName} Admin`;
  }
  return pageName;
}
