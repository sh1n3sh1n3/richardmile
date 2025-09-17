import React, { createContext, useContext, ReactNode } from 'react';
import { Friend, CreateFriendRequest, UpdateFriendRequest } from '../@types/friend';
import { useFriends } from '../hooks/useFriends';

interface FriendsContextType {
  friends: Friend[];
  loading: boolean;
  error: string | null;
  fetchFriends: () => Promise<void>;
  createFriend: (friendData: CreateFriendRequest) => Promise<Friend | null>;
  updateFriend: (friendData: UpdateFriendRequest) => Promise<boolean>;
  deleteFriend: (friendId: string) => Promise<boolean>;
  getFriendById: (friendId: string) => Promise<Friend | null>;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

interface FriendsProviderProps {
  children: ReactNode;
}

export const FriendsProvider: React.FC<FriendsProviderProps> = ({ children }) => {
  const friendsData = useFriends();

  return <FriendsContext.Provider value={friendsData}>{children}</FriendsContext.Provider>;
};

export const useFriendsContext = (): FriendsContextType => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error('useFriendsContext must be used within a FriendsProvider');
  }
  return context;
};
