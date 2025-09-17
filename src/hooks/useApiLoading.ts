import { useState, useCallback } from 'react';
import { useLoading } from '../contexts/LoadingContext';

interface UseApiLoadingOptions {
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  showGlobalLoading?: boolean;
}

export function useApiLoading(options: UseApiLoadingOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setLoading: setGlobalLoading, setLoadingMessage, clearLoading } = useLoading();

  const {
    loadingMessage = 'Loading...',
    successMessage = 'Operation completed successfully',
    errorMessage = 'An error occurred',
    showGlobalLoading = true,
  } = options;

  const execute = useCallback(
    async <T>(
      apiCall: () => Promise<T>,
      customMessages?: {
        loading?: string;
        success?: string;
        error?: string;
      }
    ): Promise<T | null> => {
      try {
        setIsLoading(true);
        setError(null);

        if (showGlobalLoading) {
          setGlobalLoading(true, customMessages?.loading || loadingMessage, 'api');
        }

        const result = await apiCall();

        if (showGlobalLoading) {
          setLoadingMessage(customMessages?.success || successMessage);
          setTimeout(() => clearLoading(), 500);
        }

        return result;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : errorMessage;
        setError(errorMsg);

        if (showGlobalLoading) {
          setLoadingMessage(customMessages?.error || errorMsg);
          setTimeout(() => clearLoading(), 2000);
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [
      loadingMessage,
      successMessage,
      errorMessage,
      showGlobalLoading,
      setGlobalLoading,
      setLoadingMessage,
      clearLoading,
    ]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    execute,
    clearError,
  };
}
