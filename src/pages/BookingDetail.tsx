import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, FileText, X, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { RenterSidebar } from '../components/layout';

export function BookingDetail() {
  const { id } = useParams<{ id: string }>();

  // Mock booking data
  const booking = {
    id: id || '1',
    room: 'Bright Dance Studio',
    address: '123 Main St, Munich, Germany',
    date: new Date(Date.now() + 86400000).toISOString(),
    timeFrom: '10:00',
    timeTo: '12:00',
    duration: 2,
    type: 'individual',
    customer: 'John Doe',
    amount: 30,
    vat: 6,
    serviceFee: 1.17,
    total: 37.17,
    status: 'paid',
    cancellationPolicy: 'flexible',
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      alert('Booking cancelled');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <RenterSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <div className="bg-white py-6">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
          <Link
            to="/bookings"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Bookings</span>
          </Link>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{booking.room}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{booking.address}</span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900">{booking.timeFrom} - {booking.timeTo}</p>
                    <p className="text-xs text-gray-500">{booking.duration} hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900 capitalize">{booking.type}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Amount</span>
                    <span className="text-gray-900">€{booking.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VAT (20%)</span>
                    <span className="text-gray-900">€{booking.vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-gray-900">€{booking.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-brand-blue">€{booking.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {booking.status === 'paid' && (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel Booking</span>
                  </button>
                  <Link
                    to={`/invoices/${booking.id}`}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Invoice</span>
                  </Link>
                </>
              )}
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

