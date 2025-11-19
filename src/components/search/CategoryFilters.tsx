import { Flame, Key, Sparkles, Mountain, Umbrella, Tent, Palette, Filter } from 'lucide-react';
import { useState } from 'react';

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: 'trending', label: 'Trending', icon: Flame },
  { id: 'new', label: 'New', icon: Key },
  { id: 'amazing', label: 'Amazing', icon: Sparkles },
  { id: 'countryside', label: 'Countryside', icon: Mountain },
  { id: 'creative', label: 'Creative', icon: Palette },
  { id: 'beach', label: 'Beach', icon: Umbrella },
  { id: 'camping', label: 'Camping', icon: Tent },
];

interface CategoryFiltersProps {
  onFiltersClick?: () => void;
}

export function CategoryFilters({ onFiltersClick }: CategoryFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap flex-shrink-0 border ${
              selectedCategory === category.id
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        );
      })}
      <button
        onClick={onFiltersClick}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors whitespace-nowrap flex-shrink-0 ml-2"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium text-gray-700">Filters</span>
      </button>
    </div>
  );
}

