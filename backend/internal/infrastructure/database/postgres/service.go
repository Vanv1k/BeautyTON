package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type ServiceRepository struct {
	db *gorm.DB
}

func NewServiceRepository(postgres *Postgres) repository.ServiceRepository {
	return &ServiceRepository{db: postgres.GetDB()}
}

func (r *ServiceRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.Service, error) {
	var service entity.Service
	if err := r.db.WithContext(ctx).First(&service, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &service, nil
}

func (r *ServiceRepository) Create(ctx context.Context, service *entity.Service) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(service).Error
	})
}

func (r *ServiceRepository) Update(ctx context.Context, service *entity.Service) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(service).Error
	})
}

func (r *ServiceRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.Service{}, id).Error
	})
}
