package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type MyMasterRepository struct {
	db *gorm.DB
}

func NewMyMasterRepository(postgres *Postgres) repository.MyMasterRepository {
	return &MyMasterRepository{db: postgres.GetDB()}
}

func (r *MyMasterRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.MyMaster, error) {
	var myMaster entity.MyMaster
	if err := r.db.WithContext(ctx).First(&myMaster, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &myMaster, nil
}

func (r *MyMasterRepository) Create(ctx context.Context, myMaster *entity.MyMaster) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(myMaster).Error
	})
}

func (r *MyMasterRepository) Update(ctx context.Context, myMaster *entity.MyMaster) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(myMaster).Error
	})
}

func (r *MyMasterRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.MyMaster{}, id).Error
	})
}
