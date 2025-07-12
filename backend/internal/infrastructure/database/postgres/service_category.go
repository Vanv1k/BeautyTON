package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type ServiceCategoryRepository struct {
	db *gorm.DB
}

func NewServiceCategoryRepository(postgres *Postgres) repository.ServiceCategoryRepository {
	return &ServiceCategoryRepository{db: postgres.GetDB()}
}

func (r *ServiceCategoryRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.ServiceCategory, error) {
	var category entity.ServiceCategory
	if err := r.db.WithContext(ctx).First(&category, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &category, nil
}

func (r *ServiceCategoryRepository) Create(ctx context.Context, category *entity.ServiceCategory) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(category).Error
	})
}

func (r *ServiceCategoryRepository) Update(ctx context.Context, category *entity.ServiceCategory) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(category).Error
	})
}

func (r *ServiceCategoryRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.ServiceCategory{}, id).Error
	})
}
