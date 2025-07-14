package entity

import (
	"time"

	"github.com/google/uuid"
)

type ScheduleSlot struct {
	ID        uuid.UUID          `gorm:"type:uuid;primaryKey"`
	MasterID  uuid.UUID          `gorm:"type:uuid;not null;index"`
	BookingID *uuid.UUID         `gorm:"type:uuid;index"`
	Date      time.Time          `gorm:"type:date;not null"`
	StartTime time.Time          `gorm:"type:timestamp;not null"`
	EndTime   time.Time          `gorm:"type:timestamp;not null"`
	Status    ScheduleSlotStatus `gorm:"type:schedule_slot_status;not null"`
	SlotType  SlotType           `gorm:"type:slot_type;not null"`
	CreatedAt time.Time          `gorm:"type:timestamp;not null;default:now()"`
	UpdatedAt time.Time          `gorm:"type:timestamp;not null;default:now()"`
}
