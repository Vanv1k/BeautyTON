package entity

import (
	"time"

	"github.com/google/uuid"
)

type Service struct {
	ID          uuid.UUID  `gorm:"type:uuid;primaryKey"`
	CategoryID  *uuid.UUID `gorm:"type:uuid;column:category_id"`
	UserID      *uuid.UUID `gorm:"type:uuid;column:user_id"`
	Title       string     `gorm:"type:varchar"`
	Description string     `gorm:"type:varchar"`
	PhotoURL    string     `gorm:"type:varchar;column:photo_url"`
	Price       float64    `gorm:"type:decimal(10,2)"`
	Duration    string     `gorm:"type:varchar"`
	CreatedAt   time.Time  `gorm:"column:created_at"`
}
