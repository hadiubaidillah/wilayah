package model

type Wilayah struct {
	Kode      string   `db:"kode"      json:"kode"`
	Nama      string   `db:"nama"      json:"nama"`
	Lat       *float64 `db:"lat"       json:"lat"`
	Lng       *float64 `db:"lng"       json:"lng"`
	Path      *string  `db:"path"      json:"path"`
	Luas      *float64 `db:"luas"      json:"luas"`
	Penduduk  *int64   `db:"penduduk"  json:"penduduk"`
}

type WilayahSummary struct {
	Kode string `json:"kode"`
	Nama string `json:"nama"`
}

type WilayahResponse struct {
	Status   bool             `json:"status"`
	Data     *WilayahData     `json:"data,omitempty"`
	Children []WilayahSummary `json:"children,omitempty"`
}

type WilayahData struct {
	Kode     string   `json:"kode"`
	Nama     string   `json:"nama"`
	Lat      float64  `json:"lat"`
	Lng      float64  `json:"lng"`
	Path     string   `json:"path"`
	Luas     *float64 `json:"luas"`
	Penduduk *int64   `json:"penduduk"`
}
