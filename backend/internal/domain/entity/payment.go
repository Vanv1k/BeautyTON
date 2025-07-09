package entity

import (
	"time"

	"github.com/google/uuid"
)

type Payment struct {
	ID               uuid.UUID     `gorm:"type:uuid;primaryKey"`
	ClientID         *uuid.UUID    `gorm:"type:uuid;column:client_id"`
	MasterID         *uuid.UUID    `gorm:"type:uuid;column:master_id"`
	Amount           float64       `gorm:"type:decimal(10,2)"`
	Currency         string        `gorm:"type:varchar(10)"`
	Type             PaymentType   `gorm:"type:varchar"`
	TonTransactionID string        `gorm:"type:varchar;column:ton_transaction_id"`
	Status           PaymentStatus `gorm:"type:varchar"`
	CreatedAt        time.Time     `gorm:"column:created_at"`
}
