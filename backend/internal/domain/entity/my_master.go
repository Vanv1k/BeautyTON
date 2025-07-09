package entity

import (
	"time"

	"github.com/google/uuid"
)

type MyMaster struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	ClientID  uuid.UUID `gorm:"type:uuid;column:client_id;not null"`
	MasterID  uuid.UUID `gorm:"type:uuid;column:master_id;not null"`
	CreatedAt time.Time `gorm:"column:created_at"`
}
