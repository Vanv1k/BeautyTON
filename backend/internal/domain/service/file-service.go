package service

import (
	"context"
	"io"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type FileService struct {
	repo repository.FileRepository
}

func NewFileService(repo repository.FileRepository) *FileService {
	return &FileService{repo: repo}
}

func (s *FileService) UploadFile(ctx context.Context, file *entity.File, content io.Reader) error {
	// TODO: validation
	return s.repo.Upload(ctx, file, content)
}

func (s *FileService) GetFile(ctx context.Context, id string) (*entity.File, io.Reader, error) {
	return s.repo.Get(ctx, id)
}
