import { useCallback } from 'react';

import { getDayStatusFromSlots } from '../lib';

import { useScheduleSlots } from './useScheduleSlots';

/**
 * Хук для определения статуса дня в календаре
 */
export const useDayStatus = () => {
  const { slots } = useScheduleSlots();

  const getDayStatus = useCallback(
    (date: Date) => {
      const dateStr = date.toISOString().split('T')[0];
      const daySlots = slots.filter((slot) => slot.date === dateStr);
      return getDayStatusFromSlots(daySlots);
    },
    [slots],
  );

  return { getDayStatus };
};
