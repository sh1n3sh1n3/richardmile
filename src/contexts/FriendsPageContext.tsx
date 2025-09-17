import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Friend, FriendsHeroContent, FriendsPageDataResponse } from '../@types/friend';

interface FriendsPageContextType {
  friends: Friend[];
  heroContent: FriendsHeroContent | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const FriendsPageContext = createContext<FriendsPageContextType | undefined>(undefined);

interface FriendsPageProviderProps {
  children: ReactNode;
}

export function FriendsPageProvider({ children }: FriendsPageProviderProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [heroContent, setHeroContent] = useState<FriendsHeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/friends/page-data');

      if (!response.ok) {
        throw new Error(`Failed to fetch page data: ${response.status}`);
      }

      const data: FriendsPageDataResponse = await response.json();
      setFriends(data.friends);
      setHeroContent(data.heroContent);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch page data';
      setError(errorMessage);
      console.error('Error fetching friends page data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchPageData();
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const value: FriendsPageContextType = {
    friends,
    heroContent,
    loading,
    error,
    refreshData,
  };

  return <FriendsPageContext.Provider value={value}>{children}</FriendsPageContext.Provider>;
}

export function useFriendsPageContext(): FriendsPageContextType {
  const context = useContext(FriendsPageContext);
  if (context === undefined) {
    throw new Error('useFriendsPageContext must be used within a FriendsPageProvider');
  }
  return context;
}
