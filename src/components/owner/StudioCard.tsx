import { Link } from 'react-router-dom';
import { Building, MapPin, Eye, Edit } from 'lucide-react';

interface Studio {
  id: string;
  name: string;
  address: string;
  city: string;
  rooms: number;
  status: 'approved' | 'pending' | 'rejected';
  image: string;
}

interface StudioCardProps {
  studio: Studio;
}

export function StudioCard({ studio }: StudioCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        {studio.image ? (
          <img
            src={studio.image}
            alt={studio.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              studio.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : studio.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {studio.status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{studio.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{studio.address}, {studio.city}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{studio.rooms} rooms</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/owner/studios/${studio.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </Link>
          <Link
            to={`/owner/studios/${studio.id}/edit`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

