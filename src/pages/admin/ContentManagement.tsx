import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ContentList from '../../components/admin/content/ContentList';
import ContentEditor from '../../components/admin/content/ContentEditor';
import ContentPreview from '../../components/admin/content/ContentPreview';
import { useContent } from '../../hooks/useContent';
import type { Content } from '../../types/content';

export default function ContentManagement() {
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const { 
    listContent, 
    createContent, 
    updateContent, 
    deleteContent,
    isLoading,
    error 
  } = useContent();

  useEffect(() => {
    const fetchContents = async () => {
      const result = await listContent();
      setContents(result || []); // Handle empty result
    };

    fetchContents();
  }, []);

  const handleCreateContent = () => {
    setSelectedContent(null);
    setIsEditing(true);
  };

  const handleEditContent = (content: Content) => {
    setSelectedContent(content);
    setIsEditing(true);
  };

  const handlePreviewContent = (content: Content) => {
    setSelectedContent(content);
    setIsPreviewing(true);
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    
    try {
      await deleteContent(contentId);
      setContents(prev => prev.filter(c => c.id !== contentId));
    } catch (err) {
      console.error('Failed to delete content:', err);
    }
  };

  const handleSaveContent = async (contentData: Partial<Content>) => {
    try {
      if (selectedContent) {
        const updatedContent = await updateContent(selectedContent.id, contentData);
        setContents(prev => prev.map(c => 
          c.id === selectedContent.id ? updatedContent : c
        ));
      } else {
        const newContent = await createContent(contentData);
        setContents(prev => [...prev, newContent]);
      }
      setIsEditing(false);
      setSelectedContent(null);
    } catch (err) {
      throw err; // Re-throw to be handled by the editor component
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {isEditing ? (
          <ContentEditor
            content={selectedContent}
            onSave={handleSaveContent}
            onCancel={() => {
              setIsEditing(false);
              setSelectedContent(null);
            }}
          />
        ) : (
          <ContentList
            contents={contents}
            onEdit={handleEditContent}
            onDelete={handleDeleteContent}
            onPreview={handlePreviewContent}
            onCreate={handleCreateContent}
          />
        )}

        {/* Preview Modal */}
        {selectedContent && (
          <ContentPreview
            content={selectedContent}
            isOpen={isPreviewing}
            onClose={() => {
              setIsPreviewing(false);
              setSelectedContent(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}