FROM rust:1-slim-bookworm AS builder
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release --locked
RUN rm -rf src
COPY src ./src
RUN touch src/main.rs && cargo build --release --locked

FROM alpine:latest
RUN apk --no-cache add ca-certificates libssl3
WORKDIR /app
COPY --from=builder /app/target/release/wilayah-api .
EXPOSE 8082
CMD ["./wilayah-api"]
