import type { EIScores } from '../hooks/useQuizResults';
import type { BigFiveScores } from '../hooks/useBigFiveResults';

export type AssessmentData = {
  date: string;
  eiScores: EIScores;
  bigFiveScores: BigFiveScores;
};