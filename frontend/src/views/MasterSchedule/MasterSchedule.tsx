import { useSearch } from '@tanstack/react-router';
import { useState, useCallback, useEffect } from 'react';

import { useScheduleSlots, useDayStatus, useModalsManager } from './model';
import {
  BookingDetailModal,
  DailySchedule,
  SlotFormModal,
  WeeklyHeader,
  ConfirmationModal,
} from './ui';

import { parseDateOrToday } from '~/shared/lib/date';

const MasterSchedule = () => {
  const search = useSearch({ from: '/master/schedule' });
  const { getSlotsByDate } = useScheduleSlots();
  const { getDayStatus } = useDayStatus();

  // Use modals manager hook
  const {
    selectedSlot,
    isDetailModalOpen,
    newSlotData,
    isCreationModalOpen,
    isEditModalOpen,
    editSlot,
    isConfirmationModalOpen,
    confirmationConfig,
    handleSlotClick,
    handleBookingUpdate,
    handleBookingCancel,
    handleSlotCreate,
    handleSlotUpdate,
    handlePendingConfirm,
    handlePendingDecline,
    handleEdit,
    handleRemind,
    closeAllModals,
  } = useModalsManager();

  const [selectedDate, setSelectedDate] = useState(
    parseDateOrToday(search.date),
  );

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
        // Use the hook's handler to properly open the detail modal
        handleSlotClick(slot);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

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

      {/* Booking Detail Modal (for pending and booked slots) */}
      <BookingDetailModal
        isOpen={isDetailModalOpen}
        slot={selectedSlot}
        onClose={closeAllModals}
        onUpdate={handleBookingUpdate}
        onCancel={handleBookingCancel}
        onConfirm={handlePendingConfirm}
        onDecline={handlePendingDecline}
        onEdit={handleEdit}
        onRemind={handleRemind}
      />

      {/* Slot Creation Modal */}
      <SlotFormModal
        isOpen={isCreationModalOpen}
        mode="create"
        initialData={newSlotData}
        onClose={closeAllModals}
        onCreate={handleSlotCreate}
      />

      {/* Slot Edit Modal */}
      <SlotFormModal
        isOpen={isEditModalOpen}
        mode="edit"
        editSlot={editSlot}
        onClose={closeAllModals}
        onUpdate={handleSlotUpdate}
      />

      {/* Confirmation Modal */}
      {confirmationConfig && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeAllModals}
          onConfirm={confirmationConfig.onConfirm}
          title={confirmationConfig.title}
          message={confirmationConfig.message}
          confirmButtonText={confirmationConfig.confirmButtonText}
          confirmButtonColor={confirmationConfig.confirmButtonColor}
          isDestructive={confirmationConfig.isDestructive}
        />
      )}
    </div>
  );
};

export default MasterSchedule;
