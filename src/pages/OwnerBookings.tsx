import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Search, Filter, Download } from 'lucide-react';
import { format } from 'date-fns';

interface OwnerBooking {
  id: string;
  room: string;
  customer: string;
  customerEmail: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  amount: number;
  status: 'paid' | 'cancelled' | 'refunded';
  bookingType: 'individual' | 'group';
}

const mockBookings: OwnerBooking[] = [
  {
    id: '1',
    room: 'Bright Dance Studio - Room A',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    date: new Date(Date.now() + 86400000).toISOString(),
    timeFrom: '10:00',
    timeTo: '12:00',
    amount: 45,
    status: 'paid',
    bookingType: 'individual',
  },
  {
    id: '2',
    room: 'Yoga Space - Main Room',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    date: new Date(Date.now() + 172800000).toISOString(),
    timeFrom: '14:00',
    timeTo: '16:00',
    amount: 72,
    status: 'paid',
    bookingType: 'group',
  },
];

export function OwnerBookings() {
  const [bookings] = useState<OwnerBooking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings</h1>
          <p className="text-gray-600">View and manage all bookings for your studios</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by room or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium mb-2">No bookings found</p>
              <p className="text-gray-400 text-sm">No bookings match your search criteria</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#FF385C] to-[#E61E4D] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking.room}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{booking.customer}</span>
                            <span className="text-gray-400">•</span>
                            <span>{booking.customerEmail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{booking.timeFrom} - {booking.timeTo}</span>
                            <span className="text-gray-400">•</span>
                            <span className="capitalize">{booking.bookingType}</span>
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
                      <div className="text-3xl font-bold text-[#FF385C] mb-2">
                        €{booking.amount.toFixed(2)}
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

