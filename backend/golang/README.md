# Wilayah API — Go (Gin)

REST API data Wilayah Administrasi Indonesia menggunakan **Go** dan **Gin**.

## Stack

| | Versi |
|---|---|
| Go | 1.26 |
| Gin | v1.12.0 |
| MySQL Driver | go-sql-driver/mysql v1.9.3 |
| Port | **8081** |

## Prasyarat

- Go 1.26+
- MySQL — database `wilayah` sudah terisi (lihat `database/` di root)

## Konfigurasi

Gunakan environment variables (default sudah diset):

| Variabel | Default |
|---|---|
| `DB_HOST` | `localhost` |
| `DB_PORT` | `3306` |
| `DB_USER` | `wilayah` |
| `DB_PASS` | — |
| `DB_NAME` | `wilayah` |
| `SERVER_PORT` | `8081` |

## Menjalankan

```bash
go run .
```

API berjalan di `http://localhost:8081`.

## Struktur

```
golang/
├── config/        # Konfigurasi database & server
├── handler/       # HTTP handler (controller)
├── model/         # Struct data
├── repository/    # Query database
├── service/       # Business logic
└── main.go
```

## Endpoint

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/wilayah` | Daftar semua provinsi |
| GET | `/api/wilayah/:kode` | Detail wilayah + daftar anak wilayah |

## Contoh Response

**GET /api/wilayah**
```json
[
  { "kode": "11", "nama": "Aceh" },
  { "kode": "32", "nama": "Jawa Barat" }
]
```

**GET /api/wilayah/32**
```json
{
  "status": true,
  "data": {
    "kode": "32",
    "nama": "Jawa Barat",
    "lat": -6.9,
    "lng": 107.6,
    "luas": 37053.331,
    "penduduk": 51316378,
    "path": "..."
  },
  "children": [
    { "kode": "32.01", "nama": "Kabupaten Bogor" }
  ]
}
```

## Logika Kode Wilayah

| Panjang Kode | Level |
|---|---|
| 2 | Provinsi |
| 5 | Kabupaten / Kota |
| 8 | Kecamatan |
| 13 | Desa / Kelurahan |
