package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type MasterProfileRepository struct {
	db *gorm.DB
}

func NewMasterProfileRepository(postgres *Postgres) repository.MasterProfileRepository {
	return &MasterProfileRepository{db: postgres.GetDB()}
}

func (r *MasterProfileRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.MasterProfile, error) {
	var profile entity.MasterProfile
	if err := r.db.WithContext(ctx).First(&profile, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &profile, nil
}

func (r *MasterProfileRepository) Create(ctx context.Context, profile *entity.MasterProfile) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(profile).Error
	})
}

func (r *MasterProfileRepository) Update(ctx context.Context, profile *entity.MasterProfile) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(profile).Error
	})
}

func (r *MasterProfileRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.MasterProfile{}, id).Error
	})
}
