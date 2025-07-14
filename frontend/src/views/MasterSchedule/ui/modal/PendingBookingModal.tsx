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
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  User,
  AlertTriangle,
} from 'lucide-react';
import { useState, useCallback } from 'react';

import { Textarea } from '../../../../shared/ui/Textarea';
import type { TimeSlot } from '../../lib';

type Props = {
  isOpen: boolean;
  slot: TimeSlot | null;
  onClose: () => void;
  onConfirm: (slotId: string, comment?: string) => void;
  onDecline: (slotId: string, comment?: string) => void;
};

const PendingBookingModal: React.FC<Props> = ({
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
    if (!slot) return;

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
    if (!slot) return;

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

  if (!slot || slot.status !== 'pending') {
    return null;
  }

  const isPastSlot = slot.isPast;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md" placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>Pending Booking Request</span>
          </div>
        </ModalHeader>

        <ModalBody className="py-4">
          {isPastSlot && (
            <Alert
              color="warning"
              variant="flat"
              startContent={<AlertTriangle className="w-4 h-4" />}
              className="mb-4"
            >
              This booking request has expired as the appointment time has
              passed.
            </Alert>
          )}

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
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {slot.client.name}
                    </p>
                  </div>
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
                  Client's message:
                </p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {slot.comments}
                </p>
              </div>
            )}

            <Divider />

            {/* Response Comment */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Add a message (optional)
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  isPastSlot
                    ? 'Explain why this expired request cannot be processed...'
                    : 'Add a message to the client (this will be sent via bot notification)...'
                }
                maxLength={500}
                className="min-h-[100px]"
                disabled={isPastSlot}
              />
              <p className="text-xs text-gray-500">
                {isPastSlot
                  ? 'Cannot send messages for expired requests'
                  : 'This message will be included in the bot notification to the client'}
              </p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={handleClose}>
            Cancel
          </Button>

          {!isPastSlot && (
            <>
              <Button
                color="danger"
                variant="flat"
                startContent={<XCircle className="w-4 h-4" />}
                onPress={handleDecline}
                isLoading={isDeclining}
                isDisabled={isConfirming}
              >
                Decline
              </Button>
              <Button
                color="success"
                startContent={<CheckCircle className="w-4 h-4" />}
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

export default PendingBookingModal;
