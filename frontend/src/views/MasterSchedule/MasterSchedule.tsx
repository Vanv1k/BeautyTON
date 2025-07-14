import { useSearch } from '@tanstack/react-router';
import { useState, useCallback, useEffect } from 'react';

import type { TimeSlot, SlotCreationData } from './lib';
import { useScheduleSlots, useDayStatus } from './model';
import {
  BookingDetailModal,
  DailySchedule,
  SlotCreationModal,
  WeeklyHeader,
  SlotInfoModal,
} from './ui';

import { parseDateOrToday } from '~/shared/lib/date';

const MasterSchedule = () => {
  const search = useSearch({ from: '/master/schedule' });
  const { getSlotsByDate } = useScheduleSlots();
  const { getDayStatus } = useDayStatus();

  const [selectedDate, setSelectedDate] = useState(
    parseDateOrToday(search.date),
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSlotInfoModalOpen, setIsSlotInfoModalOpen] = useState(false);
  const [newSlotData, setNewSlotData] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  const dailySlots = getSlotsByDate(selectedDate);

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
    if (slot.status === 'booked' || slot.status === 'pending') {
      setSelectedSlot(slot);
      setIsSlotInfoModalOpen(true);
    } else {
      // Allow creating bookings in both past and future free slots
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
  const handleSlotCreate = useCallback((_slotData: SlotCreationData) => {
    // In real app, this would create a new booking in backend
    setIsCreationModalOpen(false);
    setNewSlotData(null);
  }, []);

  const handlePendingConfirm = useCallback(
    (slotId: string, comment?: string) => {
      // In real app, this would confirm the pending booking in backend
      // The comment would be sent to the client via bot notification
      // TODO: API call to confirm booking with slotId and comment
      void slotId;
      void comment;
      setIsSlotInfoModalOpen(false);
      setSelectedSlot(null);
    },
    [],
  );

  const handlePendingDecline = useCallback(
    (slotId: string, comment?: string) => {
      // In real app, this would decline the pending booking in backend
      // The comment would be sent to the client via bot notification
      // TODO: API call to decline booking with slotId and comment
      void slotId;
      void comment;
      setIsSlotInfoModalOpen(false);
      setSelectedSlot(null);
    },
    [],
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <WeeklyHeader
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        getDayStatus={getDayStatus}
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

      {/* Slot Info Modal (for pending and booked slots) */}
      <SlotInfoModal
        isOpen={isSlotInfoModalOpen}
        slot={selectedSlot}
        onClose={() => setIsSlotInfoModalOpen(false)}
        onConfirm={handlePendingConfirm}
        onDecline={handlePendingDecline}
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
