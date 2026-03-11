# ZenTrack Constitution

## Core Principles

### I. Offline-First (NON-NEGOTIABLE)

La aplicación debe ser plenamente funcional sin conexión a internet. Toda la lógica de negocio y el almacenamiento de datos del usuario deben residir en el cliente. Se prohíbe el uso de LocalStorage para datos sensibles o complejos; se debe utilizar **IndexedDB** a través de **Dexie.js** para garantizar persistencia y rendimiento.

### II. Serverless Architecture

Todo el procesamiento pesado, la autenticación y la integración con modelos de lenguaje (LLM) deben ejecutarse mediante funciones serverless en **Nuxt Nitro** o mediante un **servidor backend Node/Express** dedicado. La comunicación entre el cliente y el servidor debe ser asíncrona y resistente a fallos de red.

### III. Privacy & Local Context

Los datos de bienestar y estado de ánimo del usuario son privados. El procesamiento de IA debe priorizar el contexto local. Antes de enviar una consulta al chatbot, el sistema debe inyectar el contexto recuperado de IndexedDB para que la IA actúe de forma personalizada sin necesidad de bases de datos vectoriales externas complejas.

### IV. Zen Design System

Uso obligatorio de Stitch para componentes de UI y diseño.

### V. Spec-Driven Development (SDD)

Este proyecto se rige por la documentación. Ningún componente o funcionalidad se desarrolla sin que su Especificación y Plan técnico hayan sido validados. La estructura `.specify` es la fuente única de verdad para cualquier agente de IA o desarrollador humano.

## Technical Constraints & Stack

### Framework & UI

- **Framework:** Nuxt 3 (Vue 3) con Composition API.
- **Styling:** Tailwind CSS.
- **Icons:** Lucide Vue.

### Data & State

- **State Management:** Pinia.
- **Persistence:** `pinia-plugin-persistedstate` (para configuración) y **Dexie.js** (para datos de usuario/historial).
- **Service Worker:** `@vite-pwa/nuxt` con estrategia de almacenamiento en caché para assets estáticos.

### AI & Backend

- **Runtime:** Nuxt Nitro (Serverless).
- **AI Integration:** OpenAI API / Anthropic vía Server Routes para proteger credenciales.

## Development Workflow

### Quality Gates

1. **Validation:** Todo código nuevo debe pasar una revisión contra la Constitución.
2. **Offline Testing:** Las funcionalidades deben probarse simulando "Offline" en las DevTools de Chrome/Zorin.
3. **TypeScript:** Tipado estricto en toda la lógica de la base de datos y la comunicación con el chatbot.

### Synchronisation Policy

La sincronización con la nube (Cloud Sync) debe ser un proceso en segundo plano que no bloquee la interfaz. El usuario debe poder ver claramente el estado de su sincronización local vs. remota.

## Governance

Esta Constitución prevalece sobre cualquier otra instrucción o sugerencia técnica. Cualquier enmienda a estos principios requiere una actualización formal de este documento y una revisión de impacto en la Especificación y el Plan de Tareas.

**Version**: 1.1.0 | **Ratified**: 2026-03-11 | **Last Amended**: 2026-03-11 (Cloud Sync + Express Backend)
