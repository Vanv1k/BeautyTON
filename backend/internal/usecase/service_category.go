package usecase

import (
	"context"
	"errors"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type ServiceCategoryUsecase struct {
	serviceCategoryRepo repository.ServiceCategoryRepository
}

func NewServiceCategoryUsecase(serviceCategoryRepo repository.ServiceCategoryRepository) *ServiceCategoryUsecase {
	return &ServiceCategoryUsecase{
		serviceCategoryRepo: serviceCategoryRepo,
	}
}

func (u *ServiceCategoryUsecase) GetServiceCategory(ctx context.Context, id uuid.UUID) (*entity.ServiceCategory, error) {
	return u.serviceCategoryRepo.GetByID(ctx, id)
}

func (u *ServiceCategoryUsecase) CreateServiceCategory(ctx context.Context, category *entity.ServiceCategory) error {
	// Валидация бизнес-логики
	if category.Name == "" {
		return errors.New("name is required")
	}
	return u.serviceCategoryRepo.Create(ctx, category)
}

func (u *ServiceCategoryUsecase) UpdateServiceCategory(ctx context.Context, category *entity.ServiceCategory) error {
	// Валидация бизнес-логики
	if category.Name == "" {
		return errors.New("name is required")
	}
	return u.serviceCategoryRepo.Update(ctx, category)
}

func (u *ServiceCategoryUsecase) DeleteServiceCategory(ctx context.Context, id uuid.UUID) error {
	return u.serviceCategoryRepo.Delete(ctx, id)
}
