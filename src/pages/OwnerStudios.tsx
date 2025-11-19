import { useState } from 'react';
import { Plus, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StudioCard } from '../components/owner';

interface Studio {
  id: string;
  name: string;
  address: string;
  city: string;
  rooms: number;
  status: 'approved' | 'pending' | 'rejected';
  image: string;
}

const mockStudios: Studio[] = [
  {
    id: '1',
    name: 'Bright Dance Studio',
    address: '123 Main St',
    city: 'Munich',
    rooms: 3,
    status: 'approved',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
  },
  {
    id: '2',
    name: 'Yoga Space',
    address: '456 Park Ave',
    city: 'Berlin',
    rooms: 2,
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  },
];

export function OwnerStudios() {
  const [studios] = useState<Studio[]>(mockStudios);

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Studios</h1>
            <p className="text-gray-600">Manage your studios and rooms</p>
          </div>
          <Link
            to="/owner/studios/new"
            className="btn-primary flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <Plus className="w-5 h-5" />
            <span>Add Studio</span>
          </Link>
        </div>

        {/* Studios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>

        {studios.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">No studios yet</p>
            <p className="text-gray-400 text-sm mb-6">Create your first studio to start renting out spaces</p>
            <Link to="/owner/studios/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>Add Your First Studio</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

