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
import { Calendar, Clock, UserCheck } from 'lucide-react';
import { useState, useCallback } from 'react';

import { Textarea } from '../../../../shared/ui/Textarea';
import type { TimeSlot } from '../../lib';

type Props = {
  isOpen: boolean;
  slot: TimeSlot | null;
  onClose: () => void;
  onConfirm?: (slotId: string, comment?: string) => void;
  onDecline?: (slotId: string, comment?: string) => void;
};

const SlotInfoModal: React.FC<Props> = ({
  isOpen,
  slot,
  onClose,
  onConfirm,
  onDecline,
}) => {
  const [comment, setComment] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (!slot || !onConfirm) return;

    setIsConfirming(true);
    try {
      await onConfirm(slot.id, comment.trim() || undefined);
      setComment('');
      onClose();
    } finally {
      setIsConfirming(false);
    }
  }, [slot, comment, onConfirm, onClose]);

  const handleDecline = useCallback(async () => {
    if (!slot || !onDecline) return;

    setIsDeclining(true);
    try {
      await onDecline(slot.id, comment.trim() || undefined);
      setComment('');
      onClose();
    } finally {
      setIsDeclining(false);
    }
  }, [slot, comment, onDecline, onClose]);

  const handleClose = useCallback(() => {
    setComment('');
    onClose();
  }, [onClose]);

  if (!slot) {
    return null;
  }

  const isPastSlot = slot.isPast;
  const isPendingSlot = slot.status === 'pending';
  const isBookedSlot = slot.status === 'booked';

  const getModalTitle = () => {
    if (isPendingSlot) {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span>Pending Booking Request</span>
        </div>
      );
    }
    if (isBookedSlot && isPastSlot) {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full" />
          <span>Past Appointment{slot.isManual ? ' (Manual)' : ''}</span>
        </div>
      );
    }
    if (isBookedSlot) {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span>Confirmed Booking{slot.isManual ? ' (Manual)' : ''}</span>
        </div>
      );
    }
    return 'Appointment Details';
  };

  const getAttendanceAlert = () => {
    if (!isPastSlot || !isBookedSlot || slot.clientAttended === undefined) {
      return null;
    }

    return (
      <Alert
        color={slot.clientAttended ? 'success' : 'danger'}
        variant="flat"
        icon={<UserCheck />}
        className="mb-4"
      >
        {slot.clientAttended
          ? 'Client attended the appointment'
          : 'Client did not show up for the appointment'}
      </Alert>
    );
  };

  const canTakeAction = isPendingSlot && !isPastSlot;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md" placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {getModalTitle()}
        </ModalHeader>

        <ModalBody className="py-4">
          {isPastSlot && isPendingSlot && (
            <Alert color="warning" variant="flat" className="mb-4">
              This booking request has expired as the appointment time has
              passed.
            </Alert>
          )}

          {/* Attendance Alert for past booked slots */}
          {getAttendanceAlert()}

          {/* Booking Details */}
          <div className="space-y-4">
            {/* Date and Time */}
            <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">
                  {new Date(slot.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{slot.time}</span>
              </div>
            </div>

            {/* Client Info */}
            {slot.client && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Avatar
                  src={slot.client.avatar}
                  name={slot.client.name}
                  size="md"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {slot.client.name}
                  </p>
                  {slot.client.telegramHandle && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {slot.client.telegramHandle}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Service Info */}
            {slot.service && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {slot.service.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Duration: {slot.service.duration} hour
                  {slot.service.duration > 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* Existing Comments */}
            {slot.comments && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {isPendingSlot ? "Client's message:" : 'Comments:'}
                </p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {slot.comments}
                </p>
              </div>
            )}

            {/* Response Comment - only for pending slots */}
            {canTakeAction && (
              <>
                <Divider />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Add a message (optional)
                  </label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a message to the client (this will be sent via bot notification)..."
                    maxLength={500}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500">
                    This message will be included in the bot notification to the
                    client
                  </p>
                </div>
              </>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={handleClose}>
            {canTakeAction ? 'Cancel' : 'Close'}
          </Button>

          {canTakeAction && onConfirm && onDecline && (
            <>
              <Button
                color="danger"
                variant="flat"
                onPress={handleDecline}
                isLoading={isDeclining}
                isDisabled={isConfirming}
              >
                Decline
              </Button>
              <Button
                color="success"
                onPress={handleConfirm}
                isLoading={isConfirming}
                isDisabled={isDeclining}
              >
                Confirm Booking
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SlotInfoModal;
