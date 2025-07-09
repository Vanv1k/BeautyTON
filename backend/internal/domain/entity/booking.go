package entity

import (
	"time"

	"github.com/google/uuid"
)

type Booking struct {
	ID          uuid.UUID     `gorm:"type:uuid;primaryKey"`
	ClientID    uuid.UUID     `gorm:"type:uuid;column:client_id;not null"`
	MasterID    uuid.UUID     `gorm:"type:uuid;column:master_id;not null"`
	ServiceID   uuid.UUID     `gorm:"type:uuid;column:service_id;not null"`
	BookingTime time.Time     `gorm:"column:booking_time;not null"`
	Status      BookingStatus `gorm:"type:varchar"`
	CreatedAt   time.Time     `gorm:"column:created_at"`
	UpdatedAt   time.Time     `gorm:"column:updated_at"`
}
