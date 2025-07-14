package repository

import (
	"context"
	"time"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/google/uuid"
)

type ScheduleSlotRepository interface {
	Create(ctx context.Context, slot *entity.ScheduleSlot) error
	Get(ctx context.Context, id uuid.UUID) (*entity.ScheduleSlot, error)
	Update(ctx context.Context, slot *entity.ScheduleSlot) error
	Delete(ctx context.Context, id uuid.UUID) error
	List(ctx context.Context, masterID uuid.UUID) ([]entity.ScheduleSlot, error)
	FindByTimeRange(ctx context.Context, masterID uuid.UUID, startTime, endTime time.Time) ([]entity.ScheduleSlot, error)
}
