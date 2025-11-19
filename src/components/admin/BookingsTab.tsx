import { Search, Filter, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: string;
  room: string;
  customer: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
  type: string;
}

interface BookingsTabProps {
  bookings: Booking[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function BookingsTab({ bookings, searchTerm, onSearchChange }: BookingsTabProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">All Bookings</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Booking ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Room</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">#{booking.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{booking.room}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{booking.customer}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{format(new Date(booking.date), 'MMM d, yyyy')}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">€{booking.amount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    booking.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 text-gray-600 hover:text-[#FF385C]">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

