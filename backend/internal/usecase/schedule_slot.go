package usecase

import (
	"context"
	"errors"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type ScheduleSlotUsecase struct {
	scheduleSlotRepo  repository.ScheduleSlotRepository
	masterRepo        repository.MasterProfileRepository
	bookingRepo       repository.BookingRepository
	checkMasterAccess func(ctx context.Context, masterID uuid.UUID) bool
}

func NewScheduleSlotUsecase(
	scheduleSlotRepo repository.ScheduleSlotRepository,
	masterRepo repository.MasterProfileRepository,
	bookingRepo repository.BookingRepository,
) *ScheduleSlotUsecase {
	checkMasterAccess := func(ctx context.Context, masterID uuid.UUID) bool {
		// TODO: Implement access check
		return true
	}
	return &ScheduleSlotUsecase{
		scheduleSlotRepo:  scheduleSlotRepo,
		masterRepo:        masterRepo,
		bookingRepo:       bookingRepo,
		checkMasterAccess: checkMasterAccess,
	}
}

func (u *ScheduleSlotUsecase) GetScheduleSlot(ctx context.Context, id uuid.UUID) (*entity.ScheduleSlot, error) {
	return u.scheduleSlotRepo.Get(ctx, id)
}

func (u *ScheduleSlotUsecase) ListScheduleSlots(ctx context.Context, masterID uuid.UUID) ([]entity.ScheduleSlot, error) {
	// Проверка существования мастера
	if _, err := u.masterRepo.GetByID(ctx, masterID); err != nil {
		return nil, errors.New("master profile not found")
	}
	return u.scheduleSlotRepo.List(ctx, masterID)
}

func (u *ScheduleSlotUsecase) CreateScheduleSlot(ctx context.Context, slot *entity.ScheduleSlot) error {
	// Валидация бизнес-логики

	// Проверка существования мастера
	if _, err := u.masterRepo.GetByID(ctx, slot.MasterID); err != nil {
		return errors.New("master profile not found")
	}

	// Проверка существования бронирования
	if slot.BookingID != nil {
		if _, err := u.bookingRepo.GetByID(ctx, *slot.BookingID); err != nil {
			return errors.New("booking not found")
		}
	}

	// Проверка пересечений слотов
	overlappingSlots, err := u.scheduleSlotRepo.FindByTimeRange(ctx, slot.MasterID, slot.StartTime, slot.EndTime)
	if err != nil {
		return err
	}
	for _, s := range overlappingSlots {
		if s.Status == entity.ScheduleSlotStatusBooked || s.Status == entity.ScheduleSlotStatusBusy || s.Status == entity.ScheduleSlotStatusReserved {
			return errors.New("slot overlaps with existing booked, busy, or reserved slot")
		}
	}

	// Проверка прав доступа
	if !u.checkMasterAccess(ctx, slot.MasterID) {
		return errors.New("unauthorized")
	}

	return u.scheduleSlotRepo.Create(ctx, slot)
}

func (u *ScheduleSlotUsecase) UpdateScheduleSlot(ctx context.Context, slot *entity.ScheduleSlot) error {
	// Проверка существования слота
	existingSlot, err := u.scheduleSlotRepo.Get(ctx, slot.ID)
	if err != nil {
		return err
	}

	// Проверка прав доступа
	if !u.checkMasterAccess(ctx, existingSlot.MasterID) {
		return errors.New("unauthorized")
	}

	// Валидация бизнес-логики

	// Проверка существования мастера
	if _, err := u.masterRepo.GetByID(ctx, slot.MasterID); err != nil {
		return errors.New("master profile not found")
	}

	// Проверка существования бронирования
	if slot.BookingID != nil {
		if _, err := u.bookingRepo.GetByID(ctx, *slot.BookingID); err != nil {
			return errors.New("booking not found")
		}
	}

	// Проверка пересечений слотов
	overlappingSlots, err := u.scheduleSlotRepo.FindByTimeRange(ctx, slot.MasterID, slot.StartTime, slot.EndTime)
	if err != nil {
		return err
	}
	for _, s := range overlappingSlots {
		if s.ID != slot.ID && (s.Status == entity.ScheduleSlotStatusBooked || s.Status == entity.ScheduleSlotStatusBusy || s.Status == entity.ScheduleSlotStatusReserved) {
			return errors.New("slot overlaps with existing booked, busy, or reserved slot")
		}
	}

	return u.scheduleSlotRepo.Update(ctx, slot)
}

func (u *ScheduleSlotUsecase) DeleteScheduleSlot(ctx context.Context, id uuid.UUID) error {
	// Проверка существования слота
	slot, err := u.scheduleSlotRepo.Get(ctx, id)
	if err != nil {
		return err
	}

	// Проверка прав доступа
	if !u.checkMasterAccess(ctx, slot.MasterID) {
		return errors.New("unauthorized")
	}

	return u.scheduleSlotRepo.Delete(ctx, id)
}
