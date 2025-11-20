import { Link } from 'react-router-dom';
import { Heart, Eye, BarChart3, Activity, Droplet } from 'lucide-react';
import type { Room } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';

interface RoomCardProps {
  room: Room;
  distance?: number;
}

export function RoomCard({ room, distance }: RoomCardProps) {
  const { language } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const name = language === 'en' ? room.name_en : room.name_de;

  const floorTypeLabel = room.floor_type === 'ballet_marley' ? 'Marley' : 'Wood';
  const basePrice = Math.min(room.base_rate_individual, room.base_rate_group);

  return (
    <Link to={`/rooms/${room.id}`} className="group">
      <div className="relative">
        <div className="relative h-64 overflow-hidden rounded-xl">
          <img
            src={room.cover_image || '/placeholder-room.jpg'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-brand-blue text-brand-blue' : 'text-gray-700'
              }`}
            />
          </button>
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-800">
            {floorTypeLabel}
          </div>
        </div>
        <div className="pt-3">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">
                {room.city}, {room.country}
              </p>
              <h3 className="font-semibold text-base text-gray-900 line-clamp-1 group-hover:underline">
                {name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            {room.has_mirrors && (
              <div className="flex items-center gap-1" title="Mirrors">
                <Eye className="w-4 h-4" />
              </div>
            )}
            {room.has_barres && (
              <div className="flex items-center gap-1" title="Barres">
                <BarChart3 className="w-4 h-4" />
              </div>
            )}
            {room.has_mats && (
              <div className="flex items-center gap-1" title="Mats">
                <Activity className="w-4 h-4" />
              </div>
            )}
            {room.has_shower && (
              <div className="flex items-center gap-1" title="Shower">
                <Droplet className="w-4 h-4" />
              </div>
            )}
            {distance && (
              <span className="text-gray-500 text-xs">{distance.toFixed(1)} km away</span>
            )}
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-lg font-semibold text-gray-900">€{basePrice}</span>
            <span className="text-sm text-gray-600">/ hour</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

