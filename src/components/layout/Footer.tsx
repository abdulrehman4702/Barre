import { Link } from 'react-router-dom';
import { Home, Search, Calendar, Building, Settings, Users, HelpCircle, Mail, FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white">BarreBooking</span>
            </Link>
            <p className="text-sm text-gray-400">Find a flow place to rent</p>
          </div>

          {/* For Renters */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Search className="w-4 h-4" />
              For Renters
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-white transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>My Bookings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Building className="w-4 h-4" />
              For Owners
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/owner/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/owner/studios" className="hover:text-white transition-colors">
                  My Studios
                </Link>
              </li>
              <li>
                <Link to="/owner/bookings" className="hover:text-white transition-colors">
                  Bookings
                </Link>
              </li>
              <li>
                <Link to="/owner/payouts" className="hover:text-white transition-colors">
                  Payouts
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Admin
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Account
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/help" className="hover:text-white transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Terms</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} BarreBooking. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
