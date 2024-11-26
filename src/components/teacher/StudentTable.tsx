import React from 'react';
import { motion } from 'framer-motion';
import { 
  MoreVertical, Mail, RefreshCw, Download, 
  CheckCircle2, Clock, AlertCircle 
} from 'lucide-react';

type Student = {
  id: string;
  name: string;
  code: string;
  parentStatus: 'linked' | 'unlinked';
  progress: number;
  avatar: string;
};

// Mock data
const mockStudents: Student[] = Array.from({ length: 10 }, (_, i) => ({
  id: `student-${i + 1}`,
  name: `Student ${i + 1}`,
  code: Math.random().toString(36).substring(2, 8).toUpperCase(),
  parentStatus: i % 3 === 0 ? 'unlinked' : 'linked',
  progress: Math.floor(Math.random() * 100),
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
}));

type Props = {
  searchQuery: string;
};

export default function StudentTable({ searchQuery }: Props) {
  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Students</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-gray-200">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div>
                <h3 className="font-medium text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-500">Code: {student.code}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Parent Status */}
              <div className={`px-3 py-1 rounded-full flex items-center gap-1
                ${student.parentStatus === 'linked' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {student.parentStatus === 'linked' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                <span className="text-sm capitalize">{student.parentStatus}</span>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {student.progress}%
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {/* Send parent invite */}}
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}