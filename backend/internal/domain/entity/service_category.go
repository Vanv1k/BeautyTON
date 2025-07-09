package entity

import "github.com/google/uuid"

type ServiceCategory struct {
	ID   uuid.UUID `gorm:"type:uuid;primaryKey"`
	Name string    `gorm:"type:varchar"`
}
