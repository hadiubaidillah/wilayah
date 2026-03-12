mod config;
mod db;
mod handler;
mod model;

use axum::{routing::get, Router};
use sqlx::mysql::MySqlConnectOptions;
use sqlx::MySqlPool;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    let _ = dotenvy::dotenv();
    let cfg = config::Config::from_env();

    let opts = MySqlConnectOptions::new()
        .host(&cfg.db_host)
        .port(cfg.db_port)
        .username(&cfg.db_user)
        .password(&cfg.db_pass)
        .database(&cfg.db_name);

    let pool = MySqlPool::connect_with(opts)
        .await
        .expect("Failed to connect to MySQL");

    let cors = CorsLayer::new()
        .allow_origin([
            "http://localhost:5173".parse().unwrap(),
            "http://localhost:5174".parse().unwrap(),
            "http://localhost:4200".parse().unwrap(),
        ])
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/wilayah", get(handler::get_provinsi))
        .route("/api/wilayah/{kode}", get(handler::get_wilayah))
        .with_state(pool)
        .layer(cors);

    let addr = format!("0.0.0.0:{}", cfg.server_port);
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    println!("Rust/Axum running on http://{}", addr);
    axum::serve(listener, app).await.unwrap();
}
