package entity

import (
	"time"

	"github.com/google/uuid"
)

type MasterProfile struct {
	ID        uuid.UUID  `gorm:"type:uuid;primaryKey"`
	UserID    *uuid.UUID `gorm:"type:uuid;column:user_id"`
	QRCode    string     `gorm:"type:varchar;column:qr_code;not null"`
	Bio       string     `gorm:"type:varchar"`
	Status    string     `gorm:"type:varchar"`
	Rating    float64    `gorm:"type:decimal"`
	CreatedAt time.Time  `gorm:"column:created_at"`
	UpdatedAt time.Time  `gorm:"column:updated_at"`
}
