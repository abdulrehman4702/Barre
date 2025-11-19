import { useState } from 'react';
import { DollarSign, TrendingUp, Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Payout {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  bookings: number;
  period: string;
}

const mockPayouts: Payout[] = [
  {
    id: '1',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    amount: 1250,
    status: 'completed',
    bookings: 12,
    period: 'Nov 1 - Nov 7, 2025',
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000 * 14).toISOString(),
    amount: 980,
    status: 'completed',
    bookings: 9,
    period: 'Oct 24 - Oct 31, 2025',
  },
  {
    id: '3',
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    amount: 450,
    status: 'pending',
    bookings: 4,
    period: 'Nov 8 - Nov 14, 2025',
  },
];

export function OwnerPayouts() {
  const [payouts] = useState<Payout[]>(mockPayouts);
  const totalEarnings = payouts.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payouts.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payouts</h1>
          <p className="text-gray-600">Track your earnings and payout history</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-green-900">€{totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-700" />
              </div>
            </div>
            <p className="text-sm text-green-700">All time</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-yellow-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-900">€{pendingAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-700" />
              </div>
            </div>
            <p className="text-sm text-yellow-700">Next payout</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">This Month</p>
                <p className="text-3xl font-bold text-blue-900">€{(1250).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <p className="text-sm text-blue-700">November 2025</p>
          </div>
        </div>

        {/* Payouts List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Payout History</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {payouts.map((payout) => (
              <div key={payout.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        payout.status === 'completed'
                          ? 'bg-green-100'
                          : payout.status === 'pending'
                          ? 'bg-yellow-100'
                          : 'bg-red-100'
                      }`}
                    >
                      {payout.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : payout.status === 'pending' ? (
                        <Clock className="w-6 h-6 text-yellow-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {format(new Date(payout.date), 'MMMM d, yyyy')}
                      </h3>
                      <p className="text-sm text-gray-600">{payout.period}</p>
                      <p className="text-xs text-gray-500 mt-1">{payout.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">€{payout.amount.toLocaleString()}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                          payout.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : payout.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {payout.status}
                      </span>
                    </div>
                    {payout.status === 'completed' && (
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Download className="w-5 h-5 text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

