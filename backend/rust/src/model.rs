use serde::Serialize;
use sqlx::FromRow;

#[derive(Debug, Serialize, FromRow)]
pub struct Wilayah {
    pub kode: String,
    pub nama: String,
    pub lat: Option<f64>,
    pub lng: Option<f64>,
    pub path: Option<String>,
    pub luas: Option<f64>,
    pub penduduk: Option<f64>,
}

#[derive(Debug, Serialize, FromRow)]
pub struct WilayahSummary {
    pub kode: String,
    pub nama: String,
}

#[derive(Debug, Serialize)]
pub struct WilayahResponse {
    pub status: bool,
    pub data: Wilayah,
    pub children: Vec<WilayahSummary>,
}
