import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Divider,
  Alert,
} from '@heroui/react';
import {
  MessageCircle,
  Edit,
  X,
  Calendar,
  Clock,
  CheckCircle,
  Bell,
  Sparkles,
} from 'lucide-react';
import { useCallback, useMemo } from 'react';

import type { TimeSlot } from '../../lib';

type Props = {
  isOpen: boolean;
  slot: TimeSlot | null;
  onClose: () => void;
  onUpdate?: (slot: TimeSlot) => void;
  onCancel?: (slotId: string) => void;
  onConfirm?: (slotId: string, comment?: string) => void;
  onDecline?: (slotId: string, comment?: string) => void;
  onEdit?: (slot: TimeSlot) => void;
  onRemind?: (slotId: string) => void;
};

const BookingDetailModal: React.FC<Props> = ({
  isOpen,
  slot,
  onClose,
  onCancel,
  onConfirm,
  onDecline,
  onEdit,
  onRemind,
}) => {
  // Check if the booking is in the past
  const isPastBooking = useMemo(() => {
    if (!slot) return false;

    const bookingDate = new Date(slot.date);
    const [hours, minutes] = slot.time.split(':').map(Number);
    bookingDate.setHours(hours, minutes, 0, 0);

    return bookingDate < new Date();
  }, [slot]);

  const isPendingSlot = slot?.status === 'pending';
  const isBookedSlot = slot?.status === 'booked';

  const getModalTitle = () => {
    if (isPendingSlot) {
      return 'Pending Booking Request';
    }
    if (isBookedSlot && isPastBooking) {
      return 'Past Appointment';
    }
    if (isBookedSlot) {
      return 'Confirmed Booking';
    }
    return 'Appointment Details';
  };

  const getAttendanceAlert = () => {
    if (!isPastBooking || !isBookedSlot || slot.clientAttended === undefined) {
      return null;
    }

    return (
      <Alert
        color={slot.clientAttended ? 'success' : 'danger'}
        variant="flat"
        className="mb-4"
      >
        {slot.clientAttended
          ? 'Client attended the appointment'
          : 'Client did not show up for the appointment'}
      </Alert>
    );
  };

  const handleMessageClient = useCallback(() => {
    if (slot?.client?.telegramHandle) {
      // Open Telegram chat
      window.open(
        `https://t.me/${slot.client.telegramHandle.replace('@', '')}`,
        '_blank',
      );
    }
  }, [slot]);

  const handleEdit = useCallback(() => {
    if (slot && onEdit) {
      onEdit(slot);
    }
  }, [slot, onEdit]);

  const handleCancel = useCallback(() => {
    if (slot && onCancel) {
      onCancel(slot.id);
    }
  }, [slot, onCancel]);

  const handleConfirm = useCallback(() => {
    if (slot && onConfirm) {
      onConfirm(slot.id);
    }
  }, [slot, onConfirm]);

  const handleDecline = useCallback(() => {
    if (slot && onDecline) {
      onDecline(slot.id);
    }
  }, [slot, onDecline]);

  const handleRemind = useCallback(() => {
    if (slot && onRemind) {
      onRemind(slot.id);
    }
  }, [slot, onRemind]);

  if (!slot || (slot.status !== 'booked' && slot.status !== 'pending')) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      placement="bottom-center"
      classNames={{
        base: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl',
        backdrop: 'bg-black/50',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isPendingSlot
                      ? 'bg-yellow-500'
                      : isPastBooking
                        ? 'bg-gray-400'
                        : 'bg-red-500'
                  }`}
                />
                <h3 className="text-lg font-semibold">{getModalTitle()}</h3>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{new Date(slot.date).toLocaleDateString()}</span>
                <Clock className="w-4 h-4 ml-2" />
                <span>{slot.time}</span>
              </div>
            </ModalHeader>

            <ModalBody className="py-2">
              {/* Expired pending booking warning */}
              {isPastBooking && isPendingSlot && (
                <Alert color="warning" variant="flat" className="mb-3">
                  This booking request has expired as the appointment time has
                  passed.
                </Alert>
              )}

              {/* Attendance Alert for past booked slots */}
              {getAttendanceAlert()}

              {/* Client Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
                <Avatar
                  src={slot.client?.avatar}
                  name={slot.client?.name}
                  size="lg"
                  className="flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      {slot.client?.name}
                    </h4>
                    {slot.isManual && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                        ✍️ Manual
                      </span>
                    )}
                  </div>
                  {slot.client?.telegramHandle && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {slot.client.telegramHandle}
                    </p>
                  )}
                </div>
              </div>

              <Divider className="my-4" />

              {/* Service Info */}
              {slot.service && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {slot.service.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Duration: {slot.service.duration} hour
                        {slot.service.duration > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments */}
              {slot.comments && (
                <>
                  <Divider className="my-4" />
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                      Comments
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-800/50 p-3 rounded-lg">
                      {slot.comments}
                    </p>
                  </div>
                </>
              )}
            </ModalBody>

            <ModalFooter className="flex flex-col space-y-2">
              {/* Message Client Button */}
              {slot.client?.telegramHandle && (
                <Button
                  color="primary"
                  variant="flat"
                  fullWidth
                  startContent={<MessageCircle className="w-4 h-4" />}
                  onPress={handleMessageClient}
                >
                  Message via Telegram
                </Button>
              )}

              {/* Action Buttons based on status and state */}
              {isPendingSlot && !isPastBooking && (
                <div className="flex space-x-2 w-full">
                  <Button
                    color="danger"
                    variant="flat"
                    fullWidth
                    startContent={<X className="w-4 h-4" />}
                    onPress={handleDecline}
                  >
                    Decline
                  </Button>
                  <Button
                    color="success"
                    fullWidth
                    startContent={<CheckCircle className="w-4 h-4" />}
                    onPress={handleConfirm}
                  >
                    Confirm
                  </Button>
                </div>
              )}

              {isBookedSlot && !isPastBooking && !slot.isManual && (
                <div className="flex space-x-2 w-full">
                  <Button
                    color="danger"
                    variant="flat"
                    fullWidth
                    startContent={<X className="w-4 h-4" />}
                    onPress={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    fullWidth
                    startContent={<Bell className="w-4 h-4" />}
                    onPress={handleRemind}
                  >
                    Remind
                  </Button>
                </div>
              )}

              {isBookedSlot && !isPastBooking && slot.isManual && (
                <div className="flex space-x-2 w-full">
                  <Button
                    color="danger"
                    variant="flat"
                    fullWidth
                    startContent={<X className="w-4 h-4" />}
                    onPress={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    fullWidth
                    startContent={<Edit className="w-4 h-4" />}
                    onPress={handleEdit}
                  >
                    Edit
                  </Button>
                </div>
              )}

              {/* Close Button */}
              <Button variant="light" fullWidth onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookingDetailModal;
