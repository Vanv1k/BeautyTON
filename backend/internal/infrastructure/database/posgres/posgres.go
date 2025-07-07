package posgres

import "gorm.io/gorm"

type Postgres struct {
	db *gorm.DB
}

func NewPostgresRepo(db *gorm.DB) *Postgres {
	return &Postgres{
		db: db,
	}
}
