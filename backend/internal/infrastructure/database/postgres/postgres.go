package postgres

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/Vanv1k/BeautyTON/internal/config"
	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
)

type Postgres struct {
	db *gorm.DB
}

func NewPostgresRepo(cfg config.PostgresConfig) (*Postgres, error) {
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get sql.DB: %w", err)
	}
	sqlDB.SetMaxOpenConns(cfg.MaxOpenConns)
	sqlDB.SetMaxIdleConns(cfg.MaxIdleConns)
	sqlDB.SetConnMaxLifetime(cfg.ConnMaxLifetime)

	err = db.AutoMigrate(
		&entity.User{},
		&entity.UserPreferences{},
		&entity.MasterProfile{},
		&entity.Subscription{},
		&entity.MyMaster{},
		&entity.Service{},
		&entity.ServiceCategory{},
		&entity.Booking{},
		&entity.Review{},
		&entity.Payment{},
		&entity.City{},
		&entity.Country{},
	)
	if err != nil {
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}

	return &Postgres{db: db}, nil
}

func (p *Postgres) GetDB() *gorm.DB {
	return p.db
}
