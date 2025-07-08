package repository

import (
	"context"
	"io"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type FileRepository interface {
	Upload(ctx context.Context, file *entity.File, content io.Reader) error
	Get(ctx context.Context, id string) (*entity.File, io.Reader, error)
}
