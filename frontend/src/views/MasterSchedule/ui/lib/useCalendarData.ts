import { useMemo, useCallback } from 'react';

export type DayStatus = 'free' | 'light' | 'heavy' | 'inactive';

export interface CalendarDay {
  date: Date;
  status: DayStatus;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

interface UseCalendarDataProps {
  viewDate: Date;
  getDayStatus?: (date: Date) => DayStatus;
}

export const useCalendarData = ({
  viewDate,
  getDayStatus,
}: UseCalendarDataProps) => {
  const today = useMemo(() => new Date(), []);

  const monthYear = useMemo(() => {
    return viewDate.toLocaleDateString('en', {
      month: 'long',
      year: 'numeric',
    });
  }, [viewDate]);

  const calendarDays = useMemo(() => {
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
      const status = getDayStatus ? getDayStatus(date) : 'free';

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
  }, [viewDate, getDayStatus, today]);

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

  return {
    calendarDays,
    monthYear,
    getDayClassName,
  };
};
