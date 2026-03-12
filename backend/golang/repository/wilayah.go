package repository

import (
	"database/sql"
	"fmt"
	"wilayah-api/model"
)

type WilayahRepository struct {
	db *sql.DB
}

func NewWilayahRepository(db *sql.DB) *WilayahRepository {
	return &WilayahRepository{db: db}
}

func (r *WilayahRepository) FindAllProvinsi() ([]model.WilayahSummary, error) {
	rows, err := r.db.Query(
		"SELECT kode, nama FROM wilayah_level_1_2 WHERE CHAR_LENGTH(kode) = 2 ORDER BY nama",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []model.WilayahSummary
	for rows.Next() {
		var w model.WilayahSummary
		if err := rows.Scan(&w.Kode, &w.Nama); err != nil {
			return nil, err
		}
		result = append(result, w)
	}
	return result, nil
}

func (r *WilayahRepository) FindByKode(kode string) (*model.Wilayah, error) {
	var w model.Wilayah
	var penduduk *float64
	err := r.db.QueryRow(
		"SELECT kode, nama, lat, lng, path, luas, penduduk FROM wilayah_level_1_2 WHERE kode = ?",
		kode,
	).Scan(&w.Kode, &w.Nama, &w.Lat, &w.Lng, &w.Path, &w.Luas, &penduduk)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if penduduk != nil {
		v := int64(*penduduk)
		w.Penduduk = &v
	}
	return &w, err
}

func (r *WilayahRepository) FindChildren(prefix string, childLen int) ([]model.WilayahSummary, error) {
	query := fmt.Sprintf(
		"SELECT kode, nama FROM wilayah_level_1_2 WHERE kode LIKE ? AND CHAR_LENGTH(kode) = %d ORDER BY nama",
		childLen,
	)
	rows, err := r.db.Query(query, prefix+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []model.WilayahSummary
	for rows.Next() {
		var w model.WilayahSummary
		if err := rows.Scan(&w.Kode, &w.Nama); err != nil {
			return nil, err
		}
		result = append(result, w)
	}
	return result, nil
}
