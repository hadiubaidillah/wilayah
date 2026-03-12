package handler

import (
	"net/http"
	"wilayah-api/service"

	"github.com/gin-gonic/gin"
)

type WilayahHandler struct {
	svc *service.WilayahService
}

func NewWilayahHandler(svc *service.WilayahService) *WilayahHandler {
	return &WilayahHandler{svc: svc}
}

// GET /api/wilayah
func (h *WilayahHandler) GetProvinsi(c *gin.Context) {
	data, err := h.svc.GetProvinsi()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}

// GET /api/wilayah/:kode
// GET /api/wilayah/:kode?geo=true
func (h *WilayahHandler) GetWilayah(c *gin.Context) {
	kode := c.Param("kode")
	geoOnly := c.Query("geo") == "true"

	resp, err := h.svc.GetWilayah(kode, geoOnly)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if resp == nil {
		c.JSON(http.StatusNotFound, gin.H{"status": false, "error": "data not found"})
		return
	}
	c.JSON(http.StatusOK, resp)
}
