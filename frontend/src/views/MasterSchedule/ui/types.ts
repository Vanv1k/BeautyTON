import type { TimeSlot, SlotCreationData, DayStatus } from '../lib';

// DailySchedule component props
export type DailyScheduleProps = {
  slots: TimeSlot[];
  selectedDate: Date;
  onSlotClick: (slot: TimeSlot) => void;
};

// WeeklyHeader component props
export type WeeklyHeaderProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  getDayStatus?: (date: Date) => DayStatus;
};

// BookingDetailModal component props
export type BookingDetailModalProps = {
  isOpen: boolean;
  slot: TimeSlot | null;
  onClose: () => void;
  onUpdate: (slot: TimeSlot) => void;
  onCancel: (slotId: string) => void;
};

// SlotCreationModal component props
export type SlotCreationModalProps = {
  isOpen: boolean;
  initialData: { date: string; time: string } | null;
  onClose: () => void;
  onCreate: (slotData: SlotCreationData) => void;
};

// CalendarModal component props
export type CalendarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  viewDate: Date;
  onDateSelect: (date: Date) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  getDayStatus?: (date: Date) => DayStatus;
};
