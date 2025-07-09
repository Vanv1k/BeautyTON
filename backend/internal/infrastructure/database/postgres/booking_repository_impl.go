package postgres

import (
	"context"
	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type BookingRepository struct {
	db *gorm.DB
}

func NewBookingRepository(postgres *Postgres) repository.BookingRepository {
	return &BookingRepository{db: postgres.GetDB()}
}

func (r *BookingRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.Booking, error) {
	var booking entity.Booking
	if err := r.db.WithContext(ctx).First(&booking, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &booking, nil
}

func (r *BookingRepository) Create(ctx context.Context, booking *entity.Booking) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(booking).Error
	})
}

func (r *BookingRepository) Update(ctx context.Context, booking *entity.Booking) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(booking).Error
	})
}

func (r *BookingRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.Booking{}, id).Error
	})
}
