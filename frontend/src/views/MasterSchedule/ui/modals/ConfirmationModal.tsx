import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
} from '@heroui/react';
import { AlertTriangle, X } from 'lucide-react';
import { useState, useCallback } from 'react';

import { Textarea } from '../../../../shared/ui/Textarea';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (comment?: string) => void;
  title: string;
  message: string;
  confirmButtonText: string;
  confirmButtonColor?: 'danger' | 'warning' | 'primary';
  isDestructive?: boolean;
};

const ConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
  confirmButtonColor = 'danger',
  isDestructive = true,
}) => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    try {
      await onConfirm(comment.trim() || undefined);
      setComment('');
      onClose();
    } finally {
      setIsLoading(false);
    }
  }, [comment, onConfirm, onClose]);

  const handleClose = useCallback(() => {
    setComment('');
    onClose();
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      placement="bottom-center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center space-x-2">
            {isDestructive ? (
              <AlertTriangle className="w-5 h-5 text-danger-500" />
            ) : (
              <X className="w-5 h-5 text-warning-500" />
            )}
            <span>{title}</span>
          </div>
        </ModalHeader>

        <ModalBody className="py-4">
          {isDestructive && (
            <Alert color="danger" variant="flat" className="mb-4">
              {message}
            </Alert>
          )}

          {!isDestructive && (
            <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Add a comment (optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Explain the reason for this action..."
              maxLength={500}
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-500">
              This comment will be sent to the client via bot notification
            </p>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={handleClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button
            color={confirmButtonColor}
            onPress={handleConfirm}
            isLoading={isLoading}
          >
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
