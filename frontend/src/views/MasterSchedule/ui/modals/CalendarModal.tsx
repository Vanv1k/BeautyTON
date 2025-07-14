import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo, useCallback } from 'react';

import type { DayStatus } from '../../lib';
import { useCalendarData, type CalendarDay } from '../lib';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  viewDate: Date;
  onDateSelect: (date: Date) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  getDayStatus?: (date: Date) => DayStatus;
};

const CalendarModal: React.FC<Props> = ({
  isOpen,
  onClose,
  viewDate,
  onDateSelect,
  onPreviousMonth,
  onNextMonth,
  getDayStatus = () => 'free',
}) => {
  const { calendarDays, monthYear, getDayClassName } = useCalendarData({
    viewDate,
    getDayStatus,
  });

  const handleDayClick = useCallback(
    (day: CalendarDay) => {
      onDateSelect(day.date);
    },
    [onDateSelect],
  );

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      classNames={{
        backdrop: 'bg-black/20 backdrop-blur-sm',
        base: 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            onPress={onPreviousMonth}
            className="bg-white/60 dark:bg-gray-800/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <h3 className="text-lg font-semibold">{monthYear}</h3>

          <Button
            isIconOnly
            variant="flat"
            size="sm"
            onPress={onNextMonth}
            className="bg-white/60 dark:bg-gray-800/60"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="w-10 h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day)}
                className={getDayClassName(day)}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-green-200 dark:bg-green-800" />
                <span>Free</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-orange-200 dark:bg-orange-800" />
                <span>Busy</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-red-200 dark:bg-red-800" />
                <span>Full</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded ring-2 ring-blue-500" />
                <span>Today</span>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="flat"
            onPress={onClose}
            className="bg-gray-100 dark:bg-gray-800"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(CalendarModal);
