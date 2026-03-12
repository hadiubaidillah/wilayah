use crate::model::{Wilayah, WilayahSummary};
use sqlx::MySqlPool;

pub async fn get_provinsi(pool: &MySqlPool) -> Result<Vec<WilayahSummary>, sqlx::Error> {
    sqlx::query_as::<_, WilayahSummary>(
        "SELECT kode, nama FROM wilayah_level_1_2 WHERE LENGTH(kode) = 2 ORDER BY kode",
    )
    .fetch_all(pool)
    .await
}

pub async fn get_by_kode(pool: &MySqlPool, kode: &str) -> Result<Option<Wilayah>, sqlx::Error> {
    sqlx::query_as::<_, Wilayah>(
        "SELECT kode, nama, lat, lng, path,
                CAST(luas AS DOUBLE) AS luas,
                CAST(penduduk AS DOUBLE) AS penduduk
         FROM wilayah_level_1_2 WHERE kode = ?",
    )
    .bind(kode)
    .fetch_optional(pool)
    .await
}

pub async fn get_children(
    pool: &MySqlPool,
    kode: &str,
    child_len: u32,
) -> Result<Vec<WilayahSummary>, sqlx::Error> {
    sqlx::query_as::<_, WilayahSummary>(
        "SELECT kode, nama FROM wilayah_level_1_2
         WHERE kode LIKE ? AND LENGTH(kode) = ? ORDER BY kode",
    )
    .bind(format!("{}%", kode))
    .bind(child_len)
    .fetch_all(pool)
    .await
}
