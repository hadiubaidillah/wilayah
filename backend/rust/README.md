# Wilayah API — Rust (Axum)

REST API data Wilayah Administrasi Indonesia menggunakan **Rust** dan **Axum**.

## Stack

| | Versi |
|---|---|
| Rust Edition | 2021 |
| Axum | 0.8 |
| SQLx | 0.8 (MySQL) |
| Tokio | 1 |
| tower-http | 0.6 (CORS) |
| Port | **8082** |

## Prasyarat

- Rust (stable) + Cargo
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
| `SERVER_PORT` | `8082` |

## Menjalankan

```bash
cargo run
```

API berjalan di `http://localhost:8082`.

## Struktur

```
rust/src/
├── config.rs    # Konfigurasi database & server
├── db.rs        # Query database (SQLx)
├── handler.rs   # HTTP handler
├── model.rs     # Struct data (Serde)
└── main.rs      # Router & entry point
```

## Endpoint

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/wilayah` | Daftar semua provinsi |
| GET | `/api/wilayah/{kode}` | Detail wilayah + daftar anak wilayah |

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
