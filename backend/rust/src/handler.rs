use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use sqlx::MySqlPool;

use crate::{db, model::{WilayahResponse, WilayahSummary}};

pub async fn get_provinsi(
    State(pool): State<MySqlPool>,
) -> Result<Json<Vec<WilayahSummary>>, StatusCode> {
    db::get_provinsi(&pool)
        .await
        .map(Json)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
}

pub async fn get_wilayah(
    State(pool): State<MySqlPool>,
    Path(kode): Path<String>,
) -> Result<Json<WilayahResponse>, StatusCode> {
    let wilayah = db::get_by_kode(&pool, &kode)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let child_len: Option<u32> = match kode.len() {
        2 => Some(5),
        5 => Some(8),
        8 => Some(13),
        _ => None,
    };

    let children = match child_len {
        Some(len) => db::get_children(&pool, &kode, len)
            .await
            .unwrap_or_default(),
        None => vec![],
    };

    Ok(Json(WilayahResponse {
        status: true,
        data: wilayah,
        children,
    }))
}
