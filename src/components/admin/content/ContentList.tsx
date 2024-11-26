import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';
import type { Content } from '../../../types/content';

type Props = {
  contents: Content[];
  onEdit: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onPreview: (content: Content) => void;
  onCreate: () => void;
};

export default function ContentList({ 
  contents = [], // Provide default empty array
  onEdit, 
  onDelete, 
  onPreview,
  onCreate 
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const contentTypes = ['activity', 'prompt', 'lesson'];
  const contentCategories = [
    'emotional-awareness',
    'social-skills',
    'mindfulness',
    'self-expression'
  ];

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || content.type === selectedType;
    const matchesCategory = !selectedCategory || content.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Library</h2>
          <p className="text-gray-600">Manage educational content and activities</p>
        </div>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Content
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search content..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${selectedType === type
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {filteredContents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Content Found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || selectedType || selectedCategory
              ? "No content matches your filters"
              : "Get started by creating your first content piece"
            }
          </p>
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Content
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredContents.map((content) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {content.title}
                    </h3>
                    <p className="text-gray-600">{content.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm
                    ${content.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : content.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {content.status}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{content.type}</span>
                    <span>•</span>
                    <span>{content.category}</span>
                    <span>•</span>
                    <span>
                      {new Date(content.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPreview(content)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => onEdit(content)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => onDelete(content.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}