import React, { createContext, useContext, useState } from 'react';
import { Hall, HallRequest, TimeSlot } from '../types';
import { halls } from '../data/halls';
import { isTimeSlotAvailable } from '../utils/timeSlots';

type HallContextType = {
  halls: Hall[];
  requests: HallRequest[];
  addRequest: (request: Omit<HallRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateRequestStatus: (requestId: string, status: 'approved' | 'rejected') => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
  checkTimeSlotAvailability: (date: string, timeSlot: TimeSlot, hallId: string) => boolean;
};

const HallContext = createContext<HallContextType | undefined>(undefined);

export const HallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<HallRequest[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const addRequest = (request: Omit<HallRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: HallRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [...prev, newRequest]);
  };

  const updateRequestStatus = (requestId: string, status: 'approved' | 'rejected') => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  const checkTimeSlotAvailability = (date: string, timeSlot: TimeSlot, hallId: string) => {
    return isTimeSlotAvailable(date, timeSlot, hallId, requests);
  };

  const toggleAdmin = () => setIsAdmin((prev) => !prev);

  return (
    <HallContext.Provider
      value={{
        halls,
        requests,
        addRequest,
        updateRequestStatus,
        isAdmin,
        toggleAdmin,
        checkTimeSlotAvailability,
      }}
    >
      {children}
    </HallContext.Provider>
  );
};

export const useHallContext = () => {
  const context = useContext(HallContext);
  if (!context) {
    throw new Error('useHallContext must be used within a HallProvider');
  }
  return context;
};