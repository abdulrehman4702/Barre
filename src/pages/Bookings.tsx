import { useState } from 'react';
import { Calendar, Clock, MapPin, FileText, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Booking } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { format } from 'date-fns';
import { RenterSidebar } from '../components/layout';

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    room_id: '1',
    owner_id: '1',
    customer_id: '1',
    starts_at_utc: new Date(Date.now() + 86400000).toISOString(),
    ends_at_utc: new Date(Date.now() + 86400000 + 2 * 3600000).toISOString(),
    duration_min: 120,
    booking_type: 'individual',
    base_amount: 30,
    vat_amount: 6,
    total_amount: 36,
    service_fee: 1.17,
    platform_commission: 3,
    status: 'paid',
    pricing_breakdown_json: {},
  },
  {
    id: '2',
    room_id: '2',
    owner_id: '2',
    customer_id: '1',
    starts_at_utc: new Date(Date.now() - 86400000).toISOString(),
    ends_at_utc: new Date(Date.now() - 86400000 + 3 * 3600000).toISOString(),
    duration_min: 180,
    booking_type: 'group',
    base_amount: 60,
    vat_amount: 12,
    total_amount: 72,
    service_fee: 2.04,
    platform_commission: 6,
    status: 'paid',
    pricing_breakdown_json: {},
  },
];

export function Bookings() {
  const { t } = useLanguage();
  const [bookings] = useState<Booking[]>(mockBookings);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  const filteredBookings = bookings.filter((booking) => {
    const now = new Date();
    const start = new Date(booking.starts_at_utc);
    
    if (booking.status === 'cancelled' || booking.status === 'refunded') {
      return activeTab === 'cancelled';
    }
    
    if (start > now) {
      return activeTab === 'upcoming';
    }
    
    return activeTab === 'past';
  });

  const handleCancel = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      // In production, this would call an API
      console.log('Cancel booking:', bookingId);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <RenterSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <div className="bg-white py-6">
          <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('booking.myBookings')}</h1>
          <p className="text-gray-600">Manage your bookings and view invoices</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'upcoming'
                ? 'text-brand-blue'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('booking.upcoming')}
            {activeTab === 'upcoming' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'past'
                ? 'text-brand-blue'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('booking.past')}
            {activeTab === 'past' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'cancelled'
                ? 'text-brand-blue'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('booking.cancelled')}
            {activeTab === 'cancelled' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue"></span>
            )}
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium mb-2">No bookings found</p>
              <p className="text-gray-400 text-sm">You don't have any {activeTab} bookings yet.</p>
              <Link
                to="/"
                className="inline-block mt-6 text-brand-blue hover:text-brand-blue-dark font-medium"
              >
                Browse available spaces →
              </Link>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <Link
                to={`/bookings/${booking.id}`}
                key={booking.id}
                className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Bright Dance Studio
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>
                              {format(new Date(booking.starts_at_utc), 'EEEE, MMMM d, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>
                              {format(new Date(booking.starts_at_utc), 'HH:mm')} -{' '}
                              {format(new Date(booking.ends_at_utc), 'HH:mm')}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>{booking.duration_min / 60} hours</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>Munich, Germany</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end gap-4">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-brand-blue mb-2">
                        €{(booking.total_amount + booking.service_fee).toFixed(2)}
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : booking.status === 'refunded'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    {booking.status === 'paid' && activeTab === 'upcoming' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          <X className="w-4 h-4" />
                          <span>{t('booking.cancel')}</span>
                        </button>
                        <Link
                          to={`/invoices/${booking.id}`}
                          className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors text-sm font-medium"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{t('booking.viewInvoice')}</span>
                        </Link>
                      </div>
                    )}
                    {activeTab === 'past' && (
                      <Link
                        to={`/invoices/${booking.id}`}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Invoice</span>
                      </Link>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

