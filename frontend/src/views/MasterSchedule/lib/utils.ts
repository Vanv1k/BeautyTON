import { addHours } from 'date-fns';

import { SLOT_INTERVAL, WORK_END_HOUR, WORK_START_HOUR } from './constants';
import type { DayStatus, TimeSlot } from './types';

import { createDateTimeFromString } from '~/shared/lib/date';

/**
 * Проверяет, прошёл ли временной слот
 */
export const isSlotPast = (date: string, time: string): boolean => {
  const slotDateTime = createDateTimeFromString(date, time);
  return addHours(slotDateTime, SLOT_INTERVAL) < new Date();
};

/**
 * Определяет статус дня для календаря на основе слотов
 */
export const getDayStatusFromSlots = (slots: TimeSlot[]): DayStatus => {
  if (slots.length === 0) {
    return 'inactive';
  }

  const bookedSlots = slots.filter(
    (slot) => slot.status === 'booked' || slot.status === 'pending',
  );
  const totalWorkSlots = slots.filter((slot) => !slot.isPast);

  if (totalWorkSlots.length === 0) {
    return 'inactive';
  }

  const occupancyRate = bookedSlots.length / totalWorkSlots.length;

  if (occupancyRate === 0) {
    return 'free';
  } else if (occupancyRate <= 0.5) {
    return 'light';
  } else {
    return 'heavy';
  }
};

/**
 * Форматирует время для отображения
 */
export const formatTimeSlot = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

/**
 * Генерирует ID для слота
 */
export const generateSlotId = (date: string, time: string): string => {
  return `${date}-${time}`;
};

/**
 * Проверяет, находится ли текущее время в пределах рабочих часов
 */
export const isCurrentTimeInWorkHours = (currentTime: number): boolean => {
  const currentHour = Math.floor(currentTime / 60);
  return currentHour >= WORK_START_HOUR && currentHour < WORK_END_HOUR;
};

/**
 * Проверяет, должна ли отображаться линия текущего времени
 */
export const shouldShowCurrentTimeLine = (
  slots: TimeSlot[],
  currentTime: number,
): boolean => {
  if (slots.length === 0) return false;

  const currentHour = Math.floor(currentTime / 60);
  const hasActiveSlots = slots.some((slot) => {
    const slotHour = parseInt(slot.time.split(':')[0]);
    return slotHour >= WORK_START_HOUR && slotHour < WORK_END_HOUR;
  });

  return (
    hasActiveSlots &&
    currentHour >= WORK_START_HOUR &&
    currentHour < WORK_END_HOUR
  );
};
