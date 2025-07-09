package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type SubscriptionRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Subscription, error)
	Create(ctx context.Context, subscription *entity.Subscription) error
	Update(ctx context.Context, subscription *entity.Subscription) error
	Delete(ctx context.Context, id uuid.UUID) error
}
