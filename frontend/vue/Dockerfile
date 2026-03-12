FROM node:22-alpine AS builder
WORKDIR /workspace/vue
COPY frontend/vue/package.json ./
RUN npm install
COPY frontend/vue/ ./
COPY frontend/apps.config.production.json ../apps.config.json
RUN npm run build

FROM nginx:alpine-slim
COPY --from=builder /workspace/vue/dist /usr/share/nginx/html
COPY frontend/vue/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
