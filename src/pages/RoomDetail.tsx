import { Gallery, BookingWidget, Timeline, RoomDetails } from '../components/room';
import type { BookingData } from '../components/room';
import type { Room } from '../types';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Mock data - in production, this would come from an API
const mockRoom: Room = {
  id: '1',
  studio_id: '1',
  name_en: 'Bright Dance Studio',
  name_de: 'Helles Tanzstudio',
  cover_image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
  gallery: [
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  ],
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
  description_en: 'A beautiful dance studio with natural light and professional flooring. Perfect for ballet, contemporary dance, and rehearsals. The space features floor-to-ceiling mirrors, ballet barres, and a professional Marley floor.',
  description_de: 'Ein schönes Tanzstudio mit natürlichem Licht und professionellem Bodenbelag. Perfekt für Ballett, zeitgenössischen Tanz und Proben. Der Raum verfügt über bodentiefe Spiegel, Ballettstangen und einen professionellen Marley-Boden.',
  cancellation_policy: 'flexible',
  base_rate_individual: 15,
  base_rate_group: 25,
  published: true,
  approved: true,
};

export function RoomDetail() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBook = (data: BookingData) => {
    // In production, this would create a booking and redirect to Stripe Checkout
    console.log('Booking data:', data);
    alert('Redirecting to payment...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockRoom.name_en,
        text: mockRoom.description_en,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF385C] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to search</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-[#FF385C] text-[#FF385C]' : ''}`}
            />
            <span className="text-sm font-medium">Save</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Gallery images={mockRoom.gallery} coverImage={mockRoom.cover_image} />
            <RoomDetails room={mockRoom} />
            <Timeline room={mockRoom} />
          </div>
          <div className="lg:col-span-1">
            <BookingWidget room={mockRoom} onBook={handleBook} />
          </div>
        </div>
      </div>
    </div>
  );
}
