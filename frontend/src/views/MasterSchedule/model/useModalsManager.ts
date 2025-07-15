import { useState, useCallback } from 'react';

import type { TimeSlot, SlotCreationData } from '../lib';

type ConfirmationConfig = {
  title: string;
  message: string;
  confirmButtonText: string;
  confirmButtonColor?: 'danger' | 'warning' | 'primary';
  isDestructive?: boolean;
  onConfirm: (comment?: string) => void;
};

export const useModalsManager = () => {
  // Modal states
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newSlotData, setNewSlotData] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSlot, setEditSlot] = useState<TimeSlot | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationConfig, setConfirmationConfig] =
    useState<ConfirmationConfig | null>(null);

  // Helper function to close all modals
  const closeAllModals = useCallback(() => {
    setIsDetailModalOpen(false);
    setIsCreationModalOpen(false);
    setIsEditModalOpen(false);
    setIsConfirmationModalOpen(false);
    setSelectedSlot(null);
    setNewSlotData(null);
    setEditSlot(null);
    setConfirmationConfig(null);
  }, []);

  // Modal handlers
  const handleSlotClick = useCallback(
    (slot: TimeSlot) => {
      // Close all modals first
      closeAllModals();

      if (slot.status === 'booked' || slot.status === 'pending') {
        setSelectedSlot(slot);
        setIsDetailModalOpen(true);
      } else {
        // Allow creating bookings in both past and future free slots
        setNewSlotData({
          date: slot.date,
          time: slot.time,
        });
        setIsCreationModalOpen(true);
      }
    },
    [closeAllModals],
  );

  const handleBookingUpdate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_updatedSlot: TimeSlot) => {
      // In real app, this would update the backend
      closeAllModals();
    },
    [closeAllModals],
  );

  const handleBookingCancel = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_slotId: string) => {
      // Close all modals first, then show confirmation modal
      setIsDetailModalOpen(false);
      setIsCreationModalOpen(false);
      setIsEditModalOpen(false);

      setConfirmationConfig({
        title: 'Cancel Booking',
        message:
          'Are you sure you want to cancel this booking? This action cannot be undone.',
        confirmButtonText: 'Cancel Booking',
        confirmButtonColor: 'danger',
        isDestructive: true,
        onConfirm: (comment) => {
          // In real app, this would cancel the booking in backend
          void comment;
          closeAllModals();
        },
      });
      setIsConfirmationModalOpen(true);
    },
    [closeAllModals],
  );

  const handleSlotCreate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_slotData: SlotCreationData) => {
      // In real app, this would create a new booking in backend
      closeAllModals();
    },
    [closeAllModals],
  );

  const handleSlotUpdate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_slotId: string, _slotData: SlotCreationData) => {
      // In real app, this would update the booking in backend
      closeAllModals();
    },
    [closeAllModals],
  );

  const handlePendingConfirm = useCallback(
    (slotId: string, comment?: string) => {
      // In real app, this would confirm the pending booking in backend
      // The comment would be sent to the client via bot notification
      // TODO: API call to confirm booking with slotId and comment
      void slotId;
      void comment;
      closeAllModals();
    },
    [closeAllModals],
  );

  const handlePendingDecline = useCallback(
    (slotId: string, comment?: string) => {
      // Close detail modal, then show confirmation modal
      setIsDetailModalOpen(false);
      setIsCreationModalOpen(false);
      setIsEditModalOpen(false);

      setConfirmationConfig({
        title: 'Decline Booking Request',
        message: 'Are you sure you want to decline this booking request?',
        confirmButtonText: 'Decline Request',
        confirmButtonColor: 'danger',
        isDestructive: true,
        onConfirm: (declineComment) => {
          // In real app, this would decline the pending booking in backend
          // The comment would be sent to the client via bot notification
          // TODO: API call to decline booking with slotId and comment
          void slotId;
          void comment;
          void declineComment;
          closeAllModals();
        },
      });
      setIsConfirmationModalOpen(true);
    },
    [closeAllModals],
  );

  const handleEdit = useCallback((slot: TimeSlot) => {
    // Close all modals first, then open edit modal
    setIsDetailModalOpen(false);
    setIsCreationModalOpen(false);
    setIsConfirmationModalOpen(false);
    setConfirmationConfig(null);

    setEditSlot(slot);
    setIsEditModalOpen(true);
  }, []);

  const handleRemind = useCallback(
    (slotId: string) => {
      // TODO: Send reminder to client
      void slotId;
      closeAllModals();
    },
    [closeAllModals],
  );

  return {
    // States
    selectedSlot,
    isDetailModalOpen,
    newSlotData,
    isCreationModalOpen,
    isEditModalOpen,
    editSlot,
    isConfirmationModalOpen,
    confirmationConfig,

    // Handlers
    handleSlotClick,
    handleBookingUpdate,
    handleBookingCancel,
    handleSlotCreate,
    handleSlotUpdate,
    handlePendingConfirm,
    handlePendingDecline,
    handleEdit,
    handleRemind,
    closeAllModals,
  };
};
