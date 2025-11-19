import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, Menu, X, Search, MapPin, Calendar, Clock, User, Home } from 'lucide-react';
import { useState } from 'react';
import type { SearchFilters } from '../../types';

interface HeaderProps {
  onSearch?: (filters: SearchFilters) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const { user, isAuthenticated } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerLocation, setHeaderLocation] = useState('');
  const [date, setDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('09:00');
  const [timeTo, setTimeTo] = useState('17:00');
  
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const handleSearch = () => {
    if (onSearch) {
      const filters: SearchFilters = {
        location: headerLocation || undefined,
        date: date || undefined,
        time_from: timeFrom,
        time_to: timeTo,
      };
      onSearch(filters);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[50] backdrop-blur-sm bg-white/95">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl font-bold text-[#FF385C]">BarreBooking</span>
          </Link>

          {/* Search Bar in Header - Hidden on auth pages */}
          {!isAuthPage && (
            <div className="hidden md:flex flex-1 mx-8">
              <div className="bg-white rounded-full shadow-md border border-gray-200 p-2 flex items-center gap-2 w-full">
                <div className="flex-1 flex items-center border-r border-gray-200 pr-3">
                  <MapPin className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={headerLocation}
                    onChange={(e) => setHeaderLocation(e.target.value)}
                    placeholder="Anywhere"
                    className="flex-1 border-0 outline-0 text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              <div className="flex-1 flex items-center border-r border-gray-200 pr-3">
                <Calendar className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="flex-1 border-0 outline-0 text-sm text-gray-700"
                  placeholder="Any week"
                />
              </div>
              <div className="flex-1 flex items-center pr-3">
                <Clock className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />
                <div className="flex items-center gap-1 flex-1">
                  <input
                    type="time"
                    value={timeFrom}
                    onChange={(e) => setTimeFrom(e.target.value)}
                    className="flex-1 border-0 outline-0 text-xs text-gray-700 w-16"
                  />
                  <span className="text-gray-400 text-xs">—</span>
                  <input
                    type="time"
                    value={timeTo}
                    onChange={(e) => setTimeTo(e.target.value)}
                    className="flex-1 border-0 outline-0 text-xs text-gray-700 w-16"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="bg-[#FF385C] hover:bg-[#E61E4D] text-white rounded-full p-2 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
          )}

          {/* Home Link on Auth Pages */}
          {isAuthPage && (
            <div className="hidden md:flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-700 hover:text-[#FF385C] transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Home</span>
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="hidden md:block p-2 text-gray-600 hover:text-[#FF385C] transition-colors"
              title={language === 'en' ? 'Deutsch' : 'English'}
            >
              <Globe className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-full border border-gray-300 hover:shadow-md transition-shadow cursor-pointer">
                  <Menu className="w-5 h-5 text-gray-600" />
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/signin" className="text-sm text-gray-600 hover:text-[#FF385C] transition-colors px-3 py-2">
                  {t('nav.signin')}
                </Link>
                <Link to="/signup" className="btn-primary text-sm px-4 py-2">
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-700 hover:text-[#FF385C] transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>{t('nav.home')}</span>
              </Link>
              {isAuthenticated && (
                <>
                  {user?.role === 'renter' && (
                    <Link to="/bookings" className="text-gray-700 hover:text-primary-600">
                      {t('nav.bookings')}
                    </Link>
                  )}
                  {user?.role === 'owner' && (
                    <Link to="/owner/dashboard" className="text-gray-700 hover:text-primary-600">
                      {t('nav.studios')}
                    </Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="text-gray-700 hover:text-primary-600">
                      {t('nav.admin')}
                    </Link>
                  )}
                  <div className="pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">{user?.email}</span>
                    <button className="block mt-2 text-sm text-gray-600 hover:text-primary-600">
                      {t('nav.signout')}
                    </button>
                  </div>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link to="/signin" className="text-gray-700 hover:text-primary-600">
                    {t('nav.signin')}
                  </Link>
                  <Link to="/signup" className="btn-primary text-center">
                    {t('nav.signup')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

