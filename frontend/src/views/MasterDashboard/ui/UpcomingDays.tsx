import { Card, CardBody } from '@heroui/react';
import { memo } from 'react';

type UpcomingDay = {
  weekday: string;
  date: number;
  bookings: number;
  busyness: 'free' | 'moderate' | 'busy';
  fullDate: string;
};

type Props = {
  upcomingDays: UpcomingDay[];
  onDayPress: (fullDate: string) => void;
};

const UpcomingDays: React.FC<Props> = ({ upcomingDays, onDayPress }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Upcoming Days
      </h2>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {upcomingDays.map((day, index) => (
          <Card
            key={index}
            isPressable
            isBlurred
            onPress={() => onDayPress(day.fullDate)}
            className={`min-w-[80px] shadow-md bg-white/80 dark:bg-gray-800/50 ${
              day.busyness === 'busy'
                ? 'border-red-200 dark:border-red-400'
                : day.busyness === 'moderate'
                  ? 'border-orange-200 dark:border-orange-400'
                  : 'border-green-200 dark:border-green-400'
            }`}
          >
            <CardBody className="p-3 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {day.weekday}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {day.date}
              </div>
              <div
                className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                  day.busyness === 'busy'
                    ? 'bg-red-500'
                    : day.busyness === 'moderate'
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                }`}
              />
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {day.bookings} booked
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default memo(UpcomingDays);
