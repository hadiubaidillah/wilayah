package service

import (
	"fmt"
	"wilayah-api/model"
	"wilayah-api/repository"
)

type WilayahService struct {
	repo *repository.WilayahRepository
}

func NewWilayahService(repo *repository.WilayahRepository) *WilayahService {
	return &WilayahService{repo: repo}
}

func (s *WilayahService) GetProvinsi() ([]model.WilayahSummary, error) {
	return s.repo.FindAllProvinsi()
}

func (s *WilayahService) GetWilayah(kode string, geoOnly bool) (*model.WilayahResponse, error) {
	w, err := s.repo.FindByKode(kode)
	if err != nil {
		return nil, err
	}
	if w == nil || w.Lat == nil {
		return nil, nil
	}

	path := ""
	if w.Path != nil && *w.Path != "" {
		path = *w.Path
	} else {
		path = fmt.Sprintf("[[%f,%f],[%f,%f],[%f,%f],[%f,%f]]",
			*w.Lat-0.01, *w.Lng-0.01,
			*w.Lat+0.01, *w.Lng-0.01,
			*w.Lat+0.01, *w.Lng+0.01,
			*w.Lat-0.01, *w.Lng+0.01,
		)
	}

	data := &model.WilayahData{
		Kode:     w.Kode,
		Nama:     w.Nama,
		Lat:      *w.Lat,
		Lng:      *w.Lng,
		Path:     path,
		Luas:     w.Luas,
		Penduduk: w.Penduduk,
	}

	resp := &model.WilayahResponse{Status: true, Data: data}

	if !geoOnly {
		n := len(kode)
		childLen := map[int]int{2: 5, 5: 8, 8: 13}[n]
		if childLen > 0 {
			children, err := s.repo.FindChildren(kode, childLen)
			if err != nil {
				return nil, err
			}
			resp.Children = children
		}
	}

	return resp, nil
}
