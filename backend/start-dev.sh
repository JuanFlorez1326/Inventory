#!/bin/bash

echo "========================================="
echo "  Sistema de Inventario - Microservicios"
echo "========================================="
echo ""

if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker no está corriendo. Por favor, inicia Docker."
    exit 1
fi

cleanup() {
    echo ""
    echo "Deteniendo servicios..."
    docker-compose down
    exit 0
}

trap cleanup SIGINT SIGTERM

echo "1. Iniciando PostgreSQL..."
docker-compose up -d postgres

echo "2. Esperando a que PostgreSQL esté listo..."
sleep 5

echo "3. Iniciando microservicio de productos..."
npm run start:products &
PRODUCTS_PID=$!

echo "4. Esperando a que el microservicio de productos esté listo..."
sleep 5

echo "5. Iniciando API Gateway..."
npm run start:gateway &
GATEWAY_PID=$!

echo ""
echo "========================================="
echo "  Servicios iniciados correctamente"
echo "========================================="
echo "API Gateway: http://localhost:3000"
echo "Microservicio de Productos: TCP en puerto 3001"
echo "PostgreSQL: localhost:5432"
echo ""
echo "Presiona Ctrl+C para detener todos los servicios"
echo "========================================="

wait