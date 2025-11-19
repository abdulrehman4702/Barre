import { useState } from 'react';
import { Users, Building, Calendar, DollarSign, Settings, FileText } from 'lucide-react';
import { DashboardTab, BookingsTab, StudiosTab, UsersTab, PaymentsTab, SettingsTab } from '../components/admin';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FileText },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'studios', label: 'Studios', icon: Building },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Revenue', value: '€12,450', change: '+12%', color: 'green' as const },
    { label: 'Total Bookings', value: '156', change: '+8%', color: 'blue' as const },
    { label: 'Active Studios', value: '24', change: '+3', color: 'purple' as const },
    { label: 'Active Users', value: '342', change: '+15%', color: 'orange' as const },
  ];

  // Mock data for bookings
  const bookings = [
    {
      id: '1',
      room: 'Bright Dance Studio',
      customer: 'John Doe',
      date: new Date(Date.now() + 86400000).toISOString(),
      amount: 45,
      status: 'paid' as const,
      type: 'individual',
    },
    {
      id: '2',
      room: 'Yoga Space',
      customer: 'Jane Smith',
      date: new Date(Date.now() + 172800000).toISOString(),
      amount: 72,
      status: 'pending' as const,
      type: 'group',
    },
  ];

  // Mock data for studios
  const studios = [
    {
      id: '1',
      name: 'Bright Dance Studio',
      owner: 'Studio Owner',
      city: 'Munich',
      status: 'approved' as const,
      rooms: 3,
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
    {
      id: '2',
      name: 'New Yoga Space',
      owner: 'Yoga Master',
      city: 'Berlin',
      status: 'pending' as const,
      rooms: 2,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ];

  // Mock data for users
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'renter' as const,
      status: 'active' as const,
      bookings: 12,
    },
    {
      id: '2',
      name: 'Studio Owner',
      email: 'owner@example.com',
      role: 'owner' as const,
      status: 'active' as const,
      studios: 2,
    },
  ];

  // Mock data for payments
  const payments = [
    {
      id: '1',
      bookingId: 'BK-001',
      customer: 'John Doe',
      amount: 45,
      commission: 4.5,
      payout: 40.5,
      status: 'completed' as const,
      date: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: '2',
      bookingId: 'BK-002',
      customer: 'Jane Smith',
      amount: 72,
      commission: 7.2,
      payout: 64.8,
      status: 'pending' as const,
      date: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage platform operations and monitor activity</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
          <div className="flex space-x-1 p-2 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-[#FF385C] text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'dashboard' && <DashboardTab stats={stats} />}
            {activeTab === 'bookings' && (
              <BookingsTab
                bookings={bookings}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            )}
            {activeTab === 'studios' && (
              <StudiosTab
                studios={studios}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            )}
            {activeTab === 'users' && (
              <UsersTab
                users={users}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            )}
            {activeTab === 'payments' && <PaymentsTab payments={payments} />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
