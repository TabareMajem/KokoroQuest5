export type ContentType = 'activity' | 'prompt' | 'lesson';
export type ContentStatus = 'draft' | 'pending' | 'published' | 'archived';
export type ContentCategory = 'emotional-awareness' | 'social-skills' | 'mindfulness' | 'self-expression';

export interface Content {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  category: ContentCategory;
  status: ContentStatus;
  content: string;
  metadata: {
    ageRange?: [number, number];
    duration?: number;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    skills?: string[];
    language?: string;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
  };
  version: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}