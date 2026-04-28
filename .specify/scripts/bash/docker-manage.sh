#!/bin/bash

# Script de conveniencia para manejar Docker de ZenTrack

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

case "$1" in
    up)
        echo "Levantando servicios Docker en modo detached..."
        docker compose -f "$DIR/docker-compose.yml" up -d
        ;;
    down)
        echo "Bajando servicios Docker..."
        docker compose -f "$DIR/docker-compose.yml" down
        ;;
    build)
        echo "Construyendo imágenes Docker..."
        docker compose -f "$DIR/docker-compose.yml" build
        ;;
    logs)
        echo "Mostrando logs..."
        docker compose -f "$DIR/docker-compose.yml" logs -f
        ;;
    clean)
        echo "Reconstruyendo desde cero (sin caché)..."
        docker compose -f "$DIR/docker-compose.yml" down -v
        docker compose -f "$DIR/docker-compose.yml" build --no-cache
        docker compose -f "$DIR/docker-compose.yml" up -d
        ;;
    *)
        echo "Uso: $0 {up|down|build|logs|clean}"
        exit 1
esac
