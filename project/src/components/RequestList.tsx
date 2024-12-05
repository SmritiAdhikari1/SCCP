import React from 'react';
import { useHallContext } from '../context/HallContext';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatTimeSlot } from '../utils/timeSlots';

export const RequestList: React.FC = () => {
  const { requests, halls, updateRequestStatus, isAdmin } = useHallContext();

  const getHallName = (hallId: string) => {
    return halls.find((hall) => hall.id === hallId)?.name || 'Unknown Hall';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Hall Requests</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="border rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{getHallName(request.hallId)}</h3>
              <div className="flex items-center gap-2">
                {getStatusIcon(request.status)}
                <span className="capitalize">{request.status}</span>
              </div>
            </div>
            <p className="text-gray-600">Purpose: {request.purpose}</p>
            <div className="flex gap-4">
              <p className="text-gray-600">Date: {new Date(request.date).toLocaleDateString()}</p>
              <p className="text-gray-600">Time: {formatTimeSlot(request.timeSlot)}</p>
            </div>
            {isAdmin && request.status === 'pending' && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => updateRequestStatus(request.id, 'approved')}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateRequestStatus(request.id, 'rejected')}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-gray-500 text-center py-4">No requests yet</p>
        )}
      </div>
    </div>
  );
};