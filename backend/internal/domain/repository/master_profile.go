package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type MasterProfileRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.MasterProfile, error)
	Create(ctx context.Context, profile *entity.MasterProfile) error
	Update(ctx context.Context, profile *entity.MasterProfile) error
	Delete(ctx context.Context, id uuid.UUID) error
	List(ctx context.Context, query string, category string, city string,
		priceFrom int, priceTo int, rating float64, page int, pageSize int) ([]entity.MasterProfile, int64, error)
}
