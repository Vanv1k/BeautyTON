import { useState, useCallback } from 'react';

type UseCalendarModalProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
};

export const useCalendarModal = ({
  selectedDate,
  onDateSelect,
}: UseCalendarModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => new Date(selectedDate));

  const openCalendar = useCallback(() => {
    setIsOpen(true);
    setViewDate(new Date(selectedDate)); // Reset view to selected date
  }, [selectedDate]);

  const closeCalendar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDateSelect = useCallback(
    (date: Date) => {
      onDateSelect(date);
      closeCalendar();
    },
    [onDateSelect, closeCalendar],
  );

  const goToPreviousMonth = useCallback(() => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  }, []);

  return {
    isOpen,
    viewDate,
    openCalendar,
    closeCalendar,
    handleDateSelect,
    goToPreviousMonth,
    goToNextMonth,
  };
};
