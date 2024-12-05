import { TimeSlot } from '../types';

export const AVAILABLE_TIME_SLOTS: TimeSlot[] = [
  { start: '09:00', end: '11:00' },
  { start: '11:00', end: '13:00' },
  { start: '14:00', end: '16:00' },
  { start: '16:00', end: '18:00' },
  { start: '18:00', end: '20:00' },
];

export const formatTimeSlot = (timeSlot: TimeSlot): string => {
  return `${timeSlot.start} - ${timeSlot.end}`;
};

export const isTimeSlotAvailable = (
  date: string,
  timeSlot: TimeSlot,
  hallId: string,
  existingRequests: any[]
): boolean => {
  return !existingRequests.some(
    (request) =>
      request.hallId === hallId &&
      request.date === date &&
      request.timeSlot.start === timeSlot.start &&
      request.status !== 'rejected'
  );
};