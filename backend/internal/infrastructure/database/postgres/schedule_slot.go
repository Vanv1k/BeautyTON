package postgres

import (
	"context"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type ScheduleSlotRepository struct {
	db *gorm.DB
}

func NewScheduleSlotRepository(postgres *Postgres) repository.ScheduleSlotRepository {
	return &ScheduleSlotRepository{db: postgres.GetDB()}
}

func (r *ScheduleSlotRepository) Get(ctx context.Context, id uuid.UUID) (*entity.ScheduleSlot, error) {
	var slot entity.ScheduleSlot
	if err := r.db.WithContext(ctx).First(&slot, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &slot, nil
}

func (r *ScheduleSlotRepository) Create(ctx context.Context, slot *entity.ScheduleSlot) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(slot).Error
	})
}

func (r *ScheduleSlotRepository) Update(ctx context.Context, slot *entity.ScheduleSlot) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(slot).Error
	})
}

func (r *ScheduleSlotRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.ScheduleSlot{}, id).Error
	})
}

func (r *ScheduleSlotRepository) List(ctx context.Context, masterID uuid.UUID) ([]entity.ScheduleSlot, error) {
	var slots []entity.ScheduleSlot
	if err := r.db.WithContext(ctx).Where("master_id = ?", masterID).Find(&slots).Error; err != nil {
		return nil, err
	}
	return slots, nil
}

func (r *ScheduleSlotRepository) FindByTimeRange(ctx context.Context, masterID uuid.UUID, startTime, endTime time.Time) ([]entity.ScheduleSlot, error) {
	var slots []entity.ScheduleSlot
	err := r.db.WithContext(ctx).
		Where("master_id = ? AND status IN ?", masterID, []entity.ScheduleSlotStatus{
			entity.ScheduleSlotStatusBooked,
			entity.ScheduleSlotStatusBusy,
			entity.ScheduleSlotStatusReserved,
		}).
		Where("(start_time <= ? AND end_time > ?) OR (start_time < ? AND end_time >= ?) OR (start_time >= ? AND end_time <= ?)",
			startTime, startTime, endTime, endTime, startTime, endTime).
		Find(&slots).Error
	if err != nil {
		return nil, err
	}
	return slots, nil
}
