# Wilayah — Angular

Frontend Data Wilayah Administrasi Indonesia menggunakan **Angular 21** dan **TypeScript**.

## Stack

| | Versi |
|---|---|
| Angular | 21 |
| TypeScript | 5.9 |
| Leaflet | 1.9.4 |
| zone.js | 0.16 |
| Port | **4200** |

## Prasyarat

- Node.js 20+
- Angular CLI: `npm install -g @angular/cli`
- Salah satu backend berjalan (Spring Boot :8080, Go :8081, atau Rust :8082)

## Menjalankan

```bash
npm install
npm start
```

Aplikasi berjalan di `http://localhost:4200`.

## Konfigurasi Proxy

Secara default proxy mengarah ke Spring Boot (`localhost:8080`). Edit `proxy.conf.json` untuk mengganti target backend:

```json
{
  "/api": {
    "target": "http://localhost:8081",
    "changeOrigin": true
  }
}
```

Backend juga dapat diganti langsung dari UI melalui **Backend Switcher** di header.

## Scripts

| Perintah | Deskripsi |
|---|---|
| `npm start` | Jalankan dev server (port 4200) |
| `npm run build` | Build untuk production |
| `npm test` | Jalankan unit test (Karma + Jasmine) |

## Fitur

- Dropdown bertingkat: Provinsi → Kab/Kota → Kecamatan → Desa/Kelurahan
- Peta interaktif dengan polygon batas wilayah (Leaflet.js)
- Backend switcher (Spring Boot / Go / Rust)
- App switcher (React / Angular / Vue)
- Bilingual: Indonesia / English (auto-detect bahasa browser)
