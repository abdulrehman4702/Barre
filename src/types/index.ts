export type UserRole = 'renter' | 'owner' | 'admin';
export type Language = 'en' | 'de';
export type FloorType = 'ballet_marley' | 'wood';
export type BookingType = 'individual' | 'group';
export type CancellationPolicy = 'flexible' | 'standard' | 'strict';
export type BookingStatus = 'hold' | 'paid' | 'cancelled' | 'refunded';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  language: Language;
  stripe_connect_account_id?: string;
  company?: string;
  vat_number?: string;
  is_vat_registered: boolean;
  vat_rate: number;
  price_mode: 'net' | 'gross';
}

export interface Studio {
  id: string;
  owner_id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  logo?: string;
  description_short: string;
  photos: string[];
  approved: boolean;
  published: boolean;
}

export interface Room {
  id: string;
  studio_id: string;
  name_en: string;
  name_de: string;
  cover_image: string;
  gallery: string[];
  area_m2: number;
  floor_type: FloorType;
  has_mirrors: boolean;
  has_barres: boolean;
  has_mats: boolean;
  has_shower: boolean;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  description_en: string;
  description_de: string;
  cancellation_policy: CancellationPolicy;
  base_rate_individual: number;
  base_rate_group: number;
  published: boolean;
  approved: boolean;
}

export interface PricingRule {
  id: string;
  room_id: string;
  days_of_week: number[];
  time_from: string;
  time_to: string;
  applies_to: 'individual' | 'group' | 'both';
  fixed_rate_enabled: boolean;
  fixed_rate?: number;
  price_modifier_type: 'percent' | 'absolute';
  price_modifier_value: number;
  priority: number;
  active: boolean;
}

export interface AvailabilityRule {
  id: string;
  room_id: string;
  weekday: number;
  time_from: string;
  time_to: string;
}

export interface AvailabilityException {
  id: string;
  room_id: string;
  date: string;
  is_closed: boolean;
  time_from?: string;
  time_to?: string;
}

export interface Booking {
  id: string;
  room_id: string;
  owner_id: string;
  customer_id: string;
  starts_at_utc: string;
  ends_at_utc: string;
  duration_min: number;
  booking_type: BookingType;
  base_amount: number;
  vat_amount: number;
  total_amount: number;
  service_fee: number;
  platform_commission: number;
  status: BookingStatus;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  pricing_breakdown_json: any;
}

export interface Invoice {
  id: string;
  booking_id: string;
  number: string;
  date: string;
  seller_snapshot: any;
  buyer_snapshot: any;
  subtotal: number;
  vat_rate: number;
  vat_amount: number;
  total: number;
  pdf_file?: string;
}

export interface SearchFilters {
  location?: string;
  latitude?: number;
  longitude?: number;
  date?: string;
  time_from?: string;
  time_to?: string;
  recurring_days?: number[];
  recurring_start?: string;
  recurring_end?: string;
  floor_type?: FloorType;
  has_mirrors?: boolean;
  has_barres?: boolean;
  has_mats?: boolean;
  has_shower?: boolean;
  booking_type?: BookingType;
  price_min?: number;
  price_max?: number;
  sort_by?: 'price_asc' | 'price_desc' | 'distance';
  radius_km?: number;
}

