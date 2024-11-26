import { useState } from 'react';
import { api } from '../lib/api';
import type { User } from '../types/user';

export function useUserManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async (params?: { 
    role?: string; 
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/api/users', { params });
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
      return []; // Return empty array instead of throwing
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/users', userData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.put(`/api/users/${userId}`, userData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/api/users/${userId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    isLoading,
    error
  };
}