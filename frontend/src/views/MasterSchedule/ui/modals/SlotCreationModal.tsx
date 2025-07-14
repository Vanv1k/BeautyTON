import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  SelectItem,
  Alert,
} from '@heroui/react';
import { Calendar, Clock } from 'lucide-react';
import { useState, useCallback, useEffect, useMemo } from 'react';

import { Input } from '../../../../shared/ui/Input';
import { Select } from '../../../../shared/ui/Select';
import { Textarea } from '../../../../shared/ui/Textarea';
import type { SlotCreationData } from '../../lib';

type Props = {
  isOpen: boolean;
  initialData: { date: string; time: string } | null;
  onClose: () => void;
  onCreate: (slotData: SlotCreationData) => void;
};

const SlotCreationModal: React.FC<Props> = ({
  isOpen,
  initialData,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    duration: '1',
    comments: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Check if the selected date/time is in the past
  const isPastSlot = useMemo(() => {
    if (!initialData) return false;

    const slotDate = new Date(initialData.date);
    const [hours, minutes] = initialData.time.split(':').map(Number);
    slotDate.setHours(hours, minutes, 0, 0);

    return slotDate < new Date();
  }, [initialData]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        clientName: '',
        service: '',
        duration: '1',
        comments: '',
      });
    }
  }, [isOpen]);

  const handleInputChange = useCallback(
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (!initialData || !formData.service) return;

    setIsLoading(true);

    try {
      const slotCreationData: SlotCreationData = {
        date: initialData.date,
        time: initialData.time,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      onCreate(slotCreationData);
    } finally {
      setIsLoading(false);
    }
  }, [initialData, formData, onCreate]);

  const isValid = formData.service.trim() !== '';

  const serviceOptions = [
    'Manicure',
    'Pedicure',
    'Hair Cut',
    'Hair Color',
    'Hair Styling',
    'Facial',
    'Massage',
    'Eyebrow Shaping',
    'Eyelash Extension',
    'Makeup',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      placement="center"
      className="mx-4"
      classNames={{
        base: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl',
        backdrop: 'bg-black/50',
      }}
      isDismissable={!isLoading}
      hideCloseButton={isLoading}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Create Booking</h3>

              {/* Date and time info */}
              {initialData && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(initialData.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{initialData.time}</span>
                </div>
              )}
            </ModalHeader>

            <ModalBody className="py-4 space-y-4">
              {/* Past date warning */}
              {isPastSlot && (
                <Alert
                  color="warning"
                  variant="flat"
                  description="This time slot is in the past. You're creating a historical booking."
                />
              )}

              {/* Service Selection */}
              <Select
                label="Service"
                placeholder="Select a service"
                selectedKeys={formData.service ? [formData.service] : []}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as string;
                  handleInputChange('service')(value || '');
                }}
                isRequired
              >
                {serviceOptions.map((service) => (
                  <SelectItem key={service}>{service}</SelectItem>
                ))}
              </Select>

              {/* Duration */}
              <Select
                label="Duration"
                placeholder="Select duration"
                selectedKeys={[formData.duration]}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as string;
                  handleInputChange('duration')(value || '1');
                }}
              >
                <SelectItem key="1">1 hour</SelectItem>
                <SelectItem key="2">2 hours</SelectItem>
                <SelectItem key="3">3 hours</SelectItem>
                <SelectItem key="4">4 hours</SelectItem>
              </Select>

              {/* Client Name (Optional) */}
              <Input
                label="Client Name"
                placeholder="Enter client name (optional)"
                value={formData.clientName}
                onValueChange={handleInputChange('clientName')}
              />

              {/* Comments */}
              <Textarea
                label="Comments"
                placeholder="Add any special notes (optional)"
                value={formData.comments}
                onValueChange={handleInputChange('comments')}
                minRows={2}
                maxRows={4}
              />
            </ModalBody>

            <ModalFooter className="flex flex-col space-y-2">
              <Button
                color="primary"
                fullWidth
                onPress={handleSubmit}
                isLoading={isLoading}
                isDisabled={!isValid}
              >
                {isLoading ? 'Creating...' : 'Create Booking'}
              </Button>

              <Button
                variant="light"
                fullWidth
                onPress={onClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SlotCreationModal;
