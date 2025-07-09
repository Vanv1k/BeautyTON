package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type PaymentRepository struct {
	db *gorm.DB
}

func NewPaymentRepository(postgres *Postgres) repository.PaymentRepository {
	return &PaymentRepository{db: postgres.GetDB()}
}

func (r *PaymentRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.Payment, error) {
	var payment entity.Payment
	if err := r.db.WithContext(ctx).First(&payment, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &payment, nil
}

func (r *PaymentRepository) Create(ctx context.Context, payment *entity.Payment) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(payment).Error
	})
}

func (r *PaymentRepository) Update(ctx context.Context, payment *entity.Payment) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(payment).Error
	})
}

func (r *PaymentRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.Payment{}, id).Error
	})
}
