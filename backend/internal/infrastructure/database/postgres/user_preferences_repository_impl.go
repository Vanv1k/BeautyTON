package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type UserPreferencesRepository struct {
	db *gorm.DB
}

func NewUserPreferencesRepository(postgres *Postgres) repository.UserPreferencesRepository {
	return &UserPreferencesRepository{db: postgres.GetDB()}
}

func (r *UserPreferencesRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.UserPreferences, error) {
	var preferences entity.UserPreferences
	if err := r.db.WithContext(ctx).First(&preferences, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &preferences, nil
}

func (r *UserPreferencesRepository) Create(ctx context.Context, preferences *entity.UserPreferences) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(preferences).Error
	})
}

func (r *UserPreferencesRepository) Update(ctx context.Context, preferences *entity.UserPreferences) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(preferences).Error
	})
}

func (r *UserPreferencesRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.UserPreferences{}, id).Error
	})
}
