import { useMemo } from 'react';

import { generateMockSlots } from '../lib';

/**
 * Хук для работы со слотами расписания
 * В реальном приложении здесь будет логика получения данных с сервера
 */
export const useScheduleSlots = () => {
  // В реальном приложении здесь будет useQuery или другой механизм загрузки данных
  const slots = useMemo(() => generateMockSlots(), []);

  const getSlotsByDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return slots.filter((slot) => slot.date === dateStr);
  };

  const findSlot = (date: string, time: string) => {
    return slots.find((slot) => slot.date === date && slot.time === time);
  };

  return {
    slots,
    getSlotsByDate,
    findSlot,
  };
};
