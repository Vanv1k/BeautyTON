package postgres

import (
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(postgres *Postgres) repository.UserRepository {
	return &UserRepository{db: postgres.GetDB()}
}

func (r *UserRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.User, error) {
	var user entity.User
	if err := r.db.WithContext(ctx).First(&user, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) GetByTelegramID(ctx context.Context, telegramID int64) (*entity.User, error) {
	var user entity.User
	if err := r.db.WithContext(ctx).First(&user, telegramID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) Create(ctx context.Context, user *entity.User) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(user).Error
	})
}

func (r *UserRepository) Update(ctx context.Context, user *entity.User) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(user).Error
	})
}

func (r *UserRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.User{}, id).Error
	})
}
