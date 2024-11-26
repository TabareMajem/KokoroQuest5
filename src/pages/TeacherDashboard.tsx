import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Book, Brain, Star, AlertCircle, Search, 
  Mail, Calendar, BarChart2, Settings, Download 
} from 'lucide-react';
import StudentTable from '../components/teacher/StudentTable';
import ParentConnectionsTable from '../components/teacher/ParentConnectionsTable';
import ActivityCalendar from '../components/teacher/ActivityCalendar';
import ClassAnalytics from '../components/teacher/ClassAnalytics';
import CodeGenerator from '../components/teacher/CodeGenerator';

type TabType = 'overview' | 'students' | 'parents' | 'activities' | 'analytics' | 'settings';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'students', label: 'Students', icon: Book },
    { id: 'parents', label: 'Parents', icon: Mail },
    { id: 'activities', label: 'Activities', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentTable searchQuery={searchQuery} />;
      case 'parents':
        return <ParentConnectionsTable searchQuery={searchQuery} />;
      case 'activities':
        return <ActivityCalendar />;
      case 'analytics':
        return <ClassAnalytics />;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Teacher Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                  text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                />
              </div>
              <button
                onClick={() => {/* Handle code generation */}}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg 
                  hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Generate Codes
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 
                  transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>

      {/* Code Generator Modal */}
      <CodeGenerator />
    </div>
  );
}

function OverviewContent() {
  const stats = {
    totalStudents: 25,
    activeToday: 18,
    averageProgress: 72,
    needAttention: 4,
    unlinkedParents: 3,
    pendingActivities: 7
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Total Students</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {stats.activeToday} active today
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Average Progress</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.averageProgress}%</p>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${stats.averageProgress}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Need Attention</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.needAttention}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {stats.unlinkedParents} unlinked parents
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
              rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Send Parent Invites ({stats.unlinkedParents})
            </button>
            <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
              rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule New Activity
            </button>
            <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
              rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Progress Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Sarah completed a journal entry</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">New parent account linked</p>
                <p className="text-sm text-gray-500">15 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}