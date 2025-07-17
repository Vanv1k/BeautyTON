package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type CityRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.City, error)
	Create(ctx context.Context, city *entity.City) error
	Update(ctx context.Context, city *entity.City) error
	Delete(ctx context.Context, id uuid.UUID) error
	ListCities(ctx context.Context, query string, page, pageSize int) ([]entity.City, int64, error)
}
