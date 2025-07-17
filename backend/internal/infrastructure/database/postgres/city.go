package postgres

import (
	"context"
	"strings"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type CityRepository struct {
	db *gorm.DB
}

func NewCityRepository(postgres *Postgres) repository.CityRepository {
	return &CityRepository{db: postgres.GetDB()}
}

func (r *CityRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.City, error) {
	var city entity.City
	if err := r.db.WithContext(ctx).First(&city, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &city, nil
}

func (r *CityRepository) Create(ctx context.Context, city *entity.City) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(city).Error
	})
}

func (r *CityRepository) Update(ctx context.Context, city *entity.City) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(city).Error
	})
}

func (r *CityRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.City{}, id).Error
	})
}

func (r *CityRepository) ListCities(ctx context.Context, query string, page, pageSize int) ([]entity.City, int64, error) {
	var cities []entity.City
	var total int64

	queryBuilder := r.db.WithContext(ctx).Model(&entity.City{})

	if query != "" {
		queryBuilder = queryBuilder.Where("name ILIKE ?", "%"+strings.TrimSpace(query)+"%")
	}

	if err := queryBuilder.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * pageSize
	if err := queryBuilder.
		Order("name ASC").
		Offset(offset).
		Limit(pageSize).
		Find(&cities).Error; err != nil {
		return nil, 0, err
	}

	return cities, total, nil
}
