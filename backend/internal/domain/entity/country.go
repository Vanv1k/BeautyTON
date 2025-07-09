package entity

import "github.com/google/uuid"

type Country struct {
	ID   uuid.UUID `gorm:"type:uuid;primaryKey"`
	Name string    `gorm:"type:varchar"`
	Code string    `gorm:"type:varchar(2)"`
}
