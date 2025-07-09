package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type SubscriptionRepository struct {
	db *gorm.DB
}

func NewSubscriptionRepository(postgres *Postgres) repository.SubscriptionRepository {
	return &SubscriptionRepository{db: postgres.GetDB()}
}

func (r *SubscriptionRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.Subscription, error) {
	var subscription entity.Subscription
	if err := r.db.WithContext(ctx).First(&subscription, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &subscription, nil
}

func (r *SubscriptionRepository) Create(ctx context.Context, subscription *entity.Subscription) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(subscription).Error
	})
}

func (r *SubscriptionRepository) Update(ctx context.Context, subscription *entity.Subscription) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(subscription).Error
	})
}

func (r *SubscriptionRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.Subscription{}, id).Error
	})
}
