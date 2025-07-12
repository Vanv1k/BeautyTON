import { BarChart3, Zap } from 'lucide-react';
import { memo } from 'react';

type Props = {
  todayDate: string;
  todayAppointments: number;
  totalSlots: number;
};

const DailyHeroPanel: React.FC<Props> = ({
  todayDate,
  todayAppointments,
  totalSlots,
}) => {
  return (
    <div className="flex flex-col items-center space-y-3 py-3">
      <h1 className="text-3xl font-light text-gray-900 dark:text-white">
        {todayDate}
      </h1>
      <div className="flex items-center space-x-2">
        <BarChart3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Today: {todayAppointments} / {totalSlots} slots booked
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Zap className="w-4 h-4 text-pink-500" />
        <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
          Make beauty, not burnout
        </span>
      </div>
    </div>
  );
};

export default memo(DailyHeroPanel);
