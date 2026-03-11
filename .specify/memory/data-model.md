# Data Model: ZenTrack

## IndexedDB (Dexie.js)

### Table: `moods`

- `id`: string (uuid) - Primary Key
- `level`: number (1-5) - Nivel de ánimo
- `note`: string - Nota opcional
- `timestamp`: number - Fecha en milisegundos
- `synced`: boolean - Estado de sincronización serverless

### Table: `chat_history`

- `id`: string (uuid)
- `role`: 'user' | 'assistant'
- `content`: string
- `timestamp`: number

## Serverless Context (AI Prompt)

Para el chatbot, el modelo debe enviar un JSON con los últimos 5 registros de la tabla `moods` para dar contexto al LLM.

## Cloud Backend (SQLite via Node/Express)

### Table: `users`
- `id`: integer (Primary Key, AutoIncrement)
- `email`: string (Unique)
- `password`: string (Bcrypt hash)
- `created_at`: datetime

### Table: `sync_data`
- `user_id`: integer (Foreign Key -> users.id, Primary Key)
- `moods`: text (JSON stringificado en bruto de la bóveda local)
- `chat`: text (JSON stringificado en bruto del historial)
- `last_sync`: datetime
