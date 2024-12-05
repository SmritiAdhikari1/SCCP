export type Hall = {
  id: string;
  name: string;
  capacity: number;
  description: string;
  image: string;
};

export type TimeSlot = {
  start: string;
  end: string;
};

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export type HallRequest = {
  id: string;
  hallId: string;
  userId: string;
  purpose: string;
  date: string;
  timeSlot: TimeSlot;
  status: RequestStatus;
  createdAt: string;
};