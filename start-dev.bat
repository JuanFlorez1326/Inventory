@echo off
echo =========================================
echo   Sistema de Inventario - Microservicios
echo =========================================
echo.

REM Verificar si Docker está corriendo
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker no esta corriendo. Por favor, inicia Docker.
    exit /b 1
)

echo 1. Iniciando PostgreSQL...
docker-compose up -d postgres

echo 2. Esperando a que PostgreSQL este listo...
timeout /t 5 /nobreak >nul

echo 3. Iniciando microservicio de productos...
start /B cmd /c "npm run start:products"

echo 4. Esperando a que el microservicio de productos este listo...
timeout /t 5 /nobreak >nul

echo 5. Iniciando API Gateway...
start /B cmd /c "npm run start:gateway"

echo.
echo =========================================
echo   Servicios iniciados correctamente
echo =========================================
echo API Gateway: http://localhost:3000
echo Microservicio de Productos: TCP en puerto 3001
echo PostgreSQL: localhost:5432
echo.
echo Presiona Ctrl+C para detener todos los servicios
echo =========================================
echo.

pause
