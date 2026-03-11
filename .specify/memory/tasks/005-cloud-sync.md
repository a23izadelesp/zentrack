# Tasks: Cloud Sync & Extended Settings

**Branch**: `005-cloud-sync` | **Epic**: Cloud Backend
**Input**: Archivos actualizados en `.specify/memory/`

---

## Phase 12: Node Express Backend
- [x] T041 [P] [US7] Inicializar servidor Node/Express en carpeta `backend/` separada (`npm init`, cors, express, json)
- [x] T042 [US7] Configurar BD SQLite (`better-sqlite3`) y crear tablas `users` y `sync_data`
- [x] T043 [P] [US7] Crear rutas de autenticación (`/api/auth/register` y `/api/auth/login`) usando `bcrypt` y `jsonwebtoken`
- [x] T044 [US7] Crear middleware de validación JWT para proteger rutas de sincronización
- [x] T045 [US7] Implementar endpoints de sincronización (`POST /api/sync/push` y `GET /api/sync/pull`)

## Phase 13: Frontend Cloud Integration
- [x] T046 [P] [US7] Ampliar `SettingsData.vue` para incluir sección "Cuenta Remota" (Formulario Login/Registro)
- [x] T047 [US7] Crear botones "Subir a la nube" y "Bajar de la nube" con modales/prompts de confirmación explícita
- [x] T048 [P] [US7] Crear composable `useCloudSync.ts` para gestionar comunicación HTTP con `localhost:4000` y almacenar JWT
- [x] T049 [US7] Conectar la acción de "Bajar de la nube" para que vuelque los datos JSON del servidor directamente al IndexedDB local usando `useMoods`
- [x] T050 [US7] Añadir opciones de configuración extendidas en `SettingsData.vue` (Tema claro/oscuro explícito, formato de hora, etc.)

---
_Nota: Tras completar la Phase 13, requeriremos validación final probando registros locales y sincronizándolos._
