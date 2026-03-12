pub struct Config {
    pub server_port: u16,
    pub db_host: String,
    pub db_port: u16,
    pub db_user: String,
    pub db_pass: String,
    pub db_name: String,
}

impl Config {
    pub fn from_env() -> Self {
        Self {
            server_port: std::env::var("SERVER_PORT")
                .unwrap_or_else(|_| "8082".to_string())
                .parse()
                .unwrap_or(8082),
            db_host: std::env::var("DB_HOST").unwrap_or_else(|_| "localhost".to_string()),
            db_port: std::env::var("DB_PORT")
                .unwrap_or_else(|_| "3306".to_string())
                .parse()
                .unwrap_or(3306),
            db_user: std::env::var("DB_USER").unwrap_or_else(|_| "wilayah".to_string()),
            db_pass: std::env::var("DB_PASS")
                .unwrap_or_else(|_| "".to_string()),
            db_name: std::env::var("DB_NAME").unwrap_or_else(|_| "wilayah".to_string()),
        }
    }
}
