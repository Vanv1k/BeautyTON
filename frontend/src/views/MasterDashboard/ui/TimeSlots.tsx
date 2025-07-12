import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { Calendar } from 'lucide-react';
import { memo, useCallback } from 'react';

type TimeSlot = {
  time: string;
  status: 'booked' | 'free' | 'inactive';
  client?: string | null;
  service?: string | null;
};

type Props = {
  isDayOff: boolean;
  timeSlots: TimeSlot[];
  currentHour: number;
  workStartHour: number;
  workEndHour: number;
  slotInterval: number;
  onTimeSlotPress: (timeSlot: TimeSlot) => void;
};

const TimeSlots: React.FC<Props> = ({
  isDayOff,
  timeSlots,
  currentHour,
  workStartHour,
  workEndHour,
  slotInterval,
  onTimeSlotPress,
}) => {
  // Calculate current time position and slot index
  const calculateTimePosition = useCallback(() => {
    const currentTotalMinutes = currentHour * 60 + new Date().getMinutes();
    const workStartMinutes = workStartHour * 60;
    const relativeMinutes = currentTotalMinutes - workStartMinutes;
    const slotDurationMinutes = slotInterval * 60;
    const slotIndex = relativeMinutes / slotDurationMinutes;
    const slotWidth = 60; // Width of each slot (w-14) + spacing
    const position = slotIndex * slotWidth;

    return {
      currentTotalMinutes,
      workStartMinutes,
      relativeMinutes,
      slotIndex,
      slotWidth,
      position,
    };
  }, [currentHour, workStartHour, slotInterval]);

  // Auto-scroll to keep current time indicator visible
  const handleAutoScroll = useCallback(
    (el: HTMLDivElement) => {
      const { slotIndex, position } = calculateTimePosition();

      if (slotIndex >= 0 && slotIndex < timeSlots.length) {
        setTimeout(() => {
          const containerWidth = el.offsetWidth;
          const centerPosition = containerWidth / 2;
          const scrollPosition = Math.max(0, position - centerPosition);
          el.scrollLeft = scrollPosition;
        }, 100);
      }
    },
    [calculateTimePosition, timeSlots.length],
  );
  return (
    <Card className="bg-white/80 dark:bg-gray-800/50" isBlurred>
      <CardHeader>
        <h2 className="text-lg font-medium">Today's Schedule</h2>
      </CardHeader>
      <CardBody className="pt-0">
        {isDayOff ? (
          // Empty state for day off
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🧘‍♀️</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Today is your day off
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Enjoy your rest, or update your schedule.
            </p>
            <Button
              variant="flat"
              size="sm"
              startContent={<Calendar className="w-4 h-4" />}
            >
              Update Schedule
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Time slots container */}
            <div className="relative">
              {/* Time slots horizontal scroll */}
              <div
                className="relative flex space-x-1 overflow-x-auto py-2 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
                ref={handleAutoScroll}
              >
                {/* Current time indicator */}
                {(() => {
                  const { currentTotalMinutes, workStartMinutes, position } =
                    calculateTimePosition();
                  const workEndMinutes = workEndHour * 60;

                  if (
                    currentTotalMinutes >= workStartMinutes &&
                    currentTotalMinutes <= workEndMinutes
                  ) {
                    return (
                      <div
                        className="absolute top-1 bottom-1 w-0.5 bg-blue-500 z-20 shadow-sm pointer-events-none"
                        style={{ left: `${position}px` }}
                      />
                    );
                  }
                  return null;
                })()}

                {timeSlots.map((slot) => {
                  const [hours, minutes] = slot.time.split(':').map(Number);
                  const slotTime = hours * 60 + minutes;
                  const currentTime =
                    currentHour * 60 + new Date().getMinutes();
                  const isPast = slotTime + 60 / 2 < currentTime;

                  return (
                    <button
                      key={slot.time}
                      onClick={() => onTimeSlotPress(slot)}
                      className={`flex-shrink-0 w-14 h-12 rounded-lg border-2 flex flex-col items-center justify-center text-xs font-medium transition-all hover:scale-105 ${
                        isPast ? 'opacity-50' : ''
                      } ${
                        slot.status === 'booked'
                          ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
                          : slot.status === 'free'
                            ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
                            : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400'
                      }`}
                    >
                      <span className="text-xs font-semibold">{slot.time}</span>
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          slot.status === 'booked'
                            ? 'bg-red-500'
                            : slot.status === 'free'
                              ? 'bg-green-500'
                              : 'bg-gray-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400 pt-1">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-1.5 bg-red-500" />
                <span>Busy</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-1.5 bg-green-500" />
                <span>Free</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-1.5 bg-gray-400" />
                <span>Inactive</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-0.5 h-3 bg-blue-500" />
                <span>Now</span>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default memo(TimeSlots);
