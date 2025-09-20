import { useEffect } from 'react';
import { useLogo } from '../contexts/LogoContext';

// Hook to sync logo configuration with backend
export function useLogoConfig() {
  const { logoConfig, updateLogoConfig, isLoaded, isBackendLoaded, setBackendLoaded } = useLogo();

  // Load logo configuration from backend on mount (only if not already loaded)
  useEffect(() => {
    if (!isLoaded || isBackendLoaded) return; // Wait for initial context load and avoid duplicate calls

    const loadLogoConfig = async () => {
      try {
        const response = await fetch('/api/cms/logo-config');
        if (response.ok) {
          const backendConfig = await response.json();
          updateLogoConfig(backendConfig);
        }
      } catch (error) {
        console.error('Failed to load logo config from backend:', error);
        // Continue with localStorage/default values
      } finally {
        // Mark backend as loaded regardless of success/failure
        setBackendLoaded(true);
      }
    };

    loadLogoConfig();
  }, [updateLogoConfig, isLoaded, isBackendLoaded, setBackendLoaded]);

  // Save logo configuration to backend when it changes
  const saveToBackend = async (config: typeof logoConfig) => {
    try {
      const response = await fetch('/api/cms/logo-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.details || errorData.error || 'Unknown error';
        console.error('Backend save failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorMessage,
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to save logo config to backend:', error);
      return false;
    }
  };

  return {
    saveToBackend,
  };
}
