import { Link, useLocation } from 'react-router-dom';
import { Plus, Building, LayoutDashboard, Calendar, DollarSign, User, Settings, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function OwnerSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/owner/studios') {
      return location.pathname.startsWith('/owner/studios');
    }
    if (path === '/owner/bookings') {
      return location.pathname === '/owner/bookings';
    }
    if (path === '/owner/dashboard') {
      return location.pathname === '/owner/dashboard';
    }
    if (path === '/owner/payouts') {
      return location.pathname === '/owner/payouts';
    }
    if (path === '/owner/settings') {
      return location.pathname === '/owner/settings';
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
          to="/owner/studios/new"
          className={`block w-full px-4 py-3 rounded-lg font-medium transition-colors ${
            location.pathname === '/owner/studios/new'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Plus className="w-5 h-5" />
            <span>Add Studio</span>
          </div>
        </Link>

        <Link
          to="/owner/studios"
          className={`block w-full px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive('/owner/studios')
              ? 'bg-gray-800 text-white'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5" />
            <span>My Studios</span>
          </div>
        </Link>

        {/* Menu Items */}
        <div className="pt-4 space-y-1">
          <Link
            to="/owner/dashboard"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              isActive('/owner/dashboard')
                ? 'text-white bg-gray-800'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/owner/bookings"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              isActive('/owner/bookings')
                ? 'text-white bg-gray-800'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Bookings</span>
          </Link>

          <Link
            to="/owner/payouts"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              isActive('/owner/payouts')
                ? 'text-white bg-gray-800'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Payouts</span>
          </Link>

          <Link
            to="/owner/profile"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <User className="w-5 h-5" />
            <span>My Profile</span>
          </Link>

          <Link
            to="/owner/settings"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              isActive('/owner/settings')
                ? 'text-white bg-gray-800'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
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
            <p className="text-gray-400 text-xs truncate">Owner</p>
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

