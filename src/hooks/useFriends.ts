import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axios';
import {
  Friend,
  CreateFriendRequest,
  UpdateFriendRequest,
  FriendsApiResponse,
} from '../@types/friend';

export const useFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/api/friends');
      setFriends(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch friends');
      console.error('Error fetching friends:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createFriend = useCallback(
    async (friendData: CreateFriendRequest): Promise<Friend | null> => {
      try {
        setError(null);
        const response = await axiosInstance.post('/api/friends', friendData);
        const newFriend = response.data;
        setFriends((prev) => [...prev, newFriend]);
        return newFriend;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create friend');
        console.error('Error creating friend:', err);
        return null;
      }
    },
    []
  );

  const updateFriend = useCallback(async (friendData: UpdateFriendRequest): Promise<boolean> => {
    try {
      setError(null);
      await axiosInstance.put('/api/friends', friendData);

      setFriends((prev) =>
        prev.map((friend) =>
          friend._id === friendData.id || friend.id === friendData.id
            ? { ...friend, ...friendData }
            : friend
        )
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update friend');
      console.error('Error updating friend:', err);
      return false;
    }
  }, []);

  const deleteFriend = useCallback(async (friendId: string): Promise<boolean> => {
    try {
      setError(null);
      await axiosInstance.delete('/api/friends', { data: { id: friendId } });

      setFriends((prev) =>
        prev.filter((friend) => friend._id !== friendId && friend.id !== friendId)
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete friend');
      console.error('Error deleting friend:', err);
      return false;
    }
  }, []);

  const getFriendById = useCallback(async (friendId: string): Promise<Friend | null> => {
    try {
      setError(null);
      const response = await axiosInstance.get(`/api/friends/${friendId}`);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch friend');
      console.error('Error fetching friend:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return {
    friends,
    loading,
    error,
    fetchFriends,
    createFriend,
    updateFriend,
    deleteFriend,
    getFriendById,
  };
};

export const useFriend = (friendId: string) => {
  const [friend, setFriend] = useState<Friend | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFriend = useCallback(async () => {
    if (!friendId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/api/friends/${friendId}`);
      setFriend(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch friend');
      console.error('Error fetching friend:', err);
    } finally {
      setLoading(false);
    }
  }, [friendId]);

  useEffect(() => {
    fetchFriend();
  }, [fetchFriend]);

  return {
    friend,
    loading,
    error,
    fetchFriend,
  };
};
