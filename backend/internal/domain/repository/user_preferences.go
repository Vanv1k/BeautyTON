package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type UserPreferencesRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.UserPreferences, error)
	Create(ctx context.Context, preferences *entity.UserPreferences) error
	Update(ctx context.Context, preferences *entity.UserPreferences) error
	Delete(ctx context.Context, id uuid.UUID) error
}
