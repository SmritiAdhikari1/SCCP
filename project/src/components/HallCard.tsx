import React from 'react';
import { Hall } from '../types';
import { Calendar } from 'lucide-react';

type Props = {
  hall: Hall;
  onRequest: () => void;
};

export const HallCard: React.FC<Props> = ({ hall, onRequest }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={hall.image}
        alt={hall.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{hall.name}</h3>
        <p className="text-gray-600 mb-2">{hall.description}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Capacity: {hall.capacity} people</span>
        </div>
        <button
          onClick={onRequest}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Request Booking
        </button>
      </div>
    </div>
  );
};