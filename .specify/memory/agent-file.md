# ZenTrack Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-11

## Active Technologies

- **Frontend:** Nuxt 3 (Vue 3) con Composition API y TypeScript.
- **Styling:** Tailwind CSS (Zen Design System).
- **Offline Storage:** Dexie.js para IndexedDB (Single Source of Truth).
- **PWA:** @vite-pwa/nuxt (Estrategia: autoUpdate / Offline-First).
- **Backend/Serverless:** Nuxt Nitro (Server Routes en `/server/api`).
- **Package Manager:** `uv` (Astral).

## Project Structure

```text
.specify/memory/         # Spec-Driven Development docs
server/
  └── api/               # Serverless Functions (AI & Sync)
src/
  ├── components/        # UI Atómica (Tailwind)
  ├── composables/       # Lógica reactiva y estado (Pinia)
  ├── pages/             # Vistas de la PWA
  └── utils/
      └── db.ts          # Configuración y esquemas de Dexie.js
```

## Commands

```
Dev: npx nuxi dev

Build: npx nuxi build

Deps: uv pip install [package]
```

## Code Style

- **SFC:** Uso obligatorio de `<script setup>` con Composition API.

- **Types:** Tipado estricto con TypeScript para todos los modelos de datos.

- **UX:** Implementar siempre Optimistic UI (actualizar la interfaz local antes de la confirmación del servidor/DB).

- **Offline:** Validar el estado de red (navigator.onLine) antes de llamadas a API.

## Recent Changes

- **001-zentrack-core-offline:** Inicialización del proyecto con arquitectura Offline-First, integración de Dexie.js para persistencia local y diseño de la lógica para el chatbot serverless.
