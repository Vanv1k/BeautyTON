package usecase

import (
	"context"
	"errors"
	"io"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type ServiceUsecase struct {
	serviceRepo         repository.ServiceRepository
	userRepo            repository.UserRepository
	serviceCategoryRepo repository.ServiceCategoryRepository
	fileRepo            repository.FileRepository
}

func NewServiceUsecase(serviceRepo repository.ServiceRepository, userRepo repository.UserRepository, serviceCategoryRepo repository.ServiceCategoryRepository, fileRepo repository.FileRepository) *ServiceUsecase {
	return &ServiceUsecase{
		serviceRepo:         serviceRepo,
		userRepo:            userRepo,
		serviceCategoryRepo: serviceCategoryRepo,
		fileRepo:            fileRepo,
	}
}

func (u *ServiceUsecase) GetService(ctx context.Context, id uuid.UUID) (*entity.Service, error) {
	return u.serviceRepo.GetByID(ctx, id)
}

func (u *ServiceUsecase) CreateService(ctx context.Context, service *entity.Service) error {
	// Валидация бизнес-логики
	if service.Title == "" {
		return errors.New("title is required")
	}
	if service.Price < 0 {
		return errors.New("price cannot be negative")
	}
	if service.UserID != nil {
		user, err := u.userRepo.GetByID(ctx, *service.UserID)
		if err != nil {
			return err
		}
		if user.Role != entity.UserRoleMaster {
			return errors.New("user_id must refer to a master")
		}
	}
	if service.CategoryID != nil {
		if _, err := u.serviceCategoryRepo.GetByID(ctx, *service.CategoryID); err != nil {
			return errors.New("invalid category_id")
		}
	}
	return u.serviceRepo.Create(ctx, service)
}

func (u *ServiceUsecase) UpdateService(ctx context.Context, service *entity.Service) error {
	// Валидация бизнес-логики
	if service.Title == "" {
		return errors.New("title is required")
	}
	if service.Price < 0 {
		return errors.New("price cannot be negative")
	}
	if service.UserID != nil {
		user, err := u.userRepo.GetByID(ctx, *service.UserID)
		if err != nil {
			return err
		}
		if user.Role != entity.UserRoleMaster {
			return errors.New("user_id must refer to a master")
		}
	}
	if service.CategoryID != nil {
		if _, err := u.serviceCategoryRepo.GetByID(ctx, *service.CategoryID); err != nil {
			return errors.New("invalid category_id")
		}
	}
	return u.serviceRepo.Update(ctx, service)
}

func (u *ServiceUsecase) DeleteService(ctx context.Context, id uuid.UUID) error {
	return u.serviceRepo.Delete(ctx, id)
}

func (u *ServiceUsecase) UploadServicePhoto(ctx context.Context, serviceID uuid.UUID, file *entity.File, content io.Reader) error {
	// Проверяем, существует ли услуга
	service, err := u.serviceRepo.GetByID(ctx, serviceID)
	if err != nil {
		return err
	}
	// Загружаем файл в S3
	if err := u.fileRepo.Upload(ctx, file, content); err != nil {
		return err
	}
	// Обновляем PhotoURL
	service.PhotoURL = file.ID
	return u.serviceRepo.Update(ctx, service)
}
