# Tasks: ZenTrack Core (MVP)

**Input**: Design documents from `.specify/memory/`
**Prerequisites**: plan.md, spec.md, constitution.md

**Organization**: Las tareas están agrupadas por fases y por historias de usuario (US) para permitir una implementación modular y pruebas independientes.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialización del proyecto y estructura base.

- [x] T001 Inicializar proyecto Nuxt 3 en la raíz usando `npx nuxi@latest init .`
- [x] T002 [P] Instalar dependencias con UV: `uv pip install @vite-pwa/nuxt dexie pinia @pinia/nuxt pinia-plugin-persistedstate lucide-vue-next`
- [x] T003 [P] Configurar Tailwind CSS y paleta de colores "Zen" en `tailwind.config.js`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura core obligatoria antes de cualquier User Story.

- [x] T004 Configurar `nuxt.config.ts` con el módulo PWA y estrategias de cacheo offline.
- [x] T005 [P] Inicializar base de datos Dexie en `src/utils/db.ts` con tablas `moods` y `chat_history`.
- [x] T006 [P] Configurar Store de Pinia con persistencia para ajustes de usuario en `src/composables/useSettings.ts`.
- [x] T007 Crear Layout base minimalista en `src/layouts/default.vue` con soporte para fuentes "relajantes".

**Checkpoint**: Base lista. El desarrollo de historias de usuario puede comenzar.

---

## Phase 3: User Story 1 - Registro de Ánimo Offline (Priority: P1) 🎯 MVP

**Goal**: Permitir al usuario guardar su ánimo y ver su historial sin conexión.

**Independent Test**: En modo avión, guardar un ánimo y verificar que aparece en la lista tras recargar.

- [x] T008 [P] [US1] Definir interface y esquema `MoodEntry` en `src/utils/db.ts`.
- [x] T009 [US1] Crear composable `src/composables/useMoods.ts` para CRUD sobre IndexedDB.
- [x] T010 [US1] Desarrollar componente `src/components/MoodSelector.vue` (Emoji/Level selector).
- [x] T011 [US1] Desarrollar componente `src/components/MoodHistory.vue` (Lista cronológica).
- [x] T012 [US1] Integrar vista principal en `src/pages/index.vue`.

**Checkpoint**: MVP Funcional. La app ya sirve para registrar ánimos localmente.

---

## Phase 4: User Story 2 - Asistente "Zen" (Priority: P2)

**Goal**: Chatbot con contexto local de los últimos ánimos.

**Independent Test**: Consultar al bot y verificar que su respuesta menciona los ánimos guardados previamente.

- [x] T013 [P] [US2] Crear endpoint serverless en `server/api/chat.post.ts` con integración de LLM.
- [x] T014 [US2] Implementar lógica de recuperación de contexto (últimos 5 registros) en el endpoint.
- [x] T015 [US2] Desarrollar componente de interfaz de chat `src/components/ZenChat.vue`.
- [x] T016 [US2] Añadir manejo de estados "Offline" en el chat (deshabilitar envío si no hay red).

---

## Phase 5: User Story 3 - Sincronización Automática (Priority: P3)

**Goal**: Subir datos locales a la nube al recuperar conexión.

**Independent Test**: Crear registros offline, activar red y verificar que el flag `synced` cambia a true.

- [x] T017 [P] [US3] Crear composable `src/composables/useOnlineStatus.ts`.
- [x] T018 [US3] Implementar watcher de red que dispare la sincronización de registros con `synced: false`.
- [x] T019 [US3] Añadir indicadores visuales de "Sincronizado/Pendiente" en la UI.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Mejoras finales y validación.

- [x] T020 [P] Optimización de Service Worker para carga ultra-rápida.
- [x] T021 Revisión de accesibilidad (ARIA) en el selector de ánimos.
- [x] T022 [P] Generar iconos de PWA y splash screens.
- [x] T023 Ejecutar auditoría Lighthouse (Target PWA > 90).

---

## Dependencies & Execution Order

1. **Setup (Ph 1)**: Iniciar inmediatamente.
2. **Foundational (Ph 2)**: Bloquea el desarrollo de componentes (Ph 3).
3. **User Stories**:
   - US1 (Ph 3) es la prioridad máxima para tener un producto mínimamente viable.
   - US2 y US3 pueden desarrollarse en paralelo tras terminar la base de datos.

## Notes

- Cada tarea de implementación debe seguir el **Zen Design System** definido en la Constitución.
- Realizar `commit` por cada tarea finalizada (T001, T002, etc.) para trazabilidad.
