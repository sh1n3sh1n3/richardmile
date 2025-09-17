import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
  progress?: number;
  type?: 'page' | 'component' | 'api' | 'upload' | 'video';
}

interface LoadingContextType {
  loadingState: LoadingState;
  setLoading: (loading: boolean, message?: string, type?: LoadingState['type']) => void;
  setProgress: (progress: number) => void;
  setLoadingMessage: (message: string) => void;
  clearLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    loadingMessage: '',
    progress: 0,
    type: 'page',
  });

  const setLoading = useCallback(
    (isLoading: boolean, message?: string, type: LoadingState['type'] = 'page') => {
      setLoadingState((prev) => ({
        ...prev,
        isLoading,
        loadingMessage: message || '',
        type,
        progress: isLoading ? prev.progress : 0,
      }));
    },
    []
  );

  const setProgress = useCallback((progress: number) => {
    setLoadingState((prev) => ({
      ...prev,
      progress: Math.max(0, Math.min(100, progress)),
    }));
  }, []);

  const setLoadingMessage = useCallback((message: string) => {
    setLoadingState((prev) => ({
      ...prev,
      loadingMessage: message,
    }));
  }, []);

  const clearLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      loadingMessage: '',
      progress: 0,
      type: 'page',
    });
  }, []);

  const value: LoadingContextType = {
    loadingState,
    setLoading,
    setProgress,
    setLoadingMessage,
    clearLoading,
  };

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
