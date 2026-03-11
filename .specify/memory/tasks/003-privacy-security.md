# Tasks: ZenTrack Privacy & Portability

**Input**: Design documents from `.specify/memory/`
**Prerequisites**: plan.md, spec.md, constitution.md

**Organization**: Tareas para reforzar la seguridad de los datos sensibles y permitir la soberanía del dato.

## Phase 9: User Story 5 - Privacidad y Control de Datos (Priority: P2)

**Goal**: Asegurar que el usuario tenga control total sobre su información y su acceso.

**Independent Test**: Ejecutar una exportación de datos y verificar que el archivo JSON contiene todos los registros locales.

- [x] T030 [P] [US5] Implementar sistema de exportación a JSON/CSV en `src/utils/export.ts`
- [x] T031 [US5] Crear herramienta de borrado total ("Nuclear Option") en `src/components/SettingsData.vue`
- [x] T032 [US5] Implementar bloqueo por biometría/PIN usando la `WebAuthn API` en `src/composables/useAuth.ts`
- [x] T033 [P] [US5] Añadir lógica de cifrado (Web Crypto API) para el campo `note` antes de guardar en IndexedDB

**Checkpoint**: La aplicación cumple con estándares de privacidad de alto nivel.
