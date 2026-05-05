FROM node:18-alpine AS builder
WORKDIR /app
COPY react_unzipped/package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false
COPY react_unzipped/ ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]