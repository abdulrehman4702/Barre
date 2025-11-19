import type { ReactNode } from 'react';

interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  icon: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export function StatsCard({ label, value, change, icon, color = 'blue' }: StatsCardProps) {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100 border-green-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200',
    orange: 'from-orange-50 to-orange-100 border-orange-200',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 border`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      {change && <p className="text-sm">{change}</p>}
    </div>
  );
}

