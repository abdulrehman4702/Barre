import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Building, MapPin, Eye, BarChart3, Activity, Droplet } from 'lucide-react';
import { useState } from 'react';

interface Room {
  id: string;
  name: string;
  area: number;
  floorType: 'ballet_marley' | 'wood';
  hasMirrors: boolean;
  hasBarres: boolean;
  hasMats: boolean;
  hasShower: boolean;
  baseRateIndividual: number;
  baseRateGroup: number;
  image: string;
}

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Main Studio',
    area: 50,
    floorType: 'ballet_marley',
    hasMirrors: true,
    hasBarres: true,
    hasMats: false,
    hasShower: true,
    baseRateIndividual: 15,
    baseRateGroup: 25,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
  },
  {
    id: '2',
    name: 'Small Studio',
    area: 30,
    floorType: 'wood',
    hasMirrors: false,
    hasBarres: false,
    hasMats: true,
    hasShower: false,
    baseRateIndividual: 12,
    baseRateGroup: 20,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  },
];

export function OwnerStudioDetail() {
  const { id } = useParams<{ id: string }>();
  const [rooms] = useState<Room[]>(mockRooms);

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <Link
          to="/owner/studios"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF385C] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Studios</span>
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Bright Dance Studio</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>123 Main St, Munich, Germany</span>
            </div>
          </div>
          <Link
            to={`/owner/studios/${id}/edit`}
            className="btn-primary flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Studio</span>
          </Link>
        </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700">A beautiful dance studio with natural light and professional flooring. Perfect for ballet, contemporary dance, and rehearsals.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Rooms</h2>
                <Link
                  to={`/owner/studios/${id}/rooms/new`}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Room</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <div key={room.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gray-200 rounded-lg mb-3 overflow-hidden">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{room.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>{room.area} m²</span>
                      </div>
                      <div className="flex items-center gap-4">
                        {room.hasMirrors && <Eye className="w-4 h-4 text-gray-400" />}
                        {room.hasBarres && <BarChart3 className="w-4 h-4 text-gray-400" />}
                        {room.hasMats && <Activity className="w-4 h-4 text-gray-400" />}
                        {room.hasShower && <Droplet className="w-4 h-4 text-gray-400" />}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Individual</p>
                        <p className="font-semibold text-gray-900">€{room.baseRateIndividual}/h</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Group</p>
                        <p className="font-semibold text-gray-900">€{room.baseRateGroup}/h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Rooms</span>
                  <span className="font-semibold">{rooms.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

