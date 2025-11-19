import { Search, Eye, Ban, Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface Studio {
  id: string;
  name: string;
  owner: string;
  city: string;
  status: 'approved' | 'pending';
  rooms: number;
  createdAt: string;
}

interface StudiosTabProps {
  studios: Studio[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function StudiosTab({ studios, searchTerm, onSearchChange }: StudiosTabProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Studio Moderation</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search studios..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {studios.map((studio) => (
          <div key={studio.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{studio.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    studio.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {studio.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p><span className="font-medium">Owner:</span> {studio.owner}</p>
                  <p><span className="font-medium">Location:</span> {studio.city}</p>
                  <p><span className="font-medium">Rooms:</span> {studio.rooms}</p>
                  <p><span className="font-medium">Created:</span> {format(new Date(studio.createdAt), 'MMM d, yyyy')}</p>
                </div>
              </div>
              {studio.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
              {studio.status === 'approved' && (
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Ban className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

