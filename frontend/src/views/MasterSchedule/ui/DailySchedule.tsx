import { Avatar, Card, CardBody } from '@heroui/react';
import { Clock, User } from 'lucide-react';
import { useMemo, useCallback } from 'react';

import type { TimeSlot } from '../MasterSchedule';

type Props = {
  slots: TimeSlot[];
  selectedDate: Date;
  onSlotClick: (slot: TimeSlot) => void;
};

const DailySchedule: React.FC<Props> = ({
  slots,
  selectedDate,
  onSlotClick,
}) => {
  const currentTime = useMemo(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }, []);

  const isToday = useMemo(() => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  }, [selectedDate]);

  const isDayOff = slots.length === 0;

  const handleSlotClick = useCallback(
    (slot: TimeSlot) => {
      onSlotClick(slot);
    },
    [onSlotClick],
  );

  if (isDayOff) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/50 mt-4" isBlurred>
        <CardBody className="text-center py-12">
          <div className="text-6xl mb-4">🧘‍♀️</div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No appointments today
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Take some rest or update your schedule.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-2 mt-4">
      {/* Current time indicator line for today */}
      {isToday && (
        <div className="relative">
          <div
            className="absolute left-20 right-4 h-0.5 bg-blue-500 z-10 shadow-sm"
            style={{
              top: `${(currentTime / 60 - 8) * 76 + (Math.floor(currentTime / 60) - 8) * 8}px`, // 76px per hour, 8px gap per slot
            }}
          />
          <div
            className="absolute w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm z-10"
            style={{
              left: '68px',
              top: `${(currentTime / 60 - 8) * 76 + (Math.floor(currentTime / 60) - 8) * 8 - 5}px`,
            }}
          />
        </div>
      )}

      {slots.map((slot) => {
        const isPastSlot = slot.isPast;

        return (
          <button
            key={slot.id}
            onClick={() => handleSlotClick(slot)}
            className={`w-full text-left transition-all hover:scale-[1.02] ${
              isPastSlot ? 'opacity-50' : ''
            }`}
          >
            <Card
              className={`${
                isPastSlot
                  ? 'bg-gray-50/60 dark:bg-gray-800/30 border-gray-300/50 dark:border-gray-600/50'
                  : slot.status === 'booked'
                    ? 'bg-red-50/80 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : 'bg-green-50/80 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              } border-2 hover:shadow-md`}
              isBlurred
            >
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  {/* Time */}
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col items-center">
                      <Clock className="w-4 h-4 text-gray-500 mb-1" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {slot.time}
                      </span>
                    </div>

                    {/* Status indicator */}
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isPastSlot
                          ? 'bg-gray-400'
                          : slot.status === 'booked'
                            ? 'bg-red-500'
                            : 'bg-green-500'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-4">
                    {slot.status === 'booked' && slot.client ? (
                      <div className="flex items-center space-x-3">
                        <Avatar
                          src={slot.client.avatar}
                          name={slot.client.name}
                          size="sm"
                          className="flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {slot.client.name}
                              </p>
                              {slot.service && (
                                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                  {slot.service.name} • {slot.service.duration}h
                                </p>
                              )}
                            </div>
                            {(slot.isManual || isPastSlot) && (
                              <div className="flex flex-col space-y-1 ml-2">
                                {slot.isManual && (
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                    ✍️ Manual
                                  </span>
                                )}
                                {isPastSlot && (
                                  <span className="text-xs bg-gray-100 dark:bg-gray-800/50 text-gray-500 px-2 py-0.5 rounded-full">
                                    Completed
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : slot.status === 'free' ? (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                          {isPastSlot ? 'Was available' : 'Available'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {isPastSlot ? 'Tap to add booking' : 'Tap to book'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Inactive</span>
                      </div>
                    )}
                  </div>

                  {/* Action indicator */}
                  {!isPastSlot && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-current opacity-30 rounded-full" />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </button>
        );
      })}
    </div>
  );
};

export default DailySchedule;
