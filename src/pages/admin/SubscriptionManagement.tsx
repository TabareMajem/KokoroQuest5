import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  AlertCircle,
  Download,
  Filter,
  Search
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import SubscriptionStats from '../../components/admin/subscription/SubscriptionStats';
import SubscriptionList from '../../components/admin/subscription/SubscriptionList';
import type { Subscription } from '../../types/subscription';

// Mock data - in a real app, this would come from your API
const mockSubscriptions: Subscription[] = [
  {
    id: 'sub_1',
    customerName: 'Tokyo Elementary School',
    customerEmail: 'admin@tokyo-elementary.jp',
    planName: 'SCHOOL_PREMIUM',
    status: 'active',
    amount: 250000,
    nextBillingDate: '2024-04-01'
  },
  {
    id: 'sub_2',
    customerName: 'John Parent',
    customerEmail: 'john@example.com',
    planName: 'FAMILY_PREMIUM',
    status: 'active',
    amount: 2000,
    nextBillingDate: '2024-04-01'
  }
];

const mockStats = {
  totalSubscriptions: 1250,
  activeSubscriptions: 1150,
  monthlyRevenue: 2500000,
  churnRate: 2.5
};

export default function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleStatusChange = async (subscriptionId: string, newStatus: string) => {
    // In a real app, this would make an API call
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId ? { ...sub, status: newStatus as any } : sub
    ));
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || sub.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600">Manage customer subscriptions and billing</p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <SubscriptionStats stats={mockStats} />
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscriptions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            {['active', 'past_due', 'canceled'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${selectedStatus === status
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Subscription List */}
        <SubscriptionList
          subscriptions={filteredSubscriptions}
          onStatusChange={handleStatusChange}
        />
      </div>
    </AdminLayout>
  );
}