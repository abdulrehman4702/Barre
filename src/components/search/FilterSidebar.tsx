import { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { SearchFilters } from '../../types';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onApply: () => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onApply,
  onReset,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const { t } = useLanguage();
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleReset = () => {
    const emptyFilters: SearchFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
    onReset();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed md:static top-20 left-0 h-[calc(100vh-5rem)] md:h-full w-80 bg-white shadow-lg z-[44] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold">{t('search.filters')}</h2>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-120px)]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Floor Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="floor_type"
                  checked={localFilters.floor_type === 'ballet_marley'}
                  onChange={() => updateFilter('floor_type', 'ballet_marley')}
                  className="mr-2"
                />
                <span className="text-sm">Ballet (Marley)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="floor_type"
                  checked={localFilters.floor_type === 'wood'}
                  onChange={() => updateFilter('floor_type', 'wood')}
                  className="mr-2"
                />
                <span className="text-sm">Wood</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.has_mirrors || false}
                  onChange={(e) => updateFilter('has_mirrors', e.target.checked || undefined)}
                  className="mr-2"
                />
                <span className="text-sm">Mirrors</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.has_barres || false}
                  onChange={(e) => updateFilter('has_barres', e.target.checked || undefined)}
                  className="mr-2"
                />
                <span className="text-sm">Barres</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.has_mats || false}
                  onChange={(e) => updateFilter('has_mats', e.target.checked || undefined)}
                  className="mr-2"
                />
                <span className="text-sm">Mats</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.has_shower || false}
                  onChange={(e) => updateFilter('has_shower', e.target.checked || undefined)}
                  className="mr-2"
                />
                <span className="text-sm">Shower</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="booking_type"
                  checked={localFilters.booking_type === 'individual'}
                  onChange={() => updateFilter('booking_type', 'individual')}
                  className="mr-2"
                />
                <span className="text-sm">Individual</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="booking_type"
                  checked={localFilters.booking_type === 'group'}
                  onChange={() => updateFilter('booking_type', 'group')}
                  className="mr-2"
                />
                <span className="text-sm">Group</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (€/hour)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={localFilters.price_min || ''}
                onChange={(e) => updateFilter('price_min', e.target.value ? Number(e.target.value) : undefined)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Max"
                value={localFilters.price_max || ''}
                onChange={(e) => updateFilter('price_max', e.target.value ? Number(e.target.value) : undefined)}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.sortBy')}
            </label>
            <select
              value={localFilters.sort_by || 'distance'}
              onChange={(e) => updateFilter('sort_by', e.target.value as any)}
              className="input-field"
            >
              <option value="distance">{t('search.sort.distance')}</option>
              <option value="price_asc">{t('search.sort.priceAsc')}</option>
              <option value="price_desc">{t('search.sort.priceDesc')}</option>
            </select>
          </div>

          <div className="flex space-x-2 pt-4 border-t border-gray-200">
            <button onClick={handleReset} className="flex-1 btn-secondary">
              Reset
            </button>
            <button onClick={handleApply} className="flex-1 btn-primary">
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

