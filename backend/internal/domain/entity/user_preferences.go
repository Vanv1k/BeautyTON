package entity

import "github.com/google/uuid"

type UserPreferences struct {
	ID                  uuid.UUID `gorm:"type:uuid;primaryKey"`
	UserID              uuid.UUID `gorm:"type:uuid;column:user_id;not null"`
	PreferredCategoryID uuid.UUID `gorm:"type:uuid;column:preferred_category_id"`
	MaxPrice            float64   `gorm:"type:decimal(10,2)"`
	MaxDistanceKm       int       `gorm:"column:max_distance_km"`
}
