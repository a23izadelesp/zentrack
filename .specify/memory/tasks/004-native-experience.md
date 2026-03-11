# Tasks: ZenTrack Native Experience & Polish

**Input**: Design documents from `.specify/memory/`
**Prerequisites**: plan.md, spec.md, constitution.md, 001-zentrack-core.md

**Organization**: Tareas para mejorar la integración con el sistema operativo (Zorin OS) y la experiencia de usuario final.

## Phase 10: User Story 6 - Integración Nativa (Priority: P3)

**Goal**: Hacer que la PWA se sienta como una aplicación nativa del sistema.

**Independent Test**: Abrir la app mediante un "Shortcut" desde el escritorio y recibir una notificación de recordatorio.

- [x] T034 [P] [US6] Configurar "PWA Shortcuts" en `nuxt.config.ts` para registro rápido de ánimo
- [x] T035 [US6] Implementar recordatorios locales mediante la `Notification API`
- [x] T036 [US6] Configurar `Theme Color` dinámico para adaptarse al modo oscuro de Zorin OS automáticamente
- [x] T037 [P] [US6] Optimizar el `Manifest` para soporte de visualización "Standalone" sin elementos de navegador

---

## Phase 11: Polish & Performance

- [x] T038 [P] Implementar "Skeleton Loaders" para los estados de carga del chat y gráficos
- [x] T039 Reducir el tamaño del bundle eliminando código muerto (Tree shaking)
- [x] T040 Validar que la app mantiene un 100% de funcionalidad básica tras 24h sin conexión
