import React, { useState, useEffect } from 'react';
import { useHallContext } from '../context/HallContext';
import { X } from 'lucide-react';
import { AVAILABLE_TIME_SLOTS, formatTimeSlot } from '../utils/timeSlots';
import { TimeSlot } from '../types';

type Props = {
  hallId: string;
  onClose: () => void;
};

export const RequestForm: React.FC<Props> = ({ hallId, onClose }) => {
  const { addRequest, checkTimeSlotAvailability } = useHallContext();
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (date) {
      const available = AVAILABLE_TIME_SLOTS.filter(timeSlot =>
        checkTimeSlotAvailability(date, timeSlot, hallId)
      );
      setAvailableTimeSlots(available);
      setSelectedTimeSlot(null);
    }
  }, [date, hallId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTimeSlot) return;

    addRequest({
      hallId,
      userId: 'user-1',
      purpose,
      date,
      timeSlot: selectedTimeSlot,
    });
    onClose();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Request Hall Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          {date && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableTimeSlots.map((timeSlot) => (
                  <button
                    key={timeSlot.start}
                    type="button"
                    onClick={() => setSelectedTimeSlot(timeSlot)}
                    className={`p-2 border rounded-md text-sm ${
                      selectedTimeSlot?.start === timeSlot.start
                        ? 'bg-blue-100 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {formatTimeSlot(timeSlot)}
                  </button>
                ))}
              </div>
              {availableTimeSlots.length === 0 && (
                <p className="text-red-500 text-sm mt-1">
                  No available time slots for this date
                </p>
              )}
            </div>
          )}
          <button
            type="submit"
            disabled={!selectedTimeSlot}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};