import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Users } from 'lucide-react';
import EIResultsCard from './EIResultsCard';
import BigFiveResultsCard from './BigFiveResultsCard';
import AssessmentHistory from './AssessmentHistory';
import type { AssessmentData } from '../../types/assessment';

type Props = {
  data: AssessmentData[];
};

export default function AssessmentProgress({ data }: Props) {
  const [activeTab, setActiveTab] = useState<'ei' | 'big-five'>('ei');

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Assessment Progress
        </h3>
        <p className="text-gray-600 text-center py-8">
          No assessment data available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Assessment Progress
      </h3>

      {/* Tab Selection */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('ei')}
          className={[
            "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
            activeTab === 'ei' 
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          ].join(' ')}
        >
          <Brain className="w-5 h-5" />
          Emotional Intelligence
        </button>
        <button
          onClick={() => setActiveTab('big-five')}
          className={[
            "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
            activeTab === 'big-five'
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          ].join(' ')}
        >
          <Users className="w-5 h-5" />
          Big Five Personality
        </button>
      </div>

      {/* Results Card */}
      <div className="mb-8">
        {activeTab === 'ei' ? (
          <EIResultsCard
            scores={data[0].eiScores}
            previousScores={data[1]?.eiScores}
          />
        ) : (
          <BigFiveResultsCard
            scores={data[0].bigFiveScores}
            previousScores={data[1]?.bigFiveScores}
          />
        )}
      </div>

      {/* History Chart */}
      <AssessmentHistory 
        history={data} 
        activeTab={activeTab}
      />
    </div>
  );
}