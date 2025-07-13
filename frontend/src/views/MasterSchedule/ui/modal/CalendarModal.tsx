import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';

type DayStatus = 'free' | 'light' | 'heavy' | 'inactive';

type CalendarDay = {
  date: Date;
  status: DayStatus;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  getDayStatus?: (date: Date) => DayStatus;
};

const CalendarModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect,
  getDayStatus = () => 'free',
}) => {
  const [viewDate, setViewDate] = useState(() => new Date(selectedDate));

  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Start from Monday of the week containing the first day
    const startDate = new Date(firstDay);
    const startDayOfWeek = firstDay.getDay();
    const daysFromMonday = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    startDate.setDate(firstDay.getDate() - daysFromMonday);

    // End on Sunday of the week containing the last day
    const endDate = new Date(lastDay);
    const endDayOfWeek = lastDay.getDay();
    const daysToSunday = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
    endDate.setDate(lastDay.getDate() + daysToSunday);

    const days: CalendarDay[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const date = new Date(currentDate);
      const isCurrentMonth = date.getMonth() === month;
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      const isPast = date < today && !isToday;
      const status = getDayStatus(date);

      days.push({
        date,
        status,
        isCurrentMonth,
        isToday,
        isPast,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }, [viewDate, getDayStatus]);

  const monthYear = useMemo(() => {
    return viewDate.toLocaleDateString('en', {
      month: 'long',
      year: 'numeric',
    });
  }, [viewDate]);

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

  const handleDayClick = useCallback(
    (day: CalendarDay) => {
      onDateSelect(day.date);
      onClose();
    },
    [onDateSelect, onClose],
  );

  const getDayClassName = useCallback((day: CalendarDay) => {
    const baseClasses =
      'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all hover:scale-105 cursor-pointer';

    if (!day.isCurrentMonth) {
      return `${baseClasses} text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/30`;
    }

    let statusClasses = '';
    if (day.isPast) {
      // Past dates - more muted colors
      switch (day.status) {
        case 'free':
          statusClasses =
            'bg-green-100/50 text-green-600/70 dark:bg-green-900/10 dark:text-green-400/70';
          break;
        case 'light':
          statusClasses =
            'bg-orange-100/50 text-orange-600/70 dark:bg-orange-900/10 dark:text-orange-400/70';
          break;
        case 'heavy':
          statusClasses =
            'bg-red-100/50 text-red-600/70 dark:bg-red-900/10 dark:text-red-400/70';
          break;
        default:
          statusClasses =
            'bg-gray-100/50 text-gray-500/70 dark:bg-gray-800/30 dark:text-gray-400/70';
      }
    } else {
      // Future dates - full colors
      switch (day.status) {
        case 'free':
          statusClasses =
            'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
          break;
        case 'light':
          statusClasses =
            'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
          break;
        case 'heavy':
          statusClasses =
            'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
          break;
        default:
          statusClasses =
            'bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700';
      }
    }

    if (day.isToday) {
      statusClasses +=
        ' ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900';
    }

    return `${baseClasses} ${statusClasses}`;
  }, []);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      classNames={{
        backdrop: 'bg-black/20 backdrop-blur-sm',
        base: 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            onPress={goToPreviousMonth}
            className="bg-white/60 dark:bg-gray-800/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <h3 className="text-lg font-semibold">{monthYear}</h3>

          <Button
            isIconOnly
            variant="flat"
            size="sm"
            onPress={goToNextMonth}
            className="bg-white/60 dark:bg-gray-800/60"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="w-10 h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day)}
                className={getDayClassName(day)}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-green-200 dark:bg-green-800" />
                <span>Free</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-orange-200 dark:bg-orange-800" />
                <span>Busy</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-red-200 dark:bg-red-800" />
                <span>Full</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded ring-2 ring-blue-500" />
                <span>Today</span>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="flat"
            onPress={onClose}
            className="bg-gray-100 dark:bg-gray-800 mx-auto"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(CalendarModal);
