import { Button } from '@heroui/react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useMemo, useCallback } from 'react';

import type { DayStatus } from '../lib';

import { useCalendarModal } from './lib';
import { CalendarModal } from './modals';

type Props = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  getDayStatus?: (date: Date) => DayStatus;
};

const WeeklyHeader: React.FC<Props> = ({
  selectedDate,
  onDateChange,
  getDayStatus,
}) => {
  const calendarModal = useCalendarModal({
    selectedDate,
    onDateSelect: onDateChange,
  });
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  }, [selectedDate]);

  const today = new Date();

  const isPastDate = (date: Date) => {
    const dateOnly = new Date(date);
    dateOnly.setHours(23, 59, 59, 999); // End of day
    return dateOnly < today;
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const goToPreviousWeek = useCallback(() => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    onDateChange(newDate);
  }, [selectedDate, onDateChange]);

  const goToNextWeek = useCallback(() => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    onDateChange(newDate);
  }, [selectedDate, onDateChange]);

  const handleDayClick = useCallback(
    (date: Date) => {
      onDateChange(date);
    },
    [onDateChange],
  );

  const formatDayName = (date: Date) => {
    return date.toLocaleDateString('en', { weekday: 'short' });
  };

  const formatDayNumber = (date: Date) => {
    return date.getDate();
  };

  return (
    <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-3">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            onPress={goToPreviousWeek}
            className="bg-white/60 dark:bg-gray-800/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="flat"
            size="sm"
            onPress={calendarModal.openCalendar}
            startContent={<Calendar className="w-4 h-4" />}
            className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          >
            Calendar
          </Button>

          <Button
            isIconOnly
            variant="flat"
            size="sm"
            onPress={goToNextWeek}
            className="bg-white/60 dark:bg-gray-800/60"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Week days */}
        <div className="flex justify-between space-x-0.5">
          {weekDays.map((date) => {
            const isCurrentDay = isToday(date);
            const isSelectedDay = isSelected(date);
            const isPast = isPastDate(date);

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDayClick(date)}
                className={`flex-1 min-w-0 h-14 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all hover:scale-105 ${
                  isSelectedDay
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : isCurrentDay
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800'
                      : isPast
                        ? 'bg-gray-100 dark:bg-gray-800/30 text-gray-400 dark:text-gray-500'
                        : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80'
                }`}
              >
                <span className="text-xs font-medium">
                  {formatDayName(date)}
                </span>
                <span className="text-sm font-bold mt-0.5">
                  {formatDayNumber(date)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <CalendarModal
        isOpen={calendarModal.isOpen}
        onClose={calendarModal.closeCalendar}
        viewDate={calendarModal.viewDate}
        onDateSelect={calendarModal.handleDateSelect}
        onPreviousMonth={calendarModal.goToPreviousMonth}
        onNextMonth={calendarModal.goToNextMonth}
        getDayStatus={getDayStatus}
      />
    </div>
  );
};

export default WeeklyHeader;
