# Implementation Checklist: ZenTrack Core (MVP)

**Purpose**: Verificación de los requisitos obligatorios de PWA, Offline-First y Chatbot Serverless.
**Created**: 2026-03-11
**Feature**: [.specify/memory/spec.md](.specify/memory/spec.md)

**Note**: Este checklist debe completarse antes de realizar el merge de la rama `001-zentrack-core-offline`.

## Core Infrastructure & PWA

- [x] **CHK001**: Configurar `@vite-pwa/nuxt` en `nuxt.config.ts` con `registerType: 'autoUpdate'`.
- [x] **CHK002**: Verificar que el manifiesto (`manifest.webmanifest`) incluya iconos y colores del "Zen Design System".
- [x] **CHK003**: Comprobar que el Service Worker cachea correctamente los assets estáticos para carga sin red.

## Offline Data Layer (Dexie.js)

- [x] **CHK004**: Inicializar la base de datos en `utils/db.ts` con las tablas `moods` y `chat_history`.
- [x] **CHK005**: Implementar el guardado de ánimos asegurando que el campo `synced` se inicie en `false`.
- [x] **CHK006**: Validar que los datos persisten en IndexedDB tras cerrar y volver a abrir el navegador en Zorin OS.

## UI & User Experience

- [x] **CHK007**: Implementar el selector de ánimos (1-5) usando Tailwind CSS con feedback visual inmediato.
- [x] **CHK008**: Añadir un indicador de estado de conexión (Online/Offline) visible en el layout principal.
- [x] **CHK009**: Asegurar que todos los componentes interactivos tienen etiquetas ARIA para accesibilidad.

## AI Assistant (Serverless)

- [x] **CHK010**: Crear la ruta `/server/api/chat.post.ts` en Nuxt Nitro para procesar mensajes.
- [x] **CHK011**: Implementar la lógica de "Context Injection": enviar los últimos registros de IndexedDB al LLM.
- [x] **CHK012**: Validar que el chatbot maneja errores de red con un mensaje de fallback amigable.

## Final Validation

- [x] **CHK013**: Realizar una prueba de flujo completo (Registro -> Chat -> Sync) totalmente en modo avión.
- [x] **CHK014**: Verificar que no hay claves de API expuestas en el código del frontend (inspeccionando el build).
- [x] **CHK015**: Pasar el auditor de Lighthouse y confirmar puntuación PWA > 90.

## Notes

- Los ítems marcados con `[x]` deben haber sido probados en el entorno local de Zorin.
- Para el **CHK011**, el prompt del sistema debe ser breve para no consumir excesivos tokens en cada consulta del chat.
- Referencia técnica para sincronización: Usar el hook de Nuxt `window:online`.
