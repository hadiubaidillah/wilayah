FROM node:22-alpine AS builder
WORKDIR /workspace/react
COPY frontend/react/package.json ./
RUN npm install
COPY frontend/react/ ./
COPY frontend/apps.config.production.json ../apps.config.json
RUN npm run build

FROM nginx:alpine-slim
COPY --from=builder /workspace/react/dist /usr/share/nginx/html
COPY frontend/react/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
