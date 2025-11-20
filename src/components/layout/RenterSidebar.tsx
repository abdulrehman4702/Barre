import { Link, useLocation } from 'react-router-dom';
import { Search, Calendar, Star, CreditCard, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function RenterSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/bookings') {
      return location.pathname === '/bookings' || location.pathname.startsWith('/bookings/');
    }
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-gray-900 h-screen fixed left-0 top-0 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-800 flex-shrink-0">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img 
            src="/logo.png" 
            alt="BarreBooking" 
            className="h-10 w-auto object-contain"
          />
        </Link>
        <Link
          to="/"
          className="mt-3 text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <Home className="w-3 h-3" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {/* Primary Actions - Buttons */}
        <Link
          to="/"
          className={`block w-full px-4 py-3 rounded-lg font-medium transition-colors ${
            location.pathname === '/'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5" />
            <span>Browse Spaces</span>
          </div>
        </Link>

        <Link
          to="/bookings"
          className={`block w-full px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive('/bookings')
              ? 'bg-gray-800 text-white'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5" />
            <span>My Bookings</span>
          </div>
        </Link>

        {/* Menu Items */}
        <div className="pt-4 space-y-1">
          <Link
            to="/reviews"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <Star className="w-5 h-5" />
            <span>My Reviews</span>
          </Link>

          <Link
            to="/transactions"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <CreditCard className="w-5 h-5" />
            <span>Transactions</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <User className="w-5 h-5" />
            <span>My Profile</span>
          </Link>
        </div>
      </nav>

      {/* User Section */}
      <div className="px-4 py-4 border-t border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {user?.email || 'User'}
            </p>
            <p className="text-gray-400 text-xs truncate">Renter</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

