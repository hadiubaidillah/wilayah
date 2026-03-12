package config

import (
	"fmt"
	"os"
)

type Config struct {
	DBHost     string
	DBUser     string
	DBPassword string
	DBName     string
	DBPort     string
	ServerPort string
	AllowedOrigins string
}

func Load() *Config {
	return &Config{
		DBHost:         getEnv("DB_HOST", "localhost"),
		DBUser:         getEnv("DB_USER", "wilayah"),
		DBPassword:     getEnv("DB_PASSWORD", ""),
		DBName:         getEnv("DB_NAME", "wilayah"),
		DBPort:         getEnv("DB_PORT", "3306"),
		ServerPort:     getEnv("SERVER_PORT", "8081"),
		AllowedOrigins: getEnv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174,http://localhost:4200"),
	}
}

func (c *Config) DSN() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&loc=Asia%%2FJakarta",
		c.DBUser, c.DBPassword, c.DBHost, c.DBPort, c.DBName)
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
