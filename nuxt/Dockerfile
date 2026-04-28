# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa de ejecución
FROM node:20-alpine

WORKDIR /app

# Copiar solo los artefactos necesarios desde la etapa de construcción
COPY --from=builder /app/.output ./.output

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production
# URL por defecto del backend interno en docker network
ENV NUXT_PUBLIC_API_BASE=http://backend:22897

CMD ["node", ".output/server/index.mjs"]
