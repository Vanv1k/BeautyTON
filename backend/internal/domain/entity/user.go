package entity

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	TgID      int64     `gorm:"column:tg_id"`
	Username  string    `gorm:"type:varchar"`
	Role      UserRole  `gorm:"type:varchar"`
	PhotoURL  string    `gorm:"type:varchar;column:photo_url"`
	CityID    uuid.UUID `gorm:"type:uuid;column:city;not null"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
	TonWallet string    `gorm:"type:varchar;column:ton_wallet"`
}
