package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type MyMasterRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*entity.MyMaster, error)
	Create(ctx context.Context, myMaster *entity.MyMaster) error
	Update(ctx context.Context, myMaster *entity.MyMaster) error
	Delete(ctx context.Context, id uuid.UUID) error
}
