import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { formatDate } from 'date-fns';
import { memo, useCallback } from 'react';

type TimeSlot = {
  time: string;
  status: 'booked' | 'free' | 'inactive';
  client?: string | null;
  service?: string | null;
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedTimeSlot: TimeSlot | null;
};

const TimeSlotModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  selectedTimeSlot,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = useCallback(() => {
    if (selectedTimeSlot) {
      const today = new Date();

      navigate({
        to: '/master/schedule',
        search: {
          timeSlot: selectedTimeSlot.time,
          date: formatDate(today, 'yyyy-MM-dd'),
        },
      });
    }
  }, [navigate, selectedTimeSlot]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Time Slot: {selectedTimeSlot?.time}
            </ModalHeader>
            <ModalBody className="pb-6">
              {selectedTimeSlot?.status === 'booked' ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="font-medium">Booked</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Client: {selectedTimeSlot.client}
                    </p>
                    <p className="text-sm text-gray-600">
                      Service: {selectedTimeSlot.service}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="flat"
                      size="sm"
                      className="flex-1"
                      onPress={handleViewDetails}
                    >
                      View Details
                    </Button>
                    <Button variant="flat" size="sm" className="flex-1">
                      Contact Client
                    </Button>
                  </div>
                </div>
              ) : selectedTimeSlot?.status === 'free' ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="font-medium">Available</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    This time slot is available for bookings.
                  </p>
                  <Button color="primary" className="w-full">
                    Block Time Slot
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    <span className="font-medium">Inactive</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    This time is outside your working hours.
                  </p>
                  <Button variant="flat" className="w-full">
                    Extend Working Hours
                  </Button>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(TimeSlotModal);
