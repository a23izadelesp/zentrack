# Feature Specification: ZenTrack Core (MVP)

**Feature Branch**: `001-zentrack-core-offline`  
**Created**: 2026-03-11  
**Status**: Completed  
**Input**: User description: "PWA de bienestar con Nuxt 3, IndexedDB para modo offline y asistente de IA serverless."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Registro de Ánimo Offline (Priority: P1)

Como usuario, quiero registrar cómo me siento y escribir una nota breve aunque no tenga conexión a internet (modo avión), para no perder el hábito de seguimiento diario.

**Why this priority**: Es la funcionalidad base. Sin la capacidad de capturar datos de forma fiable y local, la app pierde su valor como herramienta "offline-first".

**Independent Test**: Activar el "Offline Mode" en las DevTools del navegador. Abrir la app, seleccionar un nivel de ánimo, escribir una nota y guardar. El registro debe aparecer en la lista de historial local sin errores de red.

**Acceptance Scenarios**:

1. **Given** que el navegador no tiene conexión, **When** el usuario pulsa "Guardar", **Then** el dato se almacena en IndexedDB y la UI muestra un indicador de "Pendiente de sincronizar".
2. **Given** un registro guardado sin red, **When** el usuario refresca la página (aún sin red), **Then** el registro persiste y es visible en el historial gracias al Service Worker.

---

### User Story 2 - Asistente "Zen" con Contexto Local (Priority: P2)

Como usuario, quiero hablar con un chatbot que analice mis últimos registros para recibir consejos de bienestar personalizados.

**Why this priority**: Cumple el requisito obligatorio de integración de IA y aporta el valor diferencial del proyecto.

**Independent Test**: Simular 3 entradas de ánimo "Bajo" en el historial local. Abrir el chat y preguntar "¿Cómo me ves hoy?". El chatbot debe responder mencionando la tendencia negativa de los últimos registros.

**Acceptance Scenarios**:

1. **Given** que existen registros en IndexedDB, **When** el usuario envía un mensaje al chat, **Then** la app recupera los últimos 5 registros y los envía como contexto a la función serverless.
2. **Given** que la función serverless responde correctamente, **When** la respuesta llega al cliente, **Then** se muestra en la burbuja de chat y se guarda localmente el historial de la conversación.

---

### User Story 3 - Sincronización Automática (Priority: P3)

Como usuario, quiero que mis datos locales se suban a la nube automáticamente cuando mi dispositivo vuelva a tener conexión.

**Why this priority**: Garantiza la integridad de los datos a largo plazo y permite que el backend serverless procese la información.

**Independent Test**: Crear un registro en modo offline. Reactivar la conexión a internet. Verificar que el estado del registro cambia automáticamente a "Sincronizado".

**Acceptance Scenarios**:

1. **Given** registros locales marcados como `synced: false`, **When** el evento `window.online` se dispara, **Then** se ejecuta una petición POST a la función serverless para persistir los datos.

---

### User Story 7 - Cloud Sync Exploratorio (Priority: P2)

Como usuario, quiero poder crear una cuenta y sincronizar mi diario con un servidor remoto de forma explícita, decidiendo yo cuándo suben y bajan los datos, para poder tener un backup o acceder desde otro dispositivo sin perder mi filosofía offline-first.

**Why this priority**: Solicitud explícita para extender el MVP original con un backend persistente real, autenticación, y control manual de la sincronización.

**Independent Test**: Registrarse en la pestaña de Ajustes ("Nube"). Crear un ánimo offline. Hacer clic en "Subir a la Nube", aceptar el aviso de consentimiento y comprobar que los datos se almacenan en la base de datos SQLite del servidor Node.

**Acceptance Scenarios**:

1. **Given** que un usuario está autenticado, **When** solicita "Bajar de la Nube", **Then** aparece un cuadro de diálogo advirtiendo que los datos locales se combinarán. Si acepta, se descargan los datos del servidor Node.
2. **Given** que un usuario está autenticado, **When** solicita "Subir a la Nube", **Then** aparece un cuadro de diálogo advirtiendo que su copia local reemplazará/actualizará la copia remota protegida. Si acepta, se hace un POST al servidor Node.

---

### Edge Cases

- **Almacenamiento de IndexedDB lleno**: El sistema debe capturar el error de cuota y notificar al usuario que debe liberar espacio o sincronizar datos antiguos.
- **Fallo de la API de IA (Timeout)**: Si la función serverless tarda demasiado o falla, el chatbot debe ofrecer una respuesta de fallback: "Lo siento, mi conexión con la nube es débil ahora, pero aquí tienes un consejo general...".

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema DEBE usar **Dexie.js** para todas las operaciones de lectura/escritura en IndexedDB.
- **FR-002**: El sistema DEBE usar el módulo **@vite-pwa/nuxt** para gestionar el ciclo de vida del Service Worker.
- **FR-003**: El chatbot DEBE procesar las peticiones mediante una **Server Route** de Nuxt Nitro (`/server/api/chat.post.ts`).
- **FR-004**: La interfaz DEBE ser totalmente responsiva y usar una paleta de colores basada en **Tailwind CSS** (tonos pasteles/relajantes).
- FR-005: El sistema DEBE monitorizar el estado `navigator.onLine` para activar/desactivar funciones que dependan de la nube.
- FR-006: El frontend y el backend DEBEN estar contenedorizados usando Docker y orquestados via `docker-compose.yml`.

### Key Entities

- **MoodEntry**: Representa un registro de ánimo. Atributos: `id` (auto), `level` (1-5), `note` (string), `timestamp` (date), `synced` (boolean).
- **ChatMessage**: Representa un mensaje del chat. Atributos: `id`, `role` (user/assistant), `text`, `timestamp`.
- **CloudUser (Backend)**: Atributos: `id`, `email`, `password_hash`.
- **CloudSyncData (Backend)**: Carga útil sincronizada. Atributos: `userId`, `moods_json`, `chat_json`, `last_sync`.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: La app debe ser interactiva en menos de 2 segundos en condiciones offline (una vez instalada).
- **SC-002**: El 100% de los registros creados offline deben marcarse correctamente para su sincronización posterior.
- **SC-003**: Puntuación de Accesibilidad en Lighthouse de al menos 95/100.
