package usecase

import (
	"context"
	"errors"
	"io"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type FileUsecase struct {
	fileRepo repository.FileRepository
}

func NewFileUsecase(fileRepo repository.FileRepository) *FileUsecase {
	return &FileUsecase{fileRepo: fileRepo}
}

func (u *FileUsecase) UploadFile(ctx context.Context, file *entity.File, content io.Reader) error {
	// Валидация бизнес-логики
	if file.ID == "" {
		return errors.New("file ID is required")
	}
	if file.Size <= 0 {
		return errors.New("file size must be positive")
	}
	if file.MimeType == "" {
		return errors.New("file MIME type is required")
	}
	return u.fileRepo.Upload(ctx, file, content)
}

func (u *FileUsecase) GetFile(ctx context.Context, id string) (*entity.File, io.Reader, error) {
	if id == "" {
		return nil, nil, errors.New("file ID is required")
	}
	return u.fileRepo.Get(ctx, id)
}
