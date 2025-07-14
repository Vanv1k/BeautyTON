import {
  WORK_START_HOUR,
  WORK_END_HOUR,
  MOCK_CLIENT_NAMES,
  MOCK_TELEGRAM_HANDLES,
  MOCK_SERVICES,
} from './constants';
import type { TimeSlot } from './types';
import { formatTimeSlot, generateSlotId, isSlotPast } from './utils';

/**
 * Генерирует мок-данные для слотов расписания
 */
export const generateMockSlots = (): TimeSlot[] => {
  const today = new Date();
  const slots: TimeSlot[] = [];

  // Generate slots for a week
  for (let dayOffset = -3; dayOffset <= 3; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dateStr = date.toISOString().split('T')[0];

    for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
      const timeStr = formatTimeSlot(hour);
      const isPast = isSlotPast(dateStr, timeStr);

      // Mock some bookings
      const isBooked = Math.random() > 0.7;

      slots.push({
        id: generateSlotId(dateStr, timeStr),
        time: timeStr,
        date: dateStr,
        status: isBooked ? 'booked' : 'free',
        isPast,
        isManual: isBooked ? Math.random() > 0.5 : false,
        client: isBooked
          ? {
              id: `client-${Math.random()}`,
              name: MOCK_CLIENT_NAMES[
                Math.floor(Math.random() * MOCK_CLIENT_NAMES.length)
              ],
              avatar: `https://i.pravatar.cc/40?u=${Math.random()}`,
              telegramHandle:
                '@' +
                MOCK_TELEGRAM_HANDLES[
                  Math.floor(Math.random() * MOCK_TELEGRAM_HANDLES.length)
                ],
            }
          : undefined,
        service: isBooked
          ? {
              name: MOCK_SERVICES[
                Math.floor(Math.random() * MOCK_SERVICES.length)
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
};
