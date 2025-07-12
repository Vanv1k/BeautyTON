package entity

import "github.com/google/uuid"

type Review struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	BookingID uuid.UUID `gorm:"type:uuid;column:booking_id"`
	Rating    int       `gorm:"type:integer"`
	Comment   string    `gorm:"type:text"`
}
