import type { Room } from '../../types';

interface TimelineProps {
  room: Room;
  selectedDate?: string;
  onTimeSelect?: (from: string, to: string) => void;
}

export function Timeline({ selectedDate }: TimelineProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Mock availability - in production, this would check AvailabilityRules and Bookings
  const isAvailable = (hour: number) => {
    // Example: available 7-22
    return hour >= 7 && hour < 22;
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Availability</h3>
      {selectedDate ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-gray-600">Select time slot</span>
            <span className="text-gray-500">{selectedDate}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            {hours.map((hour) => {
              const available = isAvailable(hour);
              return (
                <div
                  key={hour}
                  className={`h-12 rounded text-xs flex items-center justify-center ${
                    available
                      ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  title={available ? `${hour}:00 - Available` : 'Not available'}
                >
                  {hour}
                </div>
              );
            })}
          </div>
          <div className="flex items-center space-x-4 mt-4 text-xs text-gray-600">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 rounded mr-2" />
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 rounded mr-2" />
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Select a date to view availability</p>
      )}
    </div>
  );
}

