# ZenTrack - Estado del Proyecto

**Fecha**: 2026-03-11  
**Versión**: 1.1.0 (Cloud Sync)  
**Estado Global**: ✅ MVP Completo + Cloud Sync desplegado

---

## Resumen Ejecutivo

ZenTrack es una PWA Offline-First de bienestar emocional construida con Nuxt 4, Dexie.js e IndexedDB. Incluye un asistente de IA ("Zen"), analíticas visuales, cifrado local, y sincronización explícita con un backend Node/Express propio.

## Fases Completadas

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1-2 | Setup + Foundational (Nuxt, Tailwind, Dexie, PWA) | ✅ |
| 3-4 | Mood Tracking MVP + AI Chat Integration | ✅ |
| 5-6 | Auto-Sync Hooks + Initial Polish | ✅ |
| 7-8 | Analytics & Visualization (chart.js) + Insights | ✅ |
| 9 | Privacy & Portability (Cifrado AES-GCM, Export, WebAuthn) | ✅ |
| 10 | Native Experience (PWA Shortcuts, Reminders, Theme) | ✅ |
| 11 | Polish & Performance (Skeleton Loaders, Audit Fix) | ✅ |
| 12 | **Node Express Backend** (SQLite, JWT Auth, Bcrypt) | ✅ |
| 13 | **Frontend Cloud Integration** (Login, Push/Pull explícito) | ✅ |

## Arquitectura Actual

```text
┌─────────────────────────────────────────┐
│              FRONTEND (Nuxt 4)          │
│  Puerto local: 3000                     │
│  Deploy: Static (npm run generate)      │
│  Hosting: zentrack.daw.inspedralbes.cat │
│                                         │
│  IndexedDB (Dexie) ← Datos del usuario  │
│  Pinia ← Configuración persistente      │
│  Service Worker ← Cache offline         │
└────────────────┬────────────────────────┘
                 │ HTTP (fetch)
                 ▼
┌─────────────────────────────────────────┐
│           BACKEND (Node/Express)        │
│  Puerto: 22897                          │
│  Hosting: mismo VPS (screen)            │
│                                         │
│  SQLite ← users, sync_data             │
│  JWT ← Autenticación                   │
│  Bcrypt ← Hash de contraseñas          │
│                                         │
│  POST /api/auth/register                │
│  POST /api/auth/login                   │
│  POST /api/sync/push (protegido JWT)    │
│  GET  /api/sync/pull (protegido JWT)    │
└─────────────────────────────────────────┘
```

## Próximos Pasos Sugeridos

- [ ] Configurar HTTPS en el backend (certificado SSL)
- [ ] Añadir validación de email en el registro
- [ ] Implementar "Olvidé mi contraseña"
- [ ] Migrar de SQLite a PostgreSQL para escalar
- [ ] Añadir tests E2E con Playwright
- [ ] Publicar en una tienda de apps (TWA para Google Play)
