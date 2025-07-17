export type BookingStatus = 'booked' | 'free' | 'pending';

export type TimeSlot = {
  id: string;
  time: string;
  date: string;
  status: BookingStatus;
  isPast: boolean;
  isManual?: boolean;
  clientAttended?: boolean; // Для прошедших сеансов - пришел ли клиент
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
  client?: {
    name: string;
    telegramHandle?: string;
  };
  service?: {
    name: string;
    duration: number;
  };
  comments?: string;
};

export type DayStatus = 'free' | 'light' | 'heavy' | 'inactive';
