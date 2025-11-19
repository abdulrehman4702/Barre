import { Calendar, Building } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

interface DashboardTabProps {
  stats: Stat[];
}

export function DashboardTab({ stats }: DashboardTabProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
          >
            <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <span
                className={`text-sm font-medium ${
                  stat.color === 'green'
                    ? 'text-green-600'
                    : stat.color === 'blue'
                    ? 'text-blue-600'
                    : stat.color === 'purple'
                    ? 'text-purple-600'
                    : 'text-orange-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New booking created</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Studio approved</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Approvals</span>
              <span className="font-semibold text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Refunds</span>
              <span className="font-semibold text-gray-900">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Support Tickets</span>
              <span className="font-semibold text-gray-900">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

