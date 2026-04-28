FROM node:20-alpine

# Instalar dependencias necesarias para compilar better-sqlite3 si no hay prebuilds disponibles
RUN apk add --no-cache python3 make g++ sqlite-dev

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Exponer puerto del backend
EXPOSE 22897

# Variables de entorno por defecto
ENV PORT=22897
ENV NODE_ENV=production

# Comando para iniciar el servidor
CMD ["npm", "start"]
