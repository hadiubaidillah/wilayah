package main

import (
	"database/sql"
	"log"
	"strings"
	"wilayah-api/config"
	"wilayah-api/handler"
	"wilayah-api/repository"
	"wilayah-api/service"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()
	cfg := config.Load()

	db, err := sql.Open("mysql", cfg.DSN())
	if err != nil {
		log.Fatalf("failed to open db: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("failed to connect db: %v", err)
	}
	log.Println("database connected")

	repo := repository.NewWilayahRepository(db)
	svc := service.NewWilayahService(repo)
	h := handler.NewWilayahHandler(svc)

	r := gin.Default()

	// CORS
	origins := strings.Split(cfg.AllowedOrigins, ",")
	r.Use(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		for _, o := range origins {
			if strings.TrimSpace(o) == origin {
				c.Header("Access-Control-Allow-Origin", origin)
				break
			}
		}
		c.Header("Access-Control-Allow-Methods", "GET, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	api := r.Group("/api/wilayah")
	{
		api.GET("", h.GetProvinsi)
		api.GET("/:kode", h.GetWilayah)
	}

	log.Printf("server running on :%s", cfg.ServerPort)
	if err := r.Run(":" + cfg.ServerPort); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
