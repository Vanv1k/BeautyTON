package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type CountryRepository struct {
	db *gorm.DB
}

func NewCountryRepository(postgres *Postgres) repository.CountryRepository {
	return &CountryRepository{db: postgres.GetDB()}
}

func (r *CountryRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.Country, error) {
	var country entity.Country
	if err := r.db.WithContext(ctx).First(&country, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &country, nil
}

func (r *CountryRepository) Create(ctx context.Context, country *entity.Country) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(country).Error
	})
}

func (r *CountryRepository) Update(ctx context.Context, country *entity.Country) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(country).Error
	})
}

func (r *CountryRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.Country{}, id).Error
	})
}
