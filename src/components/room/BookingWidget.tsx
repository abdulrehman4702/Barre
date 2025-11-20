import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Info } from 'lucide-react';
import type { Room, BookingType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BookingWidgetProps {
  room: Room;
  onBook: (data: BookingData) => void;
}

export interface BookingData {
  date: string;
  timeFrom: string;
  timeTo: string;
  bookingType: BookingType;
}

export function BookingWidget({ room, onBook }: BookingWidgetProps) {
  const { t } = useLanguage();
  const [date, setDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('09:00');
  const [timeTo, setTimeTo] = useState('10:00');
  const [bookingType, setBookingType] = useState<BookingType>('individual');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (date && timeFrom && timeTo) {
      calculatePrice();
    }
  }, [date, timeFrom, timeTo, bookingType]);

  const calculatePrice = () => {
    const from = new Date(`${date}T${timeFrom}`);
    const to = new Date(`${date}T${timeTo}`);
    const hours = (to.getTime() - from.getTime()) / (1000 * 60 * 60);

    if (hours <= 0) {
      setCalculatedPrice(0);
      setServiceFee(0);
      setVatAmount(0);
      setTotalPrice(0);
      return;
    }

    // Base rate
    const baseRate = bookingType === 'individual' 
      ? room.base_rate_individual 
      : room.base_rate_group;

    // Apply dynamic pricing rules (simplified - in production, this would check PricingRules)
    let finalRate = baseRate;
    
    // Example: morning discount (7-11) -20%
    const hour = parseInt(timeFrom.split(':')[0]);
    if (hour >= 7 && hour < 11) {
      finalRate = baseRate * 0.8;
    }

    const baseAmount = finalRate * hours;
    const vat = baseAmount * 0.20; // 20% VAT (simplified)
    const serviceFeeAmount = baseAmount * 0.029 + 0.30; // 2.9% + €0.30
    const total = baseAmount + vat + serviceFeeAmount;

    setCalculatedPrice(baseAmount);
    setVatAmount(vat);
    setServiceFee(serviceFeeAmount);
    setTotalPrice(total);
  };

  const handleBook = () => {
    if (!date || !timeFrom || !timeTo) return;
    
    onBook({
      date,
      timeFrom,
      timeTo,
      bookingType,
    });
  };

  const hours = date && timeFrom && timeTo
    ? (new Date(`${date}T${timeTo}`).getTime() - new Date(`${date}T${timeFrom}`).getTime()) / (1000 * 60 * 60)
    : 0;

  return (
    <div className="card p-6 sticky top-24">
      <h3 className="text-xl font-semibold mb-4">Book this room</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="input-field"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              From
            </label>
            <input
              type="time"
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <input
              type="time"
              value={timeTo}
              onChange={(e) => setTimeTo(e.target.value)}
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Session Type
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setBookingType('individual')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                bookingType === 'individual'
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('room.individual')}
            </button>
            <button
              onClick={() => setBookingType('group')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                bookingType === 'group'
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('room.group')}
            </button>
          </div>
        </div>

        {hours > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base ({hours.toFixed(1)}h × €{calculatedPrice / hours})</span>
                <span>€{calculatedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (20%)</span>
                <span>€{vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service fee</span>
                <span>€{serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-brand-blue">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleBook}
          disabled={!date || !timeFrom || !timeTo || hours <= 0}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('room.book')}
        </button>

        <div className="flex items-start space-x-2 text-xs text-gray-500 pt-2">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Cancellation policy: {room.cancellation_policy.charAt(0).toUpperCase() + room.cancellation_policy.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

