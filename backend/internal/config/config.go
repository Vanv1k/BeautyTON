package config

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

type Config struct {
	Port     string
	Postgres PostgresConfig
	S3       S3Config
}

func Load() *Config {
	return &Config{
		Port: getEnv("PORT", "8080"),
		Postgres: PostgresConfig{
			Host:            getEnv("DB_HOST", "localhost"),
			Port:            getEnv("DB_PORT", "5432"),
			User:            getEnv("DB_USER", "postgres"),
			Password:        getEnv("DB_PASSWORD", "password"),
			DBName:          getEnv("DB_NAME", "beautyton"),
			SSLMode:         getEnv("DB_SSLMODE", "disable"),
			MaxOpenConns:    mustAtoi(getEnv("DB_MAX_OPEN_CONNS", "100")),
			MaxIdleConns:    mustAtoi(getEnv("DB_MAX_IDLE_CONNS", "10")),
			ConnMaxLifetime: mustParseDuration(getEnv("DB_CONN_MAX_LIFETIME", "1h")),
		},
		S3: S3Config{
			AccessKeyID:     getEnv("AWS_ACCESS_KEY_ID", ""),
			SecretAccessKey: getEnv("AWS_SECRET_ACCESS_KEY", ""),
			Region:          getEnv("AWS_REGION", ""),
			Bucket:          getEnv("AWS_S3_BUCKET", "beautyton-bucket"),
			Endpoint:        getEnv("AWS_S3_ENDPOINT", ""),
		},
	}
}

func getEnv(key, fallback string) string {
	val := os.Getenv(key)
	if val == "" {
		return fallback
	}
	return val
}

func mustAtoi(val string) int {
	i, err := strconv.Atoi(val)
	if err != nil {
		panic(fmt.Sprintf("invalid int value: %s, err: %v", val, err))
	}
	return i
}

func mustParseDuration(val string) time.Duration {
	d, err := time.ParseDuration(val)
	if err != nil {
		panic(fmt.Sprintf("invalid duration value: %s, err: %v", val, err))
	}
	return d
}
