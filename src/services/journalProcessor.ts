import { v4 as uuidv4 } from 'uuid';
import { analyzeEmotions, generateStoryArc, generateImagePrompt } from './openai';
import type { ProcessedJournal } from './types';

export async function processJournalEntry(text: string): Promise<ProcessedJournal> {
  try {
    // Step 1: Analyze emotions in the text
    const emotions = await analyzeEmotions(text);

    // Step 2: Generate story arc based on emotions
    const storyArc = await generateStoryArc(text, emotions);

    // Step 3: Enhance each scene with detailed image prompts
    const enhancedStoryArc = {
      ...storyArc,
      scenes: await Promise.all(storyArc.scenes.map(async (scene) => ({
        ...scene,
        visualPrompt: await generateImagePrompt(scene.description, scene.emotion)
      })))
    };

    // Step 4: Compile the processed journal entry
    const processedJournal: ProcessedJournal = {
      id: uuidv4(),
      originalText: text,
      emotions,
      storyArc: enhancedStoryArc,
      timestamp: new Date().toISOString()
    };

    return processedJournal;
  } catch (error) {
    console.error('Error processing journal entry:', error);
    throw new Error('Failed to process journal entry');
  }
}