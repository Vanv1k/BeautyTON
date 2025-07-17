import { useDisclosure } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { formatDate } from 'date-fns';
import React, { useState } from 'react';

import {
  DailyHeroPanel,
  MyStatus,
  QuickTools,
  TimeSlotModal,
  TimeSlots,
  UpcomingDays,
  WalletCard,
} from './ui';

type TimeSlot = {
  time: string;
  status: 'booked' | 'free' | 'inactive';
  client?: string | null;
  service?: string | null;
};

const MasterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );

  // Mock data
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const todayAppointments = 3;
  const totalSlots = 6; // Total available slots for today
  const hasMiniApp = false;
  const miniAppVisits = 127;
  const isWalletConnected = true;
  const isDayOff = false; // Set to true to see empty state
  const currentHour = new Date().getHours();

  // Constants
  const SLOT_INTERVAL = 0.5; // 30 minute intervals
  const WORK_START_HOUR = 8;
  const WORK_END_HOUR = 22;

  // Mock time slots for today (08:00-22:00) with 30-minute intervals
  const timeSlots: TimeSlot[] = Array.from(
    { length: (WORK_END_HOUR - WORK_START_HOUR) / SLOT_INTERVAL },
    (_, i) => {
      const totalMinutes = WORK_START_HOUR * 60 + i * (SLOT_INTERVAL * 60);
      const hour = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const currentTotalMinutes = currentHour * 60 + new Date().getMinutes();
      const isPast = totalMinutes < currentTotalMinutes;
      const random1 = Math.random();
      const random2 = Math.random();

      let status: 'booked' | 'free' | 'inactive';
      if (isPast) {
        status = random1 > 0.6 ? 'booked' : 'inactive';
      } else {
        status = random1 > 0.7 ? 'booked' : random2 > 0.4 ? 'free' : 'inactive';
      }

      const clients = ['Anna K.', 'Maria S.', 'Sofia P.'];
      const services = ['Brow Shaping', 'Evening Makeup', 'Bridal Look'];

      return {
        time: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        status,
        client:
          status === 'booked'
            ? clients[Math.floor(Math.random() * clients.length)]
            : null,
        service:
          status === 'booked'
            ? services[Math.floor(Math.random() * services.length)]
            : null,
      };
    },
  );

  // Mock upcoming days
  const upcomingDays = Array.from({ length: 8 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    const bookings = Math.floor(Math.random() * 5);
    const busyness: 'free' | 'moderate' | 'busy' =
      bookings === 0 ? 'free' : bookings <= 2 ? 'moderate' : 'busy';

    return {
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      bookings,
      busyness,
      fullDate: formatDate(date, 'yyyy-MM-dd'),
    };
  });

  const handleTimeSlotPress = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    onOpen();
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen">
      <main className="p-4 space-y-6 pb-20">
        {/* Block 1 - Daily Hero Panel */}
        <DailyHeroPanel
          todayDate={todayDate}
          todayAppointments={todayAppointments}
          totalSlots={totalSlots}
        />

        {/* Block 2 - Time Slots for Today */}
        <TimeSlots
          isDayOff={isDayOff}
          timeSlots={timeSlots}
          currentHour={currentHour}
          workStartHour={WORK_START_HOUR}
          workEndHour={WORK_END_HOUR}
          slotInterval={SLOT_INTERVAL}
          onTimeSlotPress={handleTimeSlotPress}
        />

        {/* Upcoming Days */}
        <UpcomingDays
          upcomingDays={upcomingDays}
          onDayPress={(fullDate) =>
            navigate({ to: '/master/schedule', search: { date: fullDate } })
          }
        />

        {/* My Status */}
        <MyStatus
          hasMiniApp={hasMiniApp}
          miniAppVisits={miniAppVisits}
          onViewProfile={() => navigate({ to: '/master/profile' })}
          onManageMiniApp={() => navigate({ to: '/master/miniapp/create' })}
          onCreateMiniApp={() => navigate({ to: '/master/miniapp/create' })}
        />

        {/* Quick Tools */}
        <QuickTools />

        {/* TON Wallet */}
        <WalletCard isWalletConnected={isWalletConnected} />
      </main>

      {/* Time Slot Modal */}
      <TimeSlotModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedTimeSlot={selectedTimeSlot}
      />
    </div>
  );
};

export default MasterDashboard;
