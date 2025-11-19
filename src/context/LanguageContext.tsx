import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.tagline': 'Find a flow place to rent',
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.bookings': 'My Bookings',
    'nav.studios': 'My Studios',
    'nav.admin': 'Admin',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.signout': 'Sign Out',
    'search.location': 'Location',
    'search.useMyLocation': 'Use my location',
    'search.date': 'Date',
    'search.time': 'Time',
    'search.search': 'Search',
    'search.filters': 'Filters',
    'search.sortBy': 'Sort by',
    'search.sort.priceAsc': 'Price: Low to High',
    'search.sort.priceDesc': 'Price: High to Low',
    'search.sort.distance': 'Distance',
    'room.from': 'from',
    'room.perHour': '/hour',
    'room.individual': 'Individual',
    'room.group': 'Group',
    'room.book': 'Book & Pay',
    'room.amenities': 'Amenities',
    'room.cancellationPolicy': 'Cancellation Policy',
    'room.description': 'Description',
    'booking.myBookings': 'My Bookings',
    'booking.upcoming': 'Upcoming',
    'booking.past': 'Past',
    'booking.cancelled': 'Cancelled',
    'booking.cancel': 'Cancel',
    'booking.viewInvoice': 'View Invoice',
  },
  de: {
    'app.tagline': 'Finde einen Ort zum Mieten',
    'nav.home': 'Startseite',
    'nav.search': 'Suchen',
    'nav.bookings': 'Meine Buchungen',
    'nav.studios': 'Meine Studios',
    'nav.admin': 'Admin',
    'nav.signin': 'Anmelden',
    'nav.signup': 'Registrieren',
    'nav.signout': 'Abmelden',
    'search.location': 'Standort',
    'search.useMyLocation': 'Meinen Standort verwenden',
    'search.date': 'Datum',
    'search.time': 'Zeit',
    'search.search': 'Suchen',
    'search.filters': 'Filter',
    'search.sortBy': 'Sortieren nach',
    'search.sort.priceAsc': 'Preis: Niedrig bis Hoch',
    'search.sort.priceDesc': 'Preis: Hoch bis Niedrig',
    'search.sort.distance': 'Entfernung',
    'room.from': 'ab',
    'room.perHour': '/Stunde',
    'room.individual': 'Einzeln',
    'room.group': 'Gruppe',
    'room.book': 'Buchen & Bezahlen',
    'room.amenities': 'Ausstattung',
    'room.cancellationPolicy': 'Stornierungsbedingungen',
    'room.description': 'Beschreibung',
    'booking.myBookings': 'Meine Buchungen',
    'booking.upcoming': 'Bevorstehend',
    'booking.past': 'Vergangen',
    'booking.cancelled': 'Storniert',
    'booking.cancel': 'Stornieren',
    'booking.viewInvoice': 'Rechnung anzeigen',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'en'
  );

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

