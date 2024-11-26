import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export type ChildProgress = {
  id: string;
  name: string;
  recentMood: {
    value: number;
    dominantEmotion: string;
    timestamp: string;
  };
  weeklyActivity: {
    journalEntries: number;
    completedActivities: number;
    totalTime: number;
  };
  milestones: {
    completed: number;
    inProgress: number;
    total: number;
  };
  skills: Array<{
    name: string;
    progress: number;
  }>;
};

// Mock data for development
const mockChildren: ChildProgress[] = [
  {
    id: '1',
    name: 'Sarah',
    recentMood: {
      value: 0.8,
      dominantEmotion: 'Happy',
      timestamp: new Date().toISOString()
    },
    weeklyActivity: {
      journalEntries: 5,
      completedActivities: 8,
      totalTime: 180 // minutes
    },
    milestones: {
      completed: 3,
      inProgress: 1,
      total: 5
    },
    skills: [
      { name: 'Emotional Awareness', progress: 75 },
      { name: 'Self Expression', progress: 60 },
      { name: 'Empathy', progress: 85 }
    ]
  },
  {
    id: '2',
    name: 'Alex',
    recentMood: {
      value: 0.7,
      dominantEmotion: 'Content',
      timestamp: new Date().toISOString()
    },
    weeklyActivity: {
      journalEntries: 3,
      completedActivities: 6,
      totalTime: 150 // minutes
    },
    milestones: {
      completed: 2,
      inProgress: 2,
      total: 5
    },
    skills: [
      { name: 'Social Skills', progress: 70 },
      { name: 'Mindfulness', progress: 65 }
    ]
  }
];

export function useParentDashboard() {
  const [children, setChildren] = useState<ChildProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildrenProgress = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (import.meta.env.DEV) {
          setChildren(mockChildren);
        } else {
          const { data } = await api.get('/api/parent/children/progress');
          setChildren(data.data);
        }
      } catch (err) {
        setError('Failed to fetch children\'s progress');
        setChildren(mockChildren); // Fallback to mock data
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildrenProgress();
  }, []);

  const refreshProgress = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setChildren(mockChildren);
      } else {
        const { data } = await api.get('/api/parent/children/progress');
        setChildren(data.data);
      }
    } catch (err) {
      setError('Failed to refresh progress');
      setChildren(mockChildren);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    children,
    isLoading,
    error,
    refreshProgress
  };
}