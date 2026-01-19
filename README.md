# Sistema de Inventario

Aplicación full-stack para gestionar un inventario de productos utilizando NestJS en el backend y Angular en el frontend.

## Estructura del Proyecto

```
inventory/
├── backend/     # API Gateway y Microservicios (NestJS)
├── frontend/    # Aplicación Web (Angular)
└── README.md    # Este archivo
```

## Documentación

### [Backend - NestJS + Microservicios](./backend/README.md)
Arquitectura de microservicios con:
- **API Gateway**: Punto de entrada HTTP (Puerto 3000)
- **Microservicio de Productos**: Lógica de negocio (Puerto 3001)
- **Base de datos**: PostgreSQL en Docker

[Ver documentación del Backend →](./backend/README.md)

### [Frontend - Angular](./frontend/README.md)
Aplicación web moderna con:
- Framework: Angular 20+
- Componentes reutilizables
- Gestión de estado
- Pruebas unitarias

[Ver documentación del Frontend →](./frontend/README.md)

## Requisitos Previos
- Angular 20+
- Node.js 20+
- Docker y Docker Compose
- npm

## Inicio Rápido

### Backend

```bash
cd backend
npm install
docker-compose up
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

Luego accede a `http://localhost:4200/` para usar la aplicación.

## Tecnologías

- **Backend**: NestJS, Microservicios, TCP
- **Frontend**: Angular, TypeScript, SCSS
- **Datos**: PostgreSQL
- **Contenedorización**: Docker, Docker Compose