# 📋 DOCUMENTACIÓ COMPLETA - ZenTrack

**Versió:** 1.0  
**Data:** 28 d'Abril de 2026  
**Projecte:** ZenTrack - PWA de Benestar Mental

---

## 📑 Índex

1. [Explicació de Funcionalitats](#1-explicació-de-funcionalitats)
2. [Procés de Desenvolupament Spec-Driven](#2-procés-de-desenvolupament-spec-driven)
3. [Arquitectura Tècnica](#3-arquitectura-tècnica)
4. [Guia de Configuració](#4-guia-de-configuració)
5. [Casos d'Ús i Fluxos](#5-casos-dús-i-fluxos)

---

## 1. Explicació de Funcionalitats

### 🎯 Descripció General

ZenTrack és una Progressive Web App construïda amb Nuxt 3 que permet als usuaris fer seguiment continu del seu benestar mental. La seva principals característiques són:

- **Offline-First**: Funciona completament sense internet
- **Privacitat**: Els dades es guarden localment en IndexedDB
- **IA Personalitzada**: Assistent chatbot que analitza els teus registres
- **Sincronització Opcional**: Backup a la nube amb control de l'usuari

### 🔴 Registre de Ànimo (Feature Principal)

**Descripció:**  
Permet als usuaris registrar com se senten cada dia amb un sistema simple:
- Selector visual de 5 nivells (1=Molt Negatiu → 5=Molt Positiu)
- Nota opcional per a context addicional
- Timestamp automàtic

**Funcionalitats:**
- Emmagatzematge offline complet en IndexedDB
- Indicador visual de sincronització
- Historial cronològic complet
- Filtres per data i nivell

**Casos de prova:**
1. Crear un registre sense connexió → Apareix amb flag "Pendent"
2. Recarregar la pàgina sense net → El registre persiteix
3. Recuperar connexió → El flag canvia automàticament a "Sincronitzat"

### 🤖 Assistent IA "Zen"

**Descripció:**  
Chatbot intel·ligent que analitza els teus últims registres d'ànimo i proporciona consells de benestar personalitzats.

**Funcionament:**
1. L'usuari fa una pregunta al chat (ex: "¿Cómo me ves?")
2. El sistema recupera els últims 5 registres de la BD local
3. S'envia la pregunta + contexte al servidor backend
4. El backend crida a OpenAI API amb el context injectat
5. La resposta es mostra al chat i es guarda localment

**Funcionalitats:**
- Context automàtic dels últims registres
- Historial de conversa persistit
- Fallback elegante si no hi ha connexió
- Suport per a múltiples consultes seguides

**Casos de prova:**
1. Amb registres "Baix ànimo" → El bot recomana activitats relaxants
2. Sense connexió → Mostra missatge "No es pot conectar ara"
3. Múltiples missatges → Manté context de conversa anterior

### 📊 Estadístiques i Visualitzacions

**Descripció:**  
Dashboard amb gràfics que mostren les tendències del teu benestar mental.

**Gràfics:**
- Línea temporal d'ànimos (últims 30 dies)
- Distribució de nivells (gràfic de sectors)
- Estadístiques: Mitja, Máxim, Mínim per setmana

**Funcionalitats:**
- Exportació de dades en JSON
- Filtres per rang de dates
- Compatibilitat offline (accés a dades già guardades)

### ⚙️ Configuració i Ajustes

**Apartats:**
1. **Perfil de l'usuari** - Nom, email, foto de perfil
2. **Compte Remota** - Registre/Login per sincronització amb la nube
3. **Preferències** - Tema (clar/fosc), idioma, format d'hora
4. **Privacitat** - Control de dades, exportació, eliminació

### 🔄 Sincronització a la Nube (Cloud Sync)

**Descripció:**  
Permet als usuaris sincronitzar els seus dades amb un servidor segur per a backup i accés multi-dispositiu.

**Funcionament:**
1. Usuari es registra/loga en la secció "Compte Remota"
2. Sistema emet token JWT per a la sessió
3. Usuari pot fer clic en "Subir a la Nube" o "Bajar de la Nube"
4. Els dades es sincroniitzen amb SQLite del servidor backend

**Seguretat:**
- Contrasenya xifrada amb bcrypt
- JWT per a autenticació
- CORS per a protegir la API
- Els dades dell servidor es sincronitzen solo amb consentiment explicit

---

## 2. Procés de Desenvolupament Spec-Driven

### 📐 Metodologia

ZenTrack segueix una metodologia **Spec-Driven Development (SDD)** en tres fases:

#### **Fase 1: Foundations (Constitució)**

**Objectiu:** Definir els principis arquitectònics i constraints del projecte.

**Contingut:**
- Principis Core (Offline-First, Serverless, Privacy)
- Restriccions tècniques (Stack obligatori)
- Constraints de disseny (Zen Design System)

**Document:** `.specify/memory/constitution.md`

**Principis Clau:**
1. **Offline-First** → IndexedDB obligatori, no LocalStorage
2. **Serverless** → Backend sense estado, escalable
3. **Privacy** → Contexto local injectat, sense BD vectorials externes
4. **Zen Design** → Minimalista, relaxant, accessible

#### **Fase 2: Specification (Especificació)**

**Objectiu:** Definir les funcionalitats, comportament esperatt i casos de prova.

**Contingut:**
- User Stories amb contexto
- Acceptance Criteria per a cada feature
- Test scenarios independents i reproducibles
- Requirements funcionals i no-funcionals
- Entities i Data Model

**Document:** `.specify/memory/spec.md`

**Estructura per User Story:**
```
User Story X - [Nom Feature]
├─ Descripció
├─ Per què aquesta prioritat
├─ Test independent (com provar)
├─ Acceptance Scenarios (Given-When-Then)
└─ Edge Cases
```

**Exemples de Features especificades:**
- US1: Registre de Ànimo Offline (Priority P1)
- US2: Assistent Zen amb Contexto Local (Priority P2)
- US3: Sincronització Automàtica (Priority P3)
- US7: Cloud Sync & Extended Settings (Priority P2)

#### **Fase 3: Planning (Planificació)**

**Objectiu:** Desglose tècnic en tasques executables, arquitectura i decisions de tecnologia.

**Contingut:**
- Resum del projecte i contexte tècnic
- Estructura de carpetes i fitxers
- Phases de desenvolupament (Setup, Foundational, User Stories, Polish)
- Tasques específiques per fase amb dependencies
- Validacions post-implementació

**Document:** `.specify/memory/plan.md`

**Estructura de Phases:**
```
Phase 1: Setup → Inicialització projecte
Phase 2: Foundational → Infraestructura base (Dexie, Pinia, PWA)
Phase 3-6: User Stories → Implementació de features
Phase 12-13: Cloud Backend → Express + SQLite + JWT
```

### 📊 Estructura de la Carpeta `.specify/`

```
.specify/
├── memory/
│   ├── constitution.md           # Foundations
│   ├── spec.md                   # Specification
│   ├── plan.md                   # Planning
│   ├── status.md                 # Estado actual
│   ├── data-model.md             # Data Model (IndexedDB + SQLite)
│   ├── design.md                 # Decisions de disseny
│   └── tasks/                    # Desglose de tasques
│       ├── 001-zentrack-core.md
│       ├── 002-analytics-visualization.md
│       ├── 003-privacy-security.md
│       ├── 004-native-experience.md
│       └── 005-cloud-sync.md
└── templates/
    ├── spec-template.md
    ├── plan-template.md
    ├── constitution-template.md
    └── tasks-template.md
```

### ✅ Validacions post-Especificació

**Gates obligatoris:**
1. ✅ Validació contra la Constitució
2. ✅ Test Offline mode en DevTools
3. ✅ TypeScript strict en BD
4. ✅ Accesibilitat ARIA
5. ✅ Lighthouse PWA > 90/100

---

## 3. Arquitectura Tècnica

### 🏗️ Diagrama General

```
┌─────────────────────────────────────┐
│   Frontend: Nuxt 3 (PWA)           │
│   ├─ Vue 3 + Composition API       │
│   ├─ IndexedDB (Dexie.js)          │
│   ├─ Pinia State Management        │
│   ├─ Tailwind CSS                  │
│   └─ Service Worker (@vite-pwa)    │
└──────────────┬──────────────────────┘
               │ HTTP (Online only)
               ▼
┌─────────────────────────────────────┐
│   Backend: Node + Express           │
│   ├─ SQLite (better-sqlite3)       │
│   ├─ JWT Authentication            │
│   ├─ OpenAI API Integration        │
│   └─ REST Routes                   │
└─────────────────────────────────────┘
```

### 📦 Stack Detallat

#### Frontend (Nuxt)
```
nuxt/
├── app.vue                    # Root component
├── nuxt.config.ts            # Configuració Nuxt + PWA
├── tailwind.config.ts        # Configuració Tailwind
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
├── server/
│   └── api/
│       └── chat.post.ts      # Endpoint serverless chatbot
├── src/
│   ├── app.vue              # App root
│   ├── assets/css/
│   │   └── main.css         # Tailwind imports
│   ├── components/          # Vue components reutilitzables
│   │   ├── MoodSelector.vue    # Selector visual d'ànimo
│   │   ├── MoodHistory.vue     # Historial de registres
│   │   ├── MoodTrendChart.vue  # Gràfics de tendència
│   │   ├── ZenChat.vue         # Interface chatbot
│   │   └── SettingsData.vue    # Configuració
│   ├── composables/         # Composition API utilities
│   │   ├── useMoods.ts         # CRUD ànimos (IndexedDB)
│   │   ├── useChat.ts          # Lógica chat
│   │   ├── useAnalytics.ts     # Estadístiques
│   │   ├── useAuth.ts          # Autenticació
│   │   ├── useCloudSync.ts     # Sincronització nube
│   │   ├── useOnlineStatus.ts  # Detect online/offline
│   │   └── useSettings.ts      # Preferències usuari
│   ├── layouts/             # Layouts per a pàgines
│   │   └── default.vue
│   ├── pages/              # Rutes automàtiques Nuxt
│   │   ├── index.vue       # Pàgina principal (Ànimo)
│   │   ├── chat.vue        # Chat page
│   │   ├── stats.vue       # Estadístiques
│   │   └── settings.vue    # Configuració
│   ├── public/             # Assets estàtics
│   └── utils/
│       ├── db.ts           # Inicialització Dexie + schemas
│       └── export.ts       # Utilitats d'exportació
└── public/
    └── robots.txt
```

#### Backend (Node/Express)
```
backend/
├── server.js               # Punt d'entrada Express
├── package.json            # Dependencies
├── .env                    # Variables d'entorn
├── db.js                   # Inicialització SQLite
├── middleware/
│   └── auth.js             # Middleware JWT
├── routes/
│   ├── auth.js             # POST /register, /login
│   └── sync.js             # POST /push, GET /pull
└── test.js                 # Script de prova d'integració
```

### 📊 Data Model

#### IndexedDB (Frontend - Dexie.js)

```javascript
// Taula: moods
{
  id: string (uuid),           // Primary Key
  level: number (1-5),         // Nivell d'ànimo
  note: string,                // Nota opcional
  timestamp: number,           // Data en ms
  synced: boolean              // Status sincronització
}

// Taula: chat_history
{
  id: string (uuid),
  role: 'user' | 'assistant',
  content: string,
  timestamp: number
}
```

#### SQLite (Backend - BD Persistent)

```sql
-- Taula: users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,  -- Bcrypt hash
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Taula: sync_data
CREATE TABLE sync_data (
  user_id INTEGER PRIMARY KEY,
  moods TEXT NOT NULL,      -- JSON string
  chat TEXT,                -- JSON string
  last_sync DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 🔐 Seguretat

**Frontend:**
- JWT stockat en `localStorage` (sessió activa)
- CORS activat per prevenir attaques cross-origin

**Backend:**
- Contrasenya xifrada amb bcrypt (10 rounds)
- JWT per autenticació de peticions
- Middleware de validació en totes les rutes protegides
- Limit de taxa per prevenir brute-force

### 🌐 Endpoints API

```
POST   /api/auth/register       # Crear compte (email, password)
POST   /api/auth/login          # Login (email, password) → JWT
POST   /api/sync/push           # Subir dades (requires JWT)
GET    /api/sync/pull           # Descarregar dades (requires JWT)
GET    /api/health              # Health check
```

---

## 4. Guia de Configuració

### Requisits

- Node.js 18+
- npm o pnpm
- Docker & Docker Compose (opcional)

### Setup Local

#### 1. Clonar i Instalar

```bash
git clone https://github.com/a23izadelesp/zentrack.git
cd zentrack
cd nuxt && npm install && cd ../backend && npm install
```

#### 2. Variables d'Entorn

**Backend** (`backend/.env`):
```env
PORT=4000
OPENAI_API_KEY=sk-xxxx              # De https://platform.openai.com/api-keys
JWT_SECRET=your-super-secret-key    # Generar aleatori
NODE_ENV=development
```

#### 3. Executar

**Frontend (Terminal 1):**
```bash
cd nuxt && npm run dev
# http://localhost:3000
```

**Backend (Terminal 2):**
```bash
cd backend && npm run dev
# http://localhost:4000
```

### Setup Docker (Recomanat)

```bash
docker-compose up
```

Automàticament:
- Frontend accessible en `http://localhost:3000`
- Backend accessible en `http://localhost:4000`

---

## 5. Casos d'Ús i Fluxos

### ✅ Cas d'Ús 1: Usuari Registra Ànimo (Offline)

**Scenario:**
1. Usuari abre l'app en mode avió
2. Toca en "Sel·lecciona com et sents"
3. Selecciona "4 - Bé"
4. Escriu nota: "Dia productiu al treball"
5. Toca "Guardar"

**Resultat:**
- ✅ Registre crear en IndexedDB
- ✅ Flag `synced: false`
- ✅ Apareix a l'historial amb etiqueta "Pendent"
- ✅ Es mostra indicador offline

### ✅ Cas d'Ús 2: Chat amb Context

**Scenario:**
1. Usuari ha enregistrat 3 ànimos: "3", "2", "4" (darrer)
2. Abre el chat
3. Escriu: "Consella'm, com em veus?"
4. Backend rep la pregunta + context (últims 5 registres)
5. OpenAI processa i respon

**Resultat:**
- ✅ Chatbot analitza la tendència (2→4 mejora)
- ✅ Recomana continuar amb hàbits positius
- ✅ Resposta es mostra i guarda localment

### ✅ Cas d'Ús 3: Sincronització

**Scenario:**
1. 5 registres offline creats (synced: false)
2. Usuari reacciona internet
3. Navegador detecta `window.online`
4. Petició POST a `/api/sync/push`

**Resultat:**
- ✅ 5 registres carregats al servidor
- ✅ Flags canvien a `synced: true`
- ✅ UI mostra "Tot sincronitzat"

### ✅ Cas d'Ús 4: Cloud Backup

**Scenario:**
1. Usuari navega a "Ajustes" → "Compte"
2. Feu clic "Crear Compte"
3. Registra-se: email@example.com / password123
4. Retorna i feu clic "Subir a la Nube"
5. Confirma el diàleg

**Resultat:**
- ✅ Usuari creat en SQLite del servidor
- ✅ Token JWT generat
- ✅ Tots els dades locals carregats
- ✅ `last_sync` actualitzat al servidor

---

## 📝 Resum

ZenTrack és una aplicació moderna de benestar mental que combina:

✅ **Offline-First** - Funciona sense internet  
✅ **Privacitat** - Datos locals per defecte  
✅ **IA Personalitzada** - Chatbot amb context  
✅ **Spec-Driven** - Metodologia rigorosa  
✅ **Accessible** - PWA responsive + Lighthouse 95+  
✅ **Escalable** - Docker + Serverless ready  

**Status de desenvolvimento:** MVP Completat + Cloud Sync actiu ✅

---

*Documentació generada: 28 d'Abril de 2026*
