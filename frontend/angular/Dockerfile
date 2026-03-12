FROM node:22-alpine AS builder
WORKDIR /workspace/angular
COPY frontend/angular/package.json ./
RUN npm install
COPY frontend/angular/ ./
COPY frontend/apps.config.production.json ../apps.config.json
RUN npm run build

FROM nginx:alpine-slim
COPY --from=builder /workspace/angular/dist/angular/browser /usr/share/nginx/html
COPY frontend/angular/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
