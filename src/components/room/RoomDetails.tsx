import { MapPin, Square, Eye, BarChart3, Activity, Droplet, FileText, DollarSign } from 'lucide-react';
import type { Room } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface RoomDetailsProps {
  room: Room;
}

export function RoomDetails({ room }: RoomDetailsProps) {
  const { language, t } = useLanguage();
  const name = language === 'en' ? room.name_en : room.name_de;
  const description = language === 'en' ? room.description_en : room.description_de;

  const cancellationPolicyText = {
    flexible: language === 'en' 
      ? 'Cancel up to 24 hours before for a full refund'
      : 'Bis zu 24 Stunden vorher stornieren für volle Rückerstattung',
    standard: language === 'en'
      ? 'Cancel up to 48 hours before for full refund; 48-12 hours: 50% refund; less than 12 hours: no refund'
      : 'Bis zu 48 Stunden vorher: volle Rückerstattung; 48-12 Stunden: 50% Rückerstattung; weniger als 12 Stunden: keine Rückerstattung',
    strict: language === 'en'
      ? 'Cancel up to 7 days before for 50% refund; less than 7 days: no refund'
      : 'Bis zu 7 Tage vorher: 50% Rückerstattung; weniger als 7 Tage: keine Rückerstattung',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{room.address}, {room.city}, {room.country}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <Square className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-sm text-gray-600">Area</div>
            <div className="font-semibold">{room.area_m2} m²</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-sm text-gray-600">Floor</div>
            <div className="font-semibold">
              {room.floor_type === 'ballet_marley' ? 'Marley' : 'Wood'}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-sm text-gray-600">Individual</div>
            <div className="font-semibold">€{room.base_rate_individual}/h</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-sm text-gray-600">Group</div>
            <div className="font-semibold">€{room.base_rate_group}/h</div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">{t('room.amenities')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {room.has_mirrors && (
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-brand-blue" />
              <span>Mirrors</span>
            </div>
          )}
          {room.has_barres && (
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-brand-blue" />
              <span>Barres</span>
            </div>
          )}
          {room.has_mats && (
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-brand-blue" />
              <span>Mats</span>
            </div>
          )}
          {room.has_shower && (
            <div className="flex items-center space-x-2">
              <Droplet className="w-5 h-5 text-brand-blue" />
              <span>Shower</span>
            </div>
          )}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">{t('room.description')}</h2>
        <p className="text-gray-700 whitespace-pre-line">{description}</p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">{t('room.cancellationPolicy')}</h2>
        <p className="text-gray-700">{cancellationPolicyText[room.cancellation_policy]}</p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm">Map view - Google Maps integration required</p>
        </div>
      </div>
    </div>
  );
}

