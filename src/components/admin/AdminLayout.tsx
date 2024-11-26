import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  BookOpen, 
  BarChart2, 
  Settings,
  LayoutDashboard,
  Wand2,
  Map,
  Heart,
  Brain
} from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const location = useLocation();

  const navItems = [
    { path: '/app/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/app/admin/users', icon: Users, label: 'Users' },
    { path: '/app/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { path: '/app/admin/content', icon: BookOpen, label: 'Content' },
    { path: '/app/admin/parent-activities', icon: Heart, label: 'Parent Activities' },
    { path: '/app/admin/quiz', icon: Brain, label: 'Quiz Management' },
    { path: '/app/admin/paths', icon: Map, label: 'Learning Paths' },
    { path: '/app/admin/prompts', icon: Wand2, label: 'Prompts' },
    { path: '/app/admin/analytics', icon: BarChart2, label: 'Analytics' },
    { path: '/app/admin/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-purple-600">Admin Panel</h1>
        </div>

        <nav className="px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                transition-colors ${
                  location.pathname === item.path
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main>{children}</main>
      </div>
    </div>
  );
}