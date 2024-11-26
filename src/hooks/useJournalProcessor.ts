import { useState } from 'react';
import type { ProcessedJournal } from '../services/types';

export function useJournalProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processEntry = async (text: string): Promise<ProcessedJournal | null> => {
    if (!text.trim()) {
      setError('Please write something in your journal first');
      return null;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Mock successful processing for demo
      const processedJournal: ProcessedJournal = {
        id: Date.now().toString(),
        originalText: text,
        emotions: [
          { name: 'happy', intensity: 0.8, confidence: 0.9 }
        ],
        storyArc: {
          title: 'A Happy Day',
          scenes: [
            {
              description: 'A bright sunny day',
              emotion: 'happy',
              visualPrompt: 'A child playing in a sunny park',
              dialogues: ['What a beautiful day!']
            }
          ],
          theme: 'joy and happiness',
          emotionalJourney: 'positive and uplifting'
        },
        timestamp: new Date().toISOString()
      };

      return processedJournal;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process journal entry');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processEntry,
    isProcessing,
    error
  };
}