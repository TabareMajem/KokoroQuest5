import type { Language } from '../types/language';

// Currently supported languages
export const languages = {
  en: { name: 'English', nativeName: 'English' },
  ja: { name: 'Japanese', nativeName: '日本語' }
} as const;

import en from './en';
import ja from './ja';

const translations = {
  en,
  ja
};

export default translations;