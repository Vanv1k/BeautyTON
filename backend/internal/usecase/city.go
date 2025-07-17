package usecase

import (
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type CityUsecase struct {
	cityRepo    repository.CityRepository
	countryRepo repository.CountryRepository
}

func NewCityUsecase(cityRepo repository.CityRepository, countryRepo repository.CountryRepository) *CityUsecase {
	return &CityUsecase{
		cityRepo:    cityRepo,
		countryRepo: countryRepo,
	}
}

func (u *CityUsecase) GetCity(ctx context.Context, id uuid.UUID) (*entity.City, error) {
	return u.cityRepo.GetByID(ctx, id)
}

func (u *CityUsecase) CreateCity(ctx context.Context, city *entity.City) error {
	// Валидация бизнес-логики
	if city.Name == "" {
		return errors.New("name is required")
	}
	if city.CountryID == uuid.Nil {
		return errors.New("country_id is required")
	}
	if _, err := u.countryRepo.GetByID(ctx, city.CountryID); err != nil {
		return errors.New("invalid country_id")
	}
	return u.cityRepo.Create(ctx, city)
}

func (u *CityUsecase) UpdateCity(ctx context.Context, city *entity.City) error {
	// Валидация бизнес-логики
	if city.Name == "" {
		return errors.New("name is required")
	}
	if city.CountryID == uuid.Nil {
		return errors.New("country_id is required")
	}
	if _, err := u.countryRepo.GetByID(ctx, city.CountryID); err != nil {
		return errors.New("invalid country_id")
	}
	return u.cityRepo.Update(ctx, city)
}

func (u *CityUsecase) DeleteCity(ctx context.Context, id uuid.UUID) error {
	return u.cityRepo.Delete(ctx, id)
}

func (u *CityUsecase) ListCities(ctx context.Context, query string, page, pageSize int) ([]entity.City, int64, error) {
	// Валидация
	if page < 1 {
		page = 1
	}
	if pageSize < 1 {
		pageSize = 10
	}
	if pageSize > 100 {
		pageSize = 100
	}
	query = strings.TrimSpace(query)

	return u.cityRepo.ListCities(ctx, page, pageSize)
}
