import { useState } from 'react';
import { api } from '../lib/api';
import type { ThematicPath, Milestone } from '../types/thematicPath';

export function useThematicPaths() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPaths = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/api/admin/paths');
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch paths';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPath = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/admin/paths/${id}`);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const createPath = async (pathData: Partial<ThematicPath>) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      
      // Handle background image upload if it's a File
      if (pathData.backgroundImage instanceof File) {
        formData.append('backgroundImage', pathData.backgroundImage);
        delete pathData.backgroundImage;
      }
      
      // Add other path data
      formData.append('data', JSON.stringify(pathData));

      const { data } = await api.post('/api/admin/paths', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePath = async (id: string, pathData: Partial<ThematicPath>) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      
      // Handle background image upload if it's a File
      if (pathData.backgroundImage instanceof File) {
        formData.append('backgroundImage', pathData.backgroundImage);
        delete pathData.backgroundImage;
      }
      
      // Add other path data
      formData.append('data', JSON.stringify(pathData));

      const { data } = await api.put(`/api/admin/paths/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePath = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/api/admin/paths/${id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMilestonePosition = async (
    pathId: string,
    milestoneId: string,
    position: { x: number; y: number }
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.put(
        `/api/admin/paths/${pathId}/milestones/${milestoneId}/position`,
        { position }
      );
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update milestone position';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const addMilestone = async (pathId: string, milestone: Partial<Milestone>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post(
        `/api/admin/paths/${pathId}/milestones`,
        milestone
      );
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add milestone';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeMilestone = async (pathId: string, milestoneId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/api/admin/paths/${pathId}/milestones/${milestoneId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove milestone';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPaths,
    getPath,
    createPath,
    updatePath,
    deletePath,
    updateMilestonePosition,
    addMilestone,
    removeMilestone,
    isLoading,
    error
  };
}