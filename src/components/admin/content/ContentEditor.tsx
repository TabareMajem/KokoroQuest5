import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, AlertCircle } from 'lucide-react';
import AIContentGenerator from './AIContentGenerator';
import type { Content } from '../../../types/content';

type Props = {
  content?: Content | null;
  onSave: (contentData: Partial<Content>) => Promise<void>;
  onCancel: () => void;
};

export default function ContentEditor({ content, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    title: content?.title || '',
    description: content?.description || '',
    type: content?.type || 'activity',
    category: content?.category || 'emotional-awareness',
    content: content?.content || '',
    metadata: content?.metadata || {
      ageRange: [5, 12],
      duration: 30,
      difficulty: 'beginner',
      skills: [],
      language: 'en'
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {content ? 'Edit Content' : 'Create New Content'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                resize-none"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              >
                <option value="activity">Activity</option>
                <option value="prompt">Prompt</option>
                <option value="lesson">Lesson</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              >
                <option value="emotional-awareness">Emotional Awareness</option>
                <option value="social-skills">Social Skills</option>
                <option value="mindfulness">Mindfulness</option>
                <option value="self-expression">Self Expression</option>
              </select>
            </div>
          </div>

          {/* AI Content Generator */}
          <AIContentGenerator 
            onContentGenerated={(generatedContent) => {
              setFormData(prev => ({
                ...prev,
                content: generatedContent
              }));
            }}
          />

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                resize-none"
              rows={10}
              required
            />
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.metadata.ageRange[0]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      metadata: {
                        ...prev.metadata,
                        ageRange: [parseInt(e.target.value), prev.metadata.ageRange[1]]
                      }
                    }))}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    min="0"
                    max="18"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={formData.metadata.ageRange[1]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      metadata: {
                        ...prev.metadata,
                        ageRange: [prev.metadata.ageRange[0], parseInt(e.target.value)]
                      }
                    }))}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    min="0"
                    max="18"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.metadata.duration}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metadata: {
                      ...prev.metadata,
                      duration: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  min="5"
                  max="120"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={formData.metadata.difficulty}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  metadata: {
                    ...prev.metadata,
                    difficulty: e.target.value as any
                  }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 
              rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors flex items-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent 
                  rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Content
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}