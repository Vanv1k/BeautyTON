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

type MasterProfileRepository struct {
	db *gorm.DB
}

func NewMasterProfileRepository(postgres *Postgres) repository.MasterProfileRepository {
	return &MasterProfileRepository{db: postgres.GetDB()}
}

func (r *MasterProfileRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.MasterProfile, error) {
	var profile entity.MasterProfile
	if err := r.db.WithContext(ctx).First(&profile, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrRecordNotFound
		}
		return nil, err
	}
	return &profile, nil
}

func (r *MasterProfileRepository) Create(ctx context.Context, profile *entity.MasterProfile) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Create(profile).Error
	})
}

func (r *MasterProfileRepository) Update(ctx context.Context, profile *entity.MasterProfile) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Save(profile).Error
	})
}

func (r *MasterProfileRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return tx.Delete(&entity.MasterProfile{}, id).Error
	})
}

func (r *MasterProfileRepository) List(ctx context.Context, query, category, city string, priceFrom, priceTo int, rating float64, page, pageSize int) ([]entity.MasterProfile, int64, error) {
	var profiles []entity.MasterProfile
	var total int64

	queryBuilder := r.db.WithContext(ctx).Model(&entity.MasterProfile{}).
		Joins("LEFT JOIN services ON services.user_id = master_profiles.id").
		Joins("LEFT JOIN service_categories ON service_categories.id = services.category_id").
		Joins("LEFT JOIN users ON users.user_id = master_profiles.user_id").
		Joins("LEFT JOIN cities ON users.city = cities.id")

	if query != "" {
		queryBuilder = queryBuilder.Where("services.title ILIKE ?", "%"+strings.TrimSpace(query)+"%")
	}
	if category != "" {
		queryBuilder = queryBuilder.Where("service_categories.name = ?", category)
	}
	if city != "" {
		queryBuilder = queryBuilder.Where("cities.name ILIKE ?", "%"+strings.TrimSpace(city)+"%")
	}
	if priceFrom > 0 {
		queryBuilder = queryBuilder.Where("services.price >= ?", priceFrom)
	}
	if priceTo > 0 {
		queryBuilder = queryBuilder.Where("services.price <= ?", priceTo)
	}
	if rating > 0 {
		queryBuilder = queryBuilder.Where("master_profiles.rating >= ?", rating)
	}

	queryBuilder = queryBuilder.Group("master_profiles.id")

	if err := queryBuilder.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Fetch paginated profiles
	offset := (page - 1) * pageSize
	if err := queryBuilder.
		Order("master_profiles.name ASC").
		Offset(offset).
		Limit(pageSize).
		Select("master_profiles.*").
		Find(&profiles).Error; err != nil {
		return nil, 0, err
	}

	return profiles, total, nil
}
