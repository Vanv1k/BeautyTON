package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type ServiceCategoryRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.ServiceCategory, error)
	Create(ctx context.Context, category *entity.ServiceCategory) error
	Update(ctx context.Context, category *entity.ServiceCategory) error
	Delete(ctx context.Context, id uuid.UUID) error
}
