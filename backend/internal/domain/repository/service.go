package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type ServiceRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Service, error)
	Create(ctx context.Context, service *entity.Service) error
	Update(ctx context.Context, service *entity.Service) error
	Delete(ctx context.Context, id uuid.UUID) error
}
