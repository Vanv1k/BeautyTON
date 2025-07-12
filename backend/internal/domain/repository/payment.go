package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type PaymentRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Payment, error)
	Create(ctx context.Context, payment *entity.Payment) error
	Update(ctx context.Context, payment *entity.Payment) error
	Delete(ctx context.Context, id uuid.UUID) error
}
