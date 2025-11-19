import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Mail, MapPin, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

export function Invoice() {
  const { id } = useParams<{ id: string }>();
  
  // Mock invoice data
  const invoice = {
    id: id || '1',
    number: 'INV-2025-001',
    date: new Date().toISOString(),
    booking: {
      room: 'Bright Dance Studio',
      date: new Date(Date.now() + 86400000).toISOString(),
      timeFrom: '10:00',
      timeTo: '12:00',
      duration: 2,
      type: 'individual',
    },
    seller: {
      name: 'Bright Dance Studio',
      address: '123 Main St',
      city: 'Munich',
      country: 'Germany',
      vatNumber: 'DE123456789',
    },
    buyer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '456 Customer St',
      city: 'Munich',
      country: 'Germany',
    },
    items: [
      { description: 'Studio rental (2 hours)', quantity: 2, rate: 15, amount: 30 },
    ],
    subtotal: 30,
    vatRate: 20,
    vatAmount: 6,
    serviceFee: 1.17,
    total: 37.17,
  };

  const handleDownload = () => {
    // In production, this would download the PDF
    alert('Downloading invoice PDF...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/bookings"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF385C] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Bookings</span>
          </Link>

          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 print:shadow-none print:border-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-300">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#FF385C] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
                    <p className="text-sm text-gray-500 mt-1">BarreBooking</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Invoice #:</span> {invoice.number}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {format(new Date(invoice.date), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold mb-2">
                  Paid
                </div>
                <p className="text-xs text-gray-500">Payment Status</p>
              </div>
            </div>

            {/* Seller & Buyer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Bill From</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-semibold text-gray-900">{invoice.seller.name}</p>
                  <p>{invoice.seller.address}</p>
                  <p>{invoice.seller.city}, {invoice.seller.country}</p>
                  <p className="mt-3 pt-3 border-t border-gray-200">
                    <span className="font-medium">VAT ID:</span> {invoice.seller.vatNumber}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Bill To</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-semibold text-gray-900">{invoice.buyer.name}</p>
                  <p className="text-gray-600">{invoice.buyer.email}</p>
                  <p>{invoice.buyer.address}</p>
                  <p>{invoice.buyer.city}, {invoice.buyer.country}</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-gradient-to-r from-[#FF385C]/5 to-[#E61E4D]/5 rounded-lg p-5 mb-6 border border-[#FF385C]/10">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Booking Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF385C]/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#FF385C]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-semibold text-gray-900">{format(new Date(invoice.booking.date), 'MMMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF385C]/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#FF385C]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-semibold text-gray-900">{invoice.booking.timeFrom} - {invoice.booking.timeTo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF385C]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#FF385C]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Room</p>
                    <p className="font-semibold text-gray-900">{invoice.booking.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF385C]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#FF385C]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-semibold text-gray-900 capitalize">{invoice.booking.type}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Items</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Description</th>
                      <th className="px-5 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wide">Hours</th>
                      <th className="px-5 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">Rate</th>
                      <th className="px-5 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-5 py-4 text-sm text-gray-900">{item.description}</td>
                        <td className="px-5 py-4 text-sm text-gray-600 text-center">{item.quantity}</td>
                        <td className="px-5 py-4 text-sm text-gray-600 text-right">€{item.rate.toFixed(2)}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-gray-900 text-right">€{item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="border-t-2 border-gray-300 pt-6">
              <div className="flex justify-end">
                <div className="w-80 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">€{invoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT ({invoice.vatRate}%)</span>
                    <span className="font-semibold text-gray-900">€{invoice.vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold text-gray-900">€{invoice.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t-2 border-gray-300">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-[#FF385C]">€{invoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Thank you for your business! This is an automatically generated invoice.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-300 print:hidden">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
              <button className="btn-primary flex items-center gap-2 px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-shadow">
                <Mail className="w-5 h-5" />
                <span>Email Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

