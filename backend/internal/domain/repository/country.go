package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type CountryRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Country, error)
	Create(ctx context.Context, country *entity.Country) error
	Update(ctx context.Context, country *entity.Country) error
	Delete(ctx context.Context, id uuid.UUID) error
}
