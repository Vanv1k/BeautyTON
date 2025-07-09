package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type ReviewRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Review, error)
	Create(ctx context.Context, review *entity.Review) error
	Update(ctx context.Context, review *entity.Review) error
	Delete(ctx context.Context, id uuid.UUID) error
}
