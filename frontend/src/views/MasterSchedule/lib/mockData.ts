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

      // Mock some bookings with different statuses
      const randomValue = Math.random();
      let status: 'booked' | 'free' | 'pending';
      let isManual = false;
      let clientAttended: boolean | undefined;

      if (randomValue > 0.8) {
        // 20% chance of booking
        if (Math.random() > 0.7) {
          // 30% of future bookings are pending approval
          status = 'pending';
        } else {
          status = 'booked';
          isManual = Math.random() > 0.5;
          // For past booked slots, randomly set if client attended
          if (isPast) {
            clientAttended = Math.random() > 0.2; // 80% attendance rate
          }
        }
      } else {
        status = 'free';
      }

      const hasClient = status === 'booked' || status === 'pending';

      slots.push({
        id: generateSlotId(dateStr, timeStr),
        time: timeStr,
        date: dateStr,
        status,
        isPast,
        isManual,
        clientAttended,
        client: hasClient
          ? {
              id: `client-${Math.random()}`,
              name: MOCK_CLIENT_NAMES[
                Math.floor(Math.random() * MOCK_CLIENT_NAMES.length)
              ],
              avatar: `https://i.pravatar.cc/40?u=${Math.random()}`,
              telegramHandle:
                MOCK_TELEGRAM_HANDLES[
                  Math.floor(Math.random() * MOCK_TELEGRAM_HANDLES.length)
                ],
            }
          : undefined,
        service: hasClient
          ? {
              name: MOCK_SERVICES[
                Math.floor(Math.random() * MOCK_SERVICES.length)
              ],
              duration: [1, 2][Math.floor(Math.random() * 2)],
            }
          : undefined,
        comments:
          hasClient && Math.random() > 0.7
            ? status === 'pending'
              ? 'Please confirm if you can take this appointment'
              : 'Special request: please be gentle'
            : undefined,
      });
    }
  }

  return slots;
};
