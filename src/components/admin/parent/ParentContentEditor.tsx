import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2, Upload, Globe, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import type { ParentContent, ActivityStep } from '../../../types/parentContent';
import type { Language } from '../../../types/language';

type Props = {
  content?: ParentContent | null;
  onSave: (contentData: Partial<ParentContent>) => Promise<void>;
  onCancel: () => void;
};

export default function ParentContentEditor({ content, onSave, onCancel }: Props) {
  const { languages } = useLanguage();
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(
    content?.languages || ['en']
  );

  const [formData, setFormData] = useState<Partial<ParentContent>>({
    title: content?.title || '',
    description: content?.description || '',
    type: content?.type || 'activity',
    duration: content?.duration || '',
    emotionalFocus: content?.emotionalFocus || [],
    materials: content?.materials || [],
    steps: content?.steps || [{ text: '' }],
    targetAge: content?.targetAge || [5, 12],
    status: content?.status || 'draft',
    languages: content?.languages || ['en'],
    translations: content?.translations || {
      en: {
        title: '',
        description: '',
        materials: [],
        steps: [{ text: '' }]
      }
    }
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLanguageToggle = (lang: Language) => {
    setSelectedLanguages(prev => {
      if (prev.includes(lang)) {
        return prev.filter(l => l !== lang);
      }
      return [...prev, lang];
    });

    // Initialize translations for new language if needed
    if (!formData.translations?.[lang]) {
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [lang]: {
            title: '',
            description: '',
            materials: [],
            steps: prev.steps?.map(step => ({ text: '' })) || []
          }
        }
      }));
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>, 
    stepIndex?: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, upload to cloud storage and get URL
    const imageUrl = URL.createObjectURL(file);

    if (typeof stepIndex === 'number') {
      setFormData(prev => ({
        ...prev,
        steps: prev.steps?.map((step, i) => 
          i === stepIndex ? {
            ...step,
            image: {
              url: imageUrl,
              alt: Object.fromEntries(
                selectedLanguages.map(lang => [
                  lang, 
                  `Step ${stepIndex + 1} image`
                ])
              )
            }
          } : step
        )
      }));
    }
  };

  const validateForm = () => {
    if (!formData.title?.trim()) {
      setError('Title is required');
      return false;
    }

    if (!formData.description?.trim()) {
      setError('Description is required');
      return false;
    }

    if (!formData.steps?.length) {
      setError('At least one step is required');
      return false;
    }

    // Validate translations
    for (const lang of selectedLanguages) {
      const translation = formData.translations?.[lang];
      if (!translation?.title?.trim()) {
        setError(`Title in ${languages[lang].name} is required`);
        return false;
      }
      if (!translation?.description?.trim()) {
        setError(`Description in ${languages[lang].name} is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave({
        ...formData,
        languages: selectedLanguages
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {content ? 'Edit Activity' : 'Create Activity'}
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

      {/* Language Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Languages
        </label>
        <div className="flex gap-2">
          {Object.entries(languages).map(([code, { name, nativeName }]) => (
            <button
              key={code}
              type="button"
              onClick={() => handleLanguageToggle(code as Language)}
              className={`px-3 py-1 rounded-full flex items-center gap-2
                transition-colors ${
                selectedLanguages.includes(code as Language)
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{nativeName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          {selectedLanguages.map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLanguage(lang)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeLanguage === lang
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {languages[lang].name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Fields */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.translations?.[activeLanguage]?.title || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              translations: {
                ...prev.translations,
                [activeLanguage]: {
                  ...prev.translations?.[activeLanguage],
                  title: e.target.value
                }
              }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.translations?.[activeLanguage]?.description || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              translations: {
                ...prev.translations,
                [activeLanguage]: {
                  ...prev.translations?.[activeLanguage],
                  description: e.target.value
                }
              }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400
              resize-none"
            rows={3}
            required
          />
        </div>

        {/* Steps */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Steps
          </label>
          <div className="space-y-4">
            {formData.steps?.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-1 space-y-4">
                  <textarea
                    value={formData.translations?.[activeLanguage]?.steps[index]?.text || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        [activeLanguage]: {
                          ...prev.translations?.[activeLanguage],
                          steps: prev.translations?.[activeLanguage]?.steps.map(
                            (s, i) => i === index ? { ...s, text: e.target.value } : s
                          ) || []
                        }
                      }
                    }))}
                    placeholder={`Step ${index + 1}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                      resize-none"
                    rows={2}
                  />

                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="hidden"
                      id={`stepImage_${index}`}
                    />
                    <label
                      htmlFor={`stepImage_${index}`}
                      className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg
                        hover:bg-purple-100 transition-colors cursor-pointer
                        flex items-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Image
                    </label>
                    {step.image && (
                      <div className="relative w-24 h-24">
                        <img
                          src={step.image.url}
                          alt={step.image.alt[activeLanguage]}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            steps: prev.steps?.map((s, i) =>
                              i === index ? { ...s, image: undefined } : s
                            )
                          }))}
                          className="absolute -top-2 -right-2 p-1 bg-red-100 
                            rounded-full text-red-600 hover:bg-red-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    steps: prev.steps?.filter((_, i) => i !== index)
                  }))}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg
                    transition-colors h-fit"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                steps: [...(prev.steps || []), { text: '' }]
              }))}
              className="w-full py-2 px-4 bg-purple-50 text-purple-600 rounded-lg
                hover:bg-purple-100 transition-colors flex items-center gap-2
                justify-center"
            >
              <Plus className="w-5 h-5" />
              Add Step
            </button>
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
              Save Activity
            </>
          )}
        </button>
      </div>
    </form>
  );
}