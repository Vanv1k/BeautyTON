package postgres

import (
	"context"
	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type ReviewRepository struct {
	db *gorm.DB
}

func NewReviewRepository(postgres *Postgres) repository.ReviewRepository {
	return &ReviewRepository{db: postgres.GetDB()}
}

func (r *ReviewRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.Review, error) {
	var review entity.Review
	if err := r.db.WithContext(ctx).First(&review, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &review, nil
}

func (r *ReviewRepository) Create(ctx context.Context, review *entity.Review) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(review).Error
	})
}

func (r *ReviewRepository) Update(ctx context.Context, review *entity.Review) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(review).Error
	})
}

func (r *ReviewRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.Review{}, id).Error
	})
}
