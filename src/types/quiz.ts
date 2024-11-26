import type { Language } from '../locales';

export type QuestionType = 'multiple-choice' | 'likert-scale';

export type Answer = {
  id: string;
  text: string;
  translations: Record<Language, string>;
  image?: {
    url: string;
    alt: Record<Language, string>;
    width?: number;
    height?: number;
  };
  isCorrect?: boolean;
  score: number;
  category: string;
};

export type QuizQuestion = {
  id: string;
  text: string;
  translations: Record<Language, string>;
  image?: {
    url: string;
    alt: Record<Language, string>;
    width?: number;
    height?: number;
  };
  answers: Answer[];
  type: QuestionType;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  timeLimit?: number;
  audio?: {
    url: string;
    language: Language;
  };
  isReversed?: boolean;
  languages: Language[];
};

// ... rest of the types