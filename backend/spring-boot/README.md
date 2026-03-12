# Wilayah API — Spring Boot

REST API data Wilayah Administrasi Indonesia menggunakan **Spring Boot 4** dan **Java 25**.

## Stack

| | Versi |
|---|---|
| Spring Boot | 4.0.3 |
| Java | 25 |
| MySQL Driver | spring-boot-starter-data-jpa |
| Port | **8080** |

## Prasyarat

- Java 25+
- Maven 3.8+
- MySQL — database `wilayah` sudah terisi (lihat `database/` di root)

## Konfigurasi

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wilayah
spring.datasource.username=wilayah
spring.datasource.password=your_password
```

Atau gunakan environment variables:

| Variabel | Default |
|---|---|
| `DB_HOST` | `localhost` |
| `DB_PORT` | `3306` |
| `DB_USER` | `wilayah` |
| `DB_PASS` | — |
| `DB_NAME` | `wilayah` |
| `SERVER_PORT` | `8080` |

## Menjalankan

```bash
mvn spring-boot:run
```

API berjalan di `http://localhost:8080`.

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
