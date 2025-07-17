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
import { Calendar, Clock, Edit, Plus } from 'lucide-react';
import { useState, useCallback, useEffect, useMemo } from 'react';

import { Input } from '../../../../shared/ui/Input';
import { Select } from '../../../../shared/ui/Select';
import { Textarea } from '../../../../shared/ui/Textarea';
import type { SlotCreationData, TimeSlot } from '../../lib';

type Props = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialData?: { date: string; time: string } | null;
  editSlot?: TimeSlot | null;
  onClose: () => void;
  onCreate?: (slotData: SlotCreationData) => void;
  onUpdate?: (slotId: string, slotData: SlotCreationData) => void;
};

const SlotFormModal: React.FC<Props> = ({
  isOpen,
  mode,
  initialData,
  editSlot,
  onClose,
  onCreate,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    telegramHandle: '',
    service: '',
    duration: '1',
    comments: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Check if the selected date/time is in the past
  const isPastSlot = useMemo(() => {
    const dateToCheck = mode === 'edit' ? editSlot?.date : initialData?.date;
    const timeToCheck = mode === 'edit' ? editSlot?.time : initialData?.time;

    if (!dateToCheck || !timeToCheck) return false;

    const slotDate = new Date(dateToCheck);
    const [hours, minutes] = timeToCheck.split(':').map(Number);
    slotDate.setHours(hours, minutes, 0, 0);

    return slotDate < new Date();
  }, [mode, initialData, editSlot]);

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && editSlot) {
        setFormData({
          clientName: editSlot.client?.name || '',
          telegramHandle: editSlot.client?.telegramHandle || '',
          service: editSlot.service?.name || '',
          duration: editSlot.service?.duration.toString() || '1',
          comments: editSlot.comments || '',
        });
      } else {
        setFormData({
          clientName: '',
          telegramHandle: '',
          service: '',
          duration: '1',
          comments: '',
        });
      }
    }
  }, [isOpen, mode, editSlot]);

  const handleInputChange = useCallback(
    (field: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      },
    [],
  );

  const handleSelectChange = useCallback(
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const dataToUse = mode === 'edit' ? editSlot : initialData;
    if (!dataToUse || !formData.service) return;

    setIsLoading(true);

    try {
      const slotData: SlotCreationData = {
        date: dataToUse.date,
        time: dataToUse.time,
        client: {
          name: formData.clientName,
          telegramHandle: formData.telegramHandle || undefined,
        },
        service: {
          name: formData.service,
          duration: parseInt(formData.duration),
        },
        comments: formData.comments || undefined,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (mode === 'edit' && editSlot && onUpdate) {
        onUpdate(editSlot.id, slotData);
      } else if (mode === 'create' && onCreate) {
        onCreate(slotData);
      }
    } finally {
      setIsLoading(false);
    }
  }, [mode, initialData, editSlot, formData, onCreate, onUpdate]);

  const isValid = formData.service.trim() !== '';

  const serviceOptions = [
    'Manicure',
    'Pedicure',
    'Hair Cut',
    'Hair Color',
    'Hair Styling',
    'Facial Treatment',
    'Eyebrow Shaping',
    'Lash Extensions',
    'Massage',
    'Other',
  ];

  const getModalTitle = () => {
    if (mode === 'edit') {
      return isPastSlot ? 'View Past Booking' : 'Edit Booking';
    }
    return isPastSlot ? 'Add Past Booking' : 'Create New Booking';
  };

  const getModalIcon = () => {
    return mode === 'edit' ? (
      <Edit className="w-5 h-5" />
    ) : (
      <Plus className="w-5 h-5" />
    );
  };

  const dateToDisplay = mode === 'edit' ? editSlot?.date : initialData?.date;
  const timeToDisplay = mode === 'edit' ? editSlot?.time : initialData?.time;

  if (!dateToDisplay || !timeToDisplay) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      placement="bottom-center"
      classNames={{
        base: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl',
        backdrop: 'bg-black/50',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            {getModalIcon()}
            <span>{getModalTitle()}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(dateToDisplay).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{timeToDisplay}</span>
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="py-4">
          {isPastSlot && mode === 'create' && (
            <Alert color="warning" variant="flat" className="mb-4">
              You are creating a booking for a past time slot. This will be
              marked as a manual entry.
            </Alert>
          )}

          {mode === 'edit' && isPastSlot && (
            <Alert color="primary" variant="flat" className="mb-4">
              This booking has already occurred and is in view-only mode.
            </Alert>
          )}

          <div className="space-y-4">
            {/* Client Name */}
            <Input
              label="Client Name"
              placeholder="Enter client's name"
              value={formData.clientName}
              onChange={handleInputChange('clientName')}
              isRequired
              isReadOnly={mode === 'edit' && isPastSlot}
            />

            {/* Telegram Handle */}
            <Input
              label="Telegram Handle (optional)"
              placeholder="username"
              value={formData.telegramHandle}
              onChange={handleInputChange('telegramHandle')}
              startContent="@"
              isReadOnly={mode === 'edit' && isPastSlot}
            />

            {/* Service */}
            <Select
              label="Service"
              placeholder="Select a service"
              selectedKeys={formData.service ? [formData.service] : []}
              onSelectionChange={(keys) => {
                const selectedService = Array.from(keys)[0] as string;
                handleSelectChange('service')(selectedService || '');
              }}
              isRequired
              isDisabled={mode === 'edit' && isPastSlot}
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
                const selectedDuration = Array.from(keys)[0] as string;
                handleSelectChange('duration')(selectedDuration || '1');
              }}
              isRequired
              isDisabled={mode === 'edit' && isPastSlot}
            >
              <SelectItem key="0.5">30 minutes</SelectItem>
              <SelectItem key="1">1 hour</SelectItem>
              <SelectItem key="1.5">1.5 hours</SelectItem>
              <SelectItem key="2">2 hours</SelectItem>
              <SelectItem key="2.5">2.5 hours</SelectItem>
              <SelectItem key="3">3 hours</SelectItem>
            </Select>

            {/* Comments */}
            <Textarea
              label="Comments (optional)"
              placeholder="Add any special notes or requests..."
              value={formData.comments}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comments: e.target.value }))
              }
              maxLength={500}
              isReadOnly={mode === 'edit' && isPastSlot}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={onClose} isDisabled={isLoading}>
            {mode === 'edit' && isPastSlot ? 'Close' : 'Cancel'}
          </Button>
          {!(mode === 'edit' && isPastSlot) && (
            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={isLoading}
              isDisabled={!isValid}
            >
              {mode === 'edit' ? 'Update Booking' : 'Create Booking'}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SlotFormModal;
