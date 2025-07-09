package usecase

import (
	"context"
	"errors"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type CountryUsecase struct {
	countryRepo repository.CountryRepository
}

func NewCountryUsecase(countryRepo repository.CountryRepository) *CountryUsecase {
	return &CountryUsecase{
		countryRepo: countryRepo,
	}
}

func (u *CountryUsecase) GetCountry(ctx context.Context, id uuid.UUID) (*entity.Country, error) {
	return u.countryRepo.GetByID(ctx, id)
}

func (u *CountryUsecase) CreateCountry(ctx context.Context, country *entity.Country) error {
	// Валидация бизнес-логики
	if country.Name == "" {
		return errors.New("name is required")
	}
	if country.Code == "" {
		return errors.New("code is required")
	}
	return u.countryRepo.Create(ctx, country)
}

func (u *CountryUsecase) UpdateCountry(ctx context.Context, country *entity.Country) error {
	// Валидация бизнес-логики
	if country.Name == "" {
		return errors.New("name is required")
	}
	if country.Code == "" {
		return errors.New("code is required")
	}
	return u.countryRepo.Update(ctx, country)
}

func (u *CountryUsecase) DeleteCountry(ctx context.Context, id uuid.UUID) error {
	return u.countryRepo.Delete(ctx, id)
}
