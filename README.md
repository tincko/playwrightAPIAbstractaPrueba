# Automatización de API de PetStore

Este proyecto contiene pruebas automatizadas de API para la API de PetStore utilizando Playwright y TypeScript.

## Requisitos Previos

- Node.js (v14 o superior)
- npm

## Configuración

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar pruebas:
   ```bash
   npx playwright test
   ```

## Estructura

- `src/lib/`: Clases envoltorio de API (`PetApi`, `StoreApi`).
- `src/utils/`: Utilidades (`DataGenerator` usando Faker).
- `tests/`: Especificaciones de prueba.
  - `Part1.spec.ts`: Escenario 1 (Crear mascotas, obtener detalles).
  - `Part2.spec.ts`: Escenario 2 (Listar mascotas disponibles, crear órdenes).

## Reportes

Después de ejecutar las pruebas, puede ver el reporte:
```bash
npx playwright show-report
```
