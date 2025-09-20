import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FriendsHeroContent } from '../@types/friend';

interface FriendsHeroContextType {
  heroContent: FriendsHeroContent | null;
  loading: boolean;
  error: string | null;
  refreshHeroContent: () => Promise<void>;
}

const FriendsHeroContext = createContext<FriendsHeroContextType | undefined>(undefined);

interface FriendsHeroProviderProps {
  children: ReactNode;
}

export function FriendsHeroProvider({ children }: FriendsHeroProviderProps) {
  const [heroContent, setHeroContent] = useState<FriendsHeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/cms/friends-hero');

      if (!response.ok) {
        // Try to get more specific error information
        let errorMessage = `Failed to fetch hero content: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
          // If we can't parse the error response, use the status-based message
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setHeroContent(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch hero content';
      setError(errorMessage);
      console.error('Error fetching hero content:', err);

      // Set default content if fetch fails
      setHeroContent({
        video: 'https://video.richardmille.com/desktop/1290861657.mp4',
        title: 'Friends & partners',
        description:
          "Discover the brand through its partners. Alpine Creations's friends are varied and contrasting. Meet them.",
        isActive: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshHeroContent = async () => {
    await fetchHeroContent();
  };

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const value: FriendsHeroContextType = {
    heroContent,
    loading,
    error,
    refreshHeroContent,
  };

  return <FriendsHeroContext.Provider value={value}>{children}</FriendsHeroContext.Provider>;
}

export function useFriendsHeroContext(): FriendsHeroContextType {
  const context = useContext(FriendsHeroContext);
  if (context === undefined) {
    throw new Error('useFriendsHeroContext must be used within a FriendsHeroProvider');
  }
  return context;
}
