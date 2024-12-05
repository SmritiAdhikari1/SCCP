import React, { useState } from 'react';
import { useHallContext } from '../context/HallContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AVAILABLE_TIME_SLOTS } from '../utils/timeSlots';
import { TimeSlot } from '../types';

export const CalendarView: React.FC = () => {
  const { halls, requests } = useHallContext();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getSlotStatus = (hallId: string, timeSlot: TimeSlot) => {
    const request = requests.find(
      (r) =>
        r.hallId === hallId &&
        r.date === selectedDate &&
        r.timeSlot.start === timeSlot.start
    );

    if (!request) return 'available';
    return request.status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'pending':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 border-red-500 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Booking Calendar</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => changeDate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md px-3 py-1"
          />
          <button
            onClick={() => changeDate(1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-50 text-left">Hall</th>
              {AVAILABLE_TIME_SLOTS.map((slot) => (
                <th key={slot.start} className="px-4 py-2 bg-gray-50">
                  {slot.start} - {slot.end}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr key={hall.id} className="border-t">
                <td className="px-4 py-2 font-medium">{hall.name}</td>
                {AVAILABLE_TIME_SLOTS.map((slot) => {
                  const status = getSlotStatus(hall.id, slot);
                  const request = requests.find(
                    (r) =>
                      r.hallId === hall.id &&
                      r.date === selectedDate &&
                      r.timeSlot.start === slot.start
                  );

                  return (
                    <td key={slot.start} className="px-4 py-2">
                      <div
                        className={`border rounded-md p-2 text-sm text-center ${getStatusColor(
                          status
                        )}`}
                      >
                        {status !== 'available' && (
                          <div className="truncate max-w-[150px]">
                            {request?.purpose}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};