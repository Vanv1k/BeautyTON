export type BookingStatus = 'booked' | 'free';

export type TimeSlot = {
  id: string;
  time: string;
  date: string;
  status: BookingStatus;
  isPast: boolean;
  isManual?: boolean;
  client?: {
    id: string;
    name: string;
    avatar?: string;
    telegramHandle?: string;
  };
  service?: {
    name: string;
    duration: number; // in hours
  };
  comments?: string;
};

export type SlotCreationData = {
  date: string;
  time: string;
};

export type DayStatus = 'free' | 'light' | 'heavy' | 'inactive';
