import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header, Footer } from './components/layout';
import { Home } from './pages/Home';
import { RoomDetail } from './pages/RoomDetail';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Bookings } from './pages/Bookings';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { OwnerStudios } from './pages/OwnerStudios';
import { OwnerBookings } from './pages/OwnerBookings';
import { OwnerPayouts } from './pages/OwnerPayouts';
import { OwnerStudioNew } from './pages/OwnerStudioNew';
import { OwnerStudioDetail } from './pages/OwnerStudioDetail';
import { OwnerStudioEdit } from './pages/OwnerStudioEdit';
import { OwnerSettings } from './pages/OwnerSettings';
import { AdminPanel } from './pages/AdminPanel';
import { Help } from './pages/Help';
import { Contact } from './pages/Contact';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Invoice } from './pages/Invoice';
import { BookingDetail } from './pages/BookingDetail';

function AppContent() {
  const location = useLocation();

  // Pages that should show sidebar (and hide header/footer)
  const hasSidebar = 
    location.pathname.startsWith('/bookings') ||
    location.pathname.startsWith('/owner/') ||
    location.pathname.startsWith('/admin');

  const handleSearch = () => {
    // Navigate to home if not already there
    if (location.pathname !== '/') {
      window.location.href = '/';
    }
    // Filters will be handled by Home component
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!hasSidebar && <Header onSearch={handleSearch} />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/:id" element={<BookingDetail />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/studios" element={<OwnerStudios />} />
          <Route path="/owner/studios/new" element={<OwnerStudioNew />} />
          <Route path="/owner/studios/:id" element={<OwnerStudioDetail />} />
          <Route path="/owner/studios/:id/edit" element={<OwnerStudioEdit />} />
          <Route path="/owner/bookings" element={<OwnerBookings />} />
          <Route path="/owner/payouts" element={<OwnerPayouts />} />
          <Route path="/owner/settings" element={<OwnerSettings />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/invoices/:id" element={<Invoice />} />
        </Routes>
      </main>
      {!hasSidebar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
