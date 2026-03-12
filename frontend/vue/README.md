# Wilayah — Vue

Frontend Data Wilayah Administrasi Indonesia menggunakan **Vue 3** dan **Vite**.

## Stack

| | Versi |
|---|---|
| Vue | 3.4 |
| Vite | 7 |
| Leaflet | 1.9.4 |
| Axios | 1.7.2 |
| Port | **5174** |

## Prasyarat

- Node.js 20+
- Salah satu backend berjalan (Spring Boot :8080, Go :8081, atau Rust :8082)

## Menjalankan

```bash
npm install
npm run dev
```

Aplikasi berjalan di `http://localhost:5174`.

## Konfigurasi Proxy

Secara default proxy mengarah ke Spring Boot (`localhost:8080`). Edit `vite.config.js` untuk mengganti target backend:

```js
proxy: {
  '/api': {
    target: 'http://localhost:8081', // ganti sesuai backend
  }
}
```

Backend juga dapat diganti langsung dari UI melalui **Backend Switcher** di header.

## Scripts

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Jalankan dev server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview hasil build |

## Fitur

- Dropdown bertingkat: Provinsi → Kab/Kota → Kecamatan → Desa/Kelurahan
- Peta interaktif dengan polygon batas wilayah (Leaflet.js)
- Backend switcher (Spring Boot / Go / Rust)
- App switcher (React / Angular / Vue)
- Bilingual: Indonesia / English (auto-detect bahasa browser)
