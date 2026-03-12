# wilayah.hadiubaidillah.com

# HTTP — redirect ke HTTPS
server {
    listen 80;
    server_name wilayah.hadiubaidillah.com;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS
server {
    listen 443 ssl;
    server_name wilayah.hadiubaidillah.com;

    # Let's Encrypt Certificate
    ssl_certificate     /etc/letsencrypt/live/wilayah.hadiubaidillah.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wilayah.hadiubaidillah.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Redirect ke react subdomain
    location / {
        return 301 https://react.wilayah.hadiubaidillah.com$request_uri;
    }

    # Spring Boot API (default)
    location /api/ {
        proxy_pass http://localhost:19080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Golang API — strip prefix /golang
    location /golang/ {
        rewrite ^/golang/(.*)$ /$1 break;
        proxy_pass http://localhost:19081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Rust API — strip prefix /rust
    location /rust/ {
        rewrite ^/rust/(.*)$ /$1 break;
        proxy_pass http://localhost:19082;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Logs
    access_log /var/log/nginx/wilayah.hadiubaidillah.com.access.log;
    error_log  /var/log/nginx/wilayah.hadiubaidillah.com.error.log;
}
