package repository

import (
	"context"
	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type UserRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.User, error)
	Create(ctx context.Context, user *entity.User) error
	Update(ctx context.Context, user *entity.User) error
	Delete(ctx context.Context, id uuid.UUID) error
}
