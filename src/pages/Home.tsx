import { useState } from 'react';
import { FilterSidebar, RoomCard, MapView, CategoryFilters } from '../components/search';
import type { SearchFilters, Room } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Filter, MapPin } from 'lucide-react';

// Mock data - in production, this would come from an API
const mockRooms: Room[] = [
  {
    id: '1',
    studio_id: '1',
    name_en: 'Bright Dance Studio',
    name_de: 'Helles Tanzstudio',
    cover_image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
    gallery: [],
    area_m2: 50,
    floor_type: 'ballet_marley',
    has_mirrors: true,
    has_barres: true,
    has_mats: false,
    has_shower: true,
    address: '123 Main St',
    city: 'Munich',
    country: 'Germany',
    latitude: 48.1351,
    longitude: 11.5820,
    timezone: 'Europe/Berlin',
    description_en: 'A beautiful dance studio with natural light and professional flooring.',
    description_de: 'Ein schönes Tanzstudio mit natürlichem Licht und professionellem Bodenbelag.',
    cancellation_policy: 'flexible',
    base_rate_individual: 15,
    base_rate_group: 25,
    published: true,
    approved: true,
  },
  {
    id: '2',
    studio_id: '2',
    name_en: 'Yoga Space',
    name_de: 'Yoga Raum',
    cover_image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    gallery: [],
    area_m2: 40,
    floor_type: 'wood',
    has_mirrors: false,
    has_barres: false,
    has_mats: true,
    has_shower: false,
    address: '456 Park Ave',
    city: 'Munich',
    country: 'Germany',
    latitude: 48.1400,
    longitude: 11.5700,
    timezone: 'Europe/Berlin',
    description_en: 'Peaceful yoga space with wooden floors.',
    description_de: 'Ruhiger Yoga-Raum mit Holzböden.',
    cancellation_policy: 'standard',
    base_rate_individual: 12,
    base_rate_group: 20,
    published: true,
    approved: true,
  },
  {
    id: '3',
    studio_id: '3',
    name_en: 'Contemporary Dance Hall',
    name_de: 'Zeitgenössischer Tanzsaal',
    cover_image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    gallery: [],
    area_m2: 60,
    floor_type: 'ballet_marley',
    has_mirrors: true,
    has_barres: true,
    has_mats: true,
    has_shower: true,
    address: '789 Art Street',
    city: 'Berlin',
    country: 'Germany',
    latitude: 52.5200,
    longitude: 13.4050,
    timezone: 'Europe/Berlin',
    description_en: 'Spacious contemporary dance hall perfect for rehearsals.',
    description_de: 'Großzügiger zeitgenössischer Tanzsaal perfekt für Proben.',
    cancellation_policy: 'standard',
    base_rate_individual: 18,
    base_rate_group: 30,
    published: true,
    approved: true,
  },
  {
    id: '4',
    studio_id: '4',
    name_en: 'Fitness & Movement Studio',
    name_de: 'Fitness & Bewegung Studio',
    cover_image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    gallery: [],
    area_m2: 45,
    floor_type: 'wood',
    has_mirrors: true,
    has_barres: false,
    has_mats: true,
    has_shower: true,
    address: '321 Fitness Blvd',
    city: 'Hamburg',
    country: 'Germany',
    latitude: 53.5511,
    longitude: 9.9937,
    timezone: 'Europe/Berlin',
    description_en: 'Modern fitness studio with all amenities.',
    description_de: 'Modernes Fitness-Studio mit allen Annehmlichkeiten.',
    cancellation_policy: 'flexible',
    base_rate_individual: 14,
    base_rate_group: 22,
    published: true,
    approved: true,
  },
  {
    id: '5',
    studio_id: '5',
    name_en: 'Ballet Academy Studio',
    name_de: 'Ballett Akademie Studio',
    cover_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    gallery: [],
    area_m2: 55,
    floor_type: 'ballet_marley',
    has_mirrors: true,
    has_barres: true,
    has_mats: false,
    has_shower: false,
    address: '555 Dance Lane',
    city: 'Munich',
    country: 'Germany',
    latitude: 48.1351,
    longitude: 11.5820,
    timezone: 'Europe/Berlin',
    description_en: 'Professional ballet studio with traditional setup.',
    description_de: 'Professionelles Ballettstudio mit traditioneller Ausstattung.',
    cancellation_policy: 'strict',
    base_rate_individual: 20,
    base_rate_group: 35,
    published: true,
    approved: true,
  },
  {
    id: '6',
    studio_id: '6',
    name_en: 'Zen Yoga & Meditation',
    name_de: 'Zen Yoga & Meditation',
    cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    gallery: [],
    area_m2: 35,
    floor_type: 'wood',
    has_mirrors: false,
    has_barres: false,
    has_mats: true,
    has_shower: false,
    address: '888 Peace Road',
    city: 'Cologne',
    country: 'Germany',
    latitude: 50.9375,
    longitude: 6.9603,
    timezone: 'Europe/Berlin',
    description_en: 'Tranquil space for yoga and meditation practice.',
    description_de: 'Ruhiger Raum für Yoga und Meditationspraxis.',
    cancellation_policy: 'flexible',
    base_rate_individual: 10,
    base_rate_group: 18,
    published: true,
    approved: true,
  },
];

export function Home() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<SearchFilters>({});
  const [rooms] = useState<Room[]>(mockRooms);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Search is now handled in Header component

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    // Apply filters logic
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Category Filters - Tabs below header */}
      <div className="border-b border-gray-200 bg-white sticky top-20 z-[45]">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <CategoryFilters onFiltersClick={() => setShowFilters(true)} />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {rooms.length} {rooms.length === 1 ? 'space' : 'spaces'} available
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">{t('search.filters')}</span>
            </button>
            <button
              onClick={() => setShowMap(!showMap)}
              className="hidden md:flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{showMap ? 'Show list' : 'Show map'}</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />

          <div className="flex-1">
            {showMap ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rooms.map((room) => (
                      <RoomCard key={room.id} room={room} />
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <MapView rooms={rooms} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

