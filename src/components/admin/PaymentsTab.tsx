import { Download } from 'lucide-react';
import { format } from 'date-fns';

interface Payment {
  id: string;
  bookingId: string;
  customer: string;
  amount: number;
  commission: number;
  payout: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

interface PaymentsTabProps {
  payments: Payment[];
}

export function PaymentsTab({ payments }: PaymentsTabProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payments & Payouts</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-sm font-medium text-green-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-green-900">€12,450</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-sm font-medium text-blue-600 mb-1">Platform Commission</p>
          <p className="text-2xl font-bold text-blue-900">€1,245</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <p className="text-sm font-medium text-purple-600 mb-1">Owner Payouts</p>
          <p className="text-2xl font-bold text-purple-900">€11,205</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Booking ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Commission</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Payout</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.bookingId}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{payment.customer}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">€{payment.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-600">€{payment.commission}</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">€{payment.payout}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-800' : payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{format(new Date(payment.date), 'MMM d, yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

