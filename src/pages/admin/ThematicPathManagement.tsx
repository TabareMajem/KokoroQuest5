import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PathList from '../../components/admin/path/PathList';
import PathEditor from '../../components/admin/path/PathEditor';
import { useThematicPaths } from '../../hooks/useThematicPaths';
import type { ThematicPath } from '../../types/thematicPath';

export default function ThematicPathManagement() {
  const [paths, setPaths] = useState<ThematicPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<ThematicPath | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { 
    getPaths, 
    createPath, 
    updatePath, 
    deletePath,
    isLoading,
    error 
  } = useThematicPaths();

  useEffect(() => {
    const fetchPaths = async () => {
      const result = await getPaths();
      setPaths(result);
    };

    fetchPaths();
  }, []);

  const handleCreatePath = () => {
    setSelectedPath(null);
    setIsEditing(true);
  };

  const handleEditPath = (path: ThematicPath) => {
    setSelectedPath(path);
    setIsEditing(true);
  };

  const handleDeletePath = async (pathId: string) => {
    if (!window.confirm('Are you sure you want to delete this path?')) return;
    
    try {
      await deletePath(pathId);
      setPaths(prev => prev.filter(p => p.id !== pathId));
    } catch (err) {
      console.error('Failed to delete path:', err);
    }
  };

  const handleSavePath = async (pathData: Partial<ThematicPath>) => {
    try {
      if (selectedPath) {
        const updatedPath = await updatePath(selectedPath.id, pathData);
        setPaths(prev => prev.map(p => 
          p.id === selectedPath.id ? updatedPath : p
        ));
      } else {
        const newPath = await createPath(pathData);
        setPaths(prev => [...prev, newPath]);
      }
      setIsEditing(false);
      setSelectedPath(null);
    } catch (err) {
      console.error('Failed to save path:', err);
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
          <PathEditor
            path={selectedPath}
            onSave={handleSavePath}
            onCancel={() => {
              setIsEditing(false);
              setSelectedPath(null);
            }}
          />
        ) : (
          <PathList
            paths={paths}
            onEdit={handleEditPath}
            onDelete={handleDeletePath}
            onCreate={handleCreatePath}
          />
        )}
      </div>
    </AdminLayout>
  );
}