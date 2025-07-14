package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type Config struct {
	Port     string
	Postgres PostgresConfig
	S3       S3Config
}

func Load() *Config {
	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "dev"
	}

	return &Config{
		Port: getEnv("PORT", "8080", env),
		Postgres: PostgresConfig{
			Host:            getEnv("DB_HOST", "localhost", env),
			Port:            getEnv("DB_PORT", "5432", env),
			User:            getEnv("DB_USER", "postgres", env),
			Password:        getEnv("DB_PASSWORD", "password", env),
			DBName:          getEnv("DB_NAME", "beautyton", env),
			SSLMode:         getEnv("DB_SSLMODE", "disable", env),
			MaxOpenConns:    mustAtoi(getEnv("DB_MAX_OPEN_CONNS", "150", env)),
			MaxIdleConns:    mustAtoi(getEnv("DB_MAX_IDLE_CONNS", "10", env)),
			ConnMaxLifetime: mustParseDuration(getEnv("DB_CONN_MAX_LIFETIME", "1h", env)),
		},
		S3: S3Config{
			AccessKeyID:     getEnv("AWS_ACCESS_KEY_ID", "", env),
			SecretAccessKey: getEnv("AWS_SECRET_ACCESS_KEY", "", env),
			Region:          getEnv("AWS_REGION", "", env),
			Bucket:          getEnv("AWS_S3_BUCKET", "beautyton-bucket", env),
			Endpoint:        getEnv("AWS_S3_ENDPOINT", "", env),
		},
	}
}

func getEnv(key, fallback string, env string) string {
	// Сначала проверяем переменную с префиксом окружения (например PROD_DB_HOST)
	prefixedKey := strings.ToUpper(env) + "_" + key
	if val, exists := os.LookupEnv(prefixedKey); exists {
		return val
	}

	// Затем проверяем переменную без префикса
	if val, exists := os.LookupEnv(key); exists {
		return val
	}

	// Возвращаем значение по умолчанию
	return fallback
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
