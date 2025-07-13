import { useSearch } from '@tanstack/react-router';
import { useState, useMemo, useCallback, useEffect } from 'react';

import {
  BookingDetailModal,
  DailySchedule,
  SlotCreationModal,
  WeeklyHeader,
} from './ui';

import { parseDateOrToday } from '~/shared/lib/date/parseDateOrToday';

// Mock data types
export type BookingStatus = 'booked' | 'free' | 'past';

export type TimeSlot = {
  id: string;
  time: string;
  date: string;
  status: BookingStatus;
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

// Constants
export const SLOT_INTERVAL = 1; // 1 hour

export const WORK_START_HOUR = 8;

export const WORK_END_HOUR = 22;

const MasterSchedule = () => {
  const search = useSearch({ from: '/master/schedule' });

  const [selectedDate, setSelectedDate] = useState(
    parseDateOrToday(search.date),
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newSlotData, setNewSlotData] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  // Mock data - in real app this would come from backend
  const mockSlots: TimeSlot[] = useMemo(() => {
    const today = new Date();
    const slots: TimeSlot[] = [];

    // Generate slots for a week
    for (let dayOffset = -3; dayOffset <= 3; dayOffset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset);
      const dateStr = date.toISOString().split('T')[0];

      for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        const slotDateTime = new Date(date);
        slotDateTime.setHours(hour, 0, 0, 0);
        const isPast = slotDateTime < new Date();

        // Mock some bookings
        const isBooked = Math.random() > 0.7 && !isPast;

        slots.push({
          id: `${dateStr}-${timeStr}`,
          time: timeStr,
          date: dateStr,
          status: isPast ? 'past' : isBooked ? 'booked' : 'free',
          isManual: isBooked ? Math.random() > 0.5 : false,
          client: isBooked
            ? {
                id: `client-${Math.random()}`,
                name: ['Anna K.', 'Maria S.', 'Elena P.', 'Sofia M.'][
                  Math.floor(Math.random() * 4)
                ],
                avatar: `https://i.pravatar.cc/40?u=${Math.random()}`,
                telegramHandle:
                  '@' +
                  ['anna_k', 'maria_s', 'elena_p', 'sofia_m'][
                    Math.floor(Math.random() * 4)
                  ],
              }
            : undefined,
          service: isBooked
            ? {
                name: ['Manicure', 'Hair Cut', 'Hair Color', 'Facial'][
                  Math.floor(Math.random() * 4)
                ],
                duration: [1, 2][Math.floor(Math.random() * 2)],
              }
            : undefined,
          comments:
            isBooked && Math.random() > 0.7
              ? 'Special request: please be gentle'
              : undefined,
        });
      }
    }

    return slots;
  }, []);

  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const dailySlots = mockSlots.filter((slot) => slot.date === selectedDateStr);

  // todo: replace with actual data fetching logic
  useEffect(() => {
    // сейчас используем мок-данные, в реальном приложении здесь будет логика получения слотов с сервера
    if (search.date && search.timeSlot) {
      const parsedDate = parseDateOrToday(search.date);
      setSelectedDate(parsedDate);

      const slot = dailySlots.find(
        (s) =>
          s.time === search.timeSlot &&
          s.date === parsedDate.toISOString().split('T')[0],
      );
      if (slot) {
        setSelectedSlot(slot);
        setIsDetailModalOpen(true);
      } else {
        setSelectedSlot(null);
        setIsDetailModalOpen(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSlotClick = useCallback((slot: TimeSlot) => {
    if (slot.status === 'booked') {
      setSelectedSlot(slot);
      setIsDetailModalOpen(true);
    } else if (slot.status === 'free') {
      setNewSlotData({
        date: slot.date,
        time: slot.time,
      });
      setIsCreationModalOpen(true);
    }
  }, []);

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBookingUpdate = useCallback((_updatedSlot: TimeSlot) => {
    // In real app, this would update the backend
    setIsDetailModalOpen(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBookingCancel = useCallback((_slotId: string) => {
    // In real app, this would cancel the booking in backend
    setIsDetailModalOpen(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSlotCreate = useCallback((_slotData: Partial<TimeSlot>) => {
    // In real app, this would create a new booking in backend
    setIsCreationModalOpen(false);
    setNewSlotData(null);
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <WeeklyHeader
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

      <main className="px-4 pb-20">
        <DailySchedule
          slots={dailySlots}
          selectedDate={selectedDate}
          onSlotClick={handleSlotClick}
        />
      </main>

      {/* Booking Detail Modal */}
      <BookingDetailModal
        isOpen={isDetailModalOpen}
        slot={selectedSlot}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdate={handleBookingUpdate}
        onCancel={handleBookingCancel}
      />

      {/* Slot Creation Modal */}
      <SlotCreationModal
        isOpen={isCreationModalOpen}
        initialData={newSlotData}
        onClose={() => {
          setIsCreationModalOpen(false);
          setNewSlotData(null);
        }}
        onCreate={handleSlotCreate}
      />
    </div>
  );
};

export default MasterSchedule;
