import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2, Lock, CheckCircle2 } from 'lucide-react';
import type { ThematicPath, Milestone, Position } from '../../../types/thematicPath';

type Props = {
  path?: ThematicPath | null;
  onSave: (pathData: Partial<ThematicPath>) => Promise<void>;
  onCancel: () => void;
};

export default function PathEditor({ path, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: path?.name || '',
    theme: path?.theme || '',
    backgroundImage: path?.backgroundImage || '',
    milestones: path?.milestones || []
  });

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, backgroundImage: imageUrl }));
  };

  const handleAddMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      position: { x: 50, y: 50 },
      activityId: '',
      status: 'locked'
    };

    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }));
  };

  const handleMilestoneMouseDown = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedMilestone || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp values between 0 and 100
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m =>
        m.id === selectedMilestone.id
          ? { ...m, position: { x: clampedX, y: clampedY } }
          : m
      )
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.theme.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save path');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {path ? 'Edit Thematic Path' : 'Create Thematic Path'}
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
          className="p-4 bg-red-50 text-red-600 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Path Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <input
            type="text"
            value={formData.theme}
            onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>
      </div>

      {/* Background Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      {/* Path Editor Canvas */}
      <div 
        ref={canvasRef}
        className="relative w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
        onMouseMove={handleMouseMove}
      >
        {formData.backgroundImage && (
          <img
            src={formData.backgroundImage}
            alt="Path background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Milestones */}
        {formData.milestones.map((milestone) => (
          <div
            key={milestone.id}
            style={{
              position: 'absolute',
              left: `${milestone.position.x}%`,
              top: `${milestone.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center
              cursor-move transition-all ${
                selectedMilestone?.id === milestone.id 
                  ? 'ring-2 ring-purple-500 ring-offset-2'
                  : ''
              } ${
                milestone.status === 'completed'
                  ? 'bg-green-100 text-green-600'
                  : milestone.status === 'unlocked'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
              }`}
            onMouseDown={() => handleMilestoneMouseDown(milestone)}
          >
            {milestone.status === 'completed' ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : milestone.status === 'locked' ? (
              <Lock className="w-6 h-6" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-current" />
            )}
          </div>
        ))}
      </div>

      {/* Milestone Controls */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddMilestone}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Milestone
        </button>

        {selectedMilestone && (
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                milestones: prev.milestones.filter(m => m.id !== selectedMilestone.id)
              }));
              setSelectedMilestone(null);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg
              hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Remove Selected
          </button>
        )}
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
            hover:bg-purple-700 transition-colors disabled:opacity-50
            disabled:cursor-not-allowed flex items-center gap-2"
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
              Save Path
            </>
          )}
        </button>
      </div>
    </form>
  );
}