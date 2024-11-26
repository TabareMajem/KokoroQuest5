import { useState } from 'react';
import { api } from '../lib/api';
import type { Content } from '../types/content';

export function useContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContent = async (contentData: Partial<Content>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/content', contentData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (contentId: string, contentData: Partial<Content>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.put(`/api/content/${contentId}`, contentData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContent = async (contentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/api/content/${contentId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getContent = async (contentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/content/${contentId}`);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const listContent = async (params?: {
    type?: string;
    category?: string;
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/api/content', { params });
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to list content';
      setError(message);
      return []; // Return empty array instead of throwing
    } finally {
      setIsLoading(false);
    }
  };

  const publishContent = async (contentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post(`/api/content/${contentId}/publish`);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to publish content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleContent = async (contentId: string, publishAt: Date) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post(`/api/content/${contentId}/schedule`, {
        publishAt
      });
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to schedule content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createContent,
    updateContent,
    deleteContent,
    getContent,
    listContent,
    publishContent,
    scheduleContent,
    isLoading,
    error
  };
}