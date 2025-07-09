package usecase

import (
	"context"
	"errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
	"github.com/google/uuid"
)

type UserPreferencesUsecase struct {
	userPreferencesRepo repository.UserPreferencesRepository
	userRepo            repository.UserRepository
	serviceCategoryRepo repository.ServiceCategoryRepository
}

func NewUserPreferencesUsecase(userPreferencesRepo repository.UserPreferencesRepository, userRepo repository.UserRepository, serviceCategoryRepo repository.ServiceCategoryRepository) *UserPreferencesUsecase {
	return &UserPreferencesUsecase{
		userPreferencesRepo: userPreferencesRepo,
		userRepo:            userRepo,
		serviceCategoryRepo: serviceCategoryRepo,
	}
}

func (u *UserPreferencesUsecase) GetUserPreferences(ctx context.Context, id uuid.UUID) (*entity.UserPreferences, error) {
	return u.userPreferencesRepo.GetByID(ctx, id)
}

func (u *UserPreferencesUsecase) CreateUserPreferences(ctx context.Context, preferences *entity.UserPreferences) error {
	// Валидация бизнес-логики
	if preferences.UserID == uuid.Nil {
		return errors.New("user_id is required")
	}
	if _, err := u.userRepo.GetByID(ctx, preferences.UserID); err != nil {
		return err
	}
	if preferences.PreferredCategoryID != uuid.Nil {
		if _, err := u.serviceCategoryRepo.GetByID(ctx, preferences.PreferredCategoryID); err != nil {
			return errors.New("invalid preferred_category_id")
		}
	}
	if preferences.MaxPrice < 0 {
		return errors.New("max_price cannot be negative")
	}
	if preferences.MaxDistanceKm < 0 {
		return errors.New("max_distance_km cannot be negative")
	}
	return u.userPreferencesRepo.Create(ctx, preferences)
}

func (u *UserPreferencesUsecase) UpdateUserPreferences(ctx context.Context, preferences *entity.UserPreferences) error {
	// Валидация бизнес-логики
	if preferences.UserID == uuid.Nil {
		return errors.New("user_id is required")
	}
	if _, err := u.userRepo.GetByID(ctx, preferences.UserID); err != nil {
		return err
	}
	if preferences.PreferredCategoryID != uuid.Nil {
		if _, err := u.serviceCategoryRepo.GetByID(ctx, preferences.PreferredCategoryID); err != nil {
			return errors.New("invalid preferred_category_id")
		}
	}
	if preferences.MaxPrice < 0 {
		return errors.New("max_price cannot be negative")
	}
	if preferences.MaxDistanceKm < 0 {
		return errors.New("max_distance_km cannot be negative")
	}
	return u.userPreferencesRepo.Update(ctx, preferences)
}

func (u *UserPreferencesUsecase) DeleteUserPreferences(ctx context.Context, id uuid.UUID) error {
	return u.userPreferencesRepo.Delete(ctx, id)
}
