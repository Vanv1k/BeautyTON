package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type BookingRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Booking, error)
	Create(ctx context.Context, booking *entity.Booking) error
	Update(ctx context.Context, booking *entity.Booking) error
	Delete(ctx context.Context, id uuid.UUID) error
}
