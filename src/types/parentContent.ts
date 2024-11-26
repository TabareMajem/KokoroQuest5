import type { Language } from '../locales';

export type ParentContentType = 'activity' | 'discussion' | 'exercise';

export interface ParentContent {
  id: string;
  title: string;
  description: string;
  type: ParentContentType;
  duration: string;
  emotionalFocus: string[];
  materials?: string[];
  steps: ActivityStep[];
  targetAge?: [number, number];
  status: 'draft' | 'published' | 'archived';
  languages: Language[];
  translations: Record<Language, {
    title: string;
    description: string;
    materials?: string[];
    steps: ActivityStep[];
  }>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ActivityStep {
  text: string;
  image?: {
    url: string;
    alt: Record<Language, string>;
    width?: number;
    height?: number;
  };
}

export interface ParentContentTemplate extends Omit<ParentContent, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> {
  variables?: string[];
}