import { useState } from 'react';
import { Plus, Building, Calendar, DollarSign, TrendingUp, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OwnerSidebar } from '../components/layout';

export function OwnerDashboard() {
  const [stats] = useState({
    studios: 2,
    bookings: 12,
    revenue: 1250,
    upcoming: 5,
  });

  const recentBookings = [
    {
      id: '1',
      room: 'Bright Dance Studio',
      customer: 'John Doe',
      date: '2025-11-20',
      time: '10:00 - 12:00',
      amount: 45,
      status: 'paid',
    },
    {
      id: '2',
      room: 'Yoga Space',
      customer: 'Jane Smith',
      date: '2025-11-21',
      time: '14:00 - 16:00',
      amount: 36,
      status: 'paid',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OwnerSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <div className="bg-white py-6">
          <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
            <p className="text-gray-600">Manage your studios and track your bookings</p>
          </div>
          <Link
            to="/owner/studios/new"
            className="btn-primary flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <Plus className="w-5 h-5" />
            <span>Add Studio</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Studios</p>
                <p className="text-3xl font-bold text-blue-900">{stats.studios}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <Link
              to="/owner/studios"
              className="text-sm text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              Manage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-green-900">{stats.bookings}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-700" />
              </div>
            </div>
            <Link
              to="/owner/bookings"
              className="text-sm text-green-700 hover:text-green-800 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Revenue</p>
                <p className="text-3xl font-bold text-purple-900">€{stats.revenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-700" />
              </div>
            </div>
            <Link
              to="/owner/payouts"
              className="text-sm text-purple-700 hover:text-purple-800 font-medium flex items-center gap-1"
            >
              Payouts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">Upcoming</p>
                <p className="text-3xl font-bold text-orange-900">{stats.upcoming}</p>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-700" />
              </div>
            </div>
            <p className="text-sm text-orange-700 font-medium">This week</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              <Link
                to="/owner/bookings"
                className="text-sm text-brand-blue hover:text-brand-blue-dark font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No recent bookings</p>
                </div>
              ) : (
                recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{booking.room}</h3>
                      <p className="text-sm text-gray-600 mb-1">{booking.customer}</p>
                      <p className="text-xs text-gray-500">
                        {booking.date} • {booking.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">€{booking.amount}</p>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                          {booking.status}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/owner/studios"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Manage Studios</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-blue transition-colors" />
              </Link>
              <Link
                to="/owner/bookings"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-900">View All Bookings</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-blue transition-colors" />
              </Link>
              <Link
                to="/owner/payouts"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-900">Payouts</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-blue transition-colors" />
              </Link>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
