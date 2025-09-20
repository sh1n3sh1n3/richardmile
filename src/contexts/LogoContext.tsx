import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Logo configuration interface
export interface LogoConfig {
  text: string;
  imageUrl: string;
}

// Logo context interface
interface LogoContextType {
  logoConfig: LogoConfig;
  updateLogoConfig: (config: Partial<LogoConfig>) => void;
  isLoaded: boolean;
  isBackendLoaded: boolean;
  setBackendLoaded: (loaded: boolean) => void;
}

// Create the context
const LogoContext = createContext<LogoContextType | undefined>(undefined);

// Default logo configuration
const defaultLogoConfig: LogoConfig = {
  text: 'Alpine Creations',
  imageUrl: '/logo/logo.svg',
};

// Logo provider component
interface LogoProviderProps {
  children: ReactNode;
}

export function LogoProvider({ children }: LogoProviderProps) {
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(defaultLogoConfig);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBackendLoaded, setIsBackendLoaded] = useState(false);

  // Load logo configuration from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('logoConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setLogoConfig({ ...defaultLogoConfig, ...parsed });
      } catch (error) {
        console.error('Failed to parse saved logo config:', error);
      }
    }
    // Mark as loaded after attempting to load from localStorage
    setIsLoaded(true);
  }, []);

  // Save logo configuration to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('logoConfig', JSON.stringify(logoConfig));
  }, [logoConfig]);

  // Update logo configuration
  const updateLogoConfig = (newConfig: Partial<LogoConfig>) => {
    setLogoConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const value: LogoContextType = {
    logoConfig,
    updateLogoConfig,
    isLoaded,
    isBackendLoaded,
    setBackendLoaded: setIsBackendLoaded,
  };

  return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
}

// Custom hook to use the logo context
export function useLogo(): LogoContextType {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
}

// Export the context for advanced usage
export { LogoContext };
