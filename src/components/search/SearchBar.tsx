import { useState } from 'react';
import { Search, MapPin, Calendar, Clock } from 'lucide-react';
import type { SearchFilters } from '../../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export function SearchBar({ onSearch, initialFilters }: SearchBarProps) {
  const [location, setLocation] = useState(initialFilters?.location || '');
  const [date, setDate] = useState(initialFilters?.date || '');
  const [timeFrom, setTimeFrom] = useState(initialFilters?.time_from || '09:00');
  const [timeTo, setTimeTo] = useState(initialFilters?.time_to || '17:00');

  const handleSearch = () => {
    const filters: SearchFilters = {
      location: location || undefined,
      date: date || undefined,
      time_from: timeFrom,
      time_to: timeTo,
    };
    onSearch(filters);
  };

  return (
    <div className="bg-white rounded-full shadow-xl p-2 flex items-center gap-2 w-full">
      <div className="flex-1 flex items-center border-r border-gray-200 pr-4">
        <MapPin className="text-gray-400 w-5 h-5 mr-2 flex-shrink-0" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where?"
          className="flex-1 border-0 outline-0 text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="flex-1 flex items-center border-r border-gray-200 pr-4">
        <Calendar className="text-gray-400 w-5 h-5 mr-2 flex-shrink-0" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="flex-1 border-0 outline-0 text-gray-700"
        />
      </div>
      <div className="flex-1 flex items-center pr-4">
        <Clock className="text-gray-400 w-5 h-5 mr-2 flex-shrink-0" />
        <div className="flex items-center gap-2 flex-1">
          <input
            type="time"
            value={timeFrom}
            onChange={(e) => setTimeFrom(e.target.value)}
            className="flex-1 border-0 outline-0 text-gray-700 text-sm"
          />
          <span className="text-gray-400">—</span>
          <input
            type="time"
            value={timeTo}
            onChange={(e) => setTimeTo(e.target.value)}
            className="flex-1 border-0 outline-0 text-gray-700 text-sm"
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="bg-[#FF385C] hover:bg-[#E61E4D] text-white rounded-full p-3 flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}

