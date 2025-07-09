package entity

import "github.com/google/uuid"

type City struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	Name      string    `gorm:"type:varchar"`
	CountryID uuid.UUID `gorm:"type:uuid;column:country_id;not null"`
	Timezone  string    `gorm:"type:varchar"`
}
