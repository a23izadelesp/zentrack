# 🧘 ZenTrack

> **Una Progressive Web App per al bienestar mental. Offline-First, privada i amb assistent IA personalitzat.**

## 📋 Taula de Continguts

- [Descripció](#descripció)
- [Característiques Principals](#característiques-principals)
- [Arquitectura](#arquitectura)
- [Instal·lació](#installació)
- [Ús](#ús)
- [Documentació](#documentació)
- [Contribucions](#contribucions)

---

## 📝 Descripció

**ZenTrack** és una aplicació Progressive Web App construïda amb **Nuxt 3** que permet als usuaris fer seguiment del seu benestar mental mitjançant registres diaris d'ànimo. La característica definitòria és la seva capacitat de funcionar completament **offline**, emmagatzemant tots els datos localment mitjançant **IndexedDB** i **Dexie.js**.

### Casos d'ús principals:

1. **Registro diario de ánimo** sense necessitat de connexió a internet
2. **Xat amb assistent IA "Zen"** que analitza els teus registres i proporciona consells personalitzats
3. **Sincronització opcional a la nube** per a backup i accés multi-dispositiu
4. **Estadístiques i visualitzacions** del teu historial de benestar
5. **Recordatoris i notificacions** per mantenir l'hàbit diari

---

## ✨ Característiques Principals

### 🔴 Offline-First
- Funciona completament sense connexió a internet
- Tots els datos es guarden localment en **IndexedDB**
- Service Worker assegura que la app es carrega fins i tot sense xarxa
- Els registres es sincroniitzen automàticament quan la connexió es recupera

### 🤖 Assistent IA "Zen"
- Chatbot que analitza el context dels teus últims registres d'ànimo
- Proporciona consells de bienestar personalitzats
- Accés a OpenAI/Anthropic vía servidor serverless segur
- Historial de conversa persistit localment

### 🔒 Privacitat i Seguretat
- Els teus datos de benestar **no deixen el teu dispositiu** sense consentiment
- Autenticació JWT per a sincronització opcional amb la nube
- Contrasenya xifrada amb **bcrypt** al backend
- Compatible amb RGPD: control total de l'usuari sobre els seus datos

### 📊 Estadístiques i Visualitzacions
- Gràfics de tendències d'ànimo al llarg del temps
- Historial cronològic complet de tots els registres
- Filtres per data i nivell d'ànimo
- Exportació de datos en JSON

### 🌙 Disseny "Zen"
- Interfície minimalista i relaxant
- Paleta de colors suaus (pastels)
- Tipografia clara i llegible
- Accessible (ARIA) amb puntuació Lighthouse > 95/100

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend: Nuxt 3 (PWA)                                     │
│  ├─ Vue 3 + Composition API                                 │
│  ├─ IndexedDB (Dexie.js) - Datos locales                   │
│  ├─ Pinia - State Management                               │
│  ├─ Tailwind CSS - Diseño responsive                       │
│  └─ @vite-pwa/nuxt - Service Worker                        │
└─────────────────────────────────────────────────────────────┘
                            ↓↑
            HTTP (Modo online solament)
                            ↓↑
┌─────────────────────────────────────────────────────────────┐
│  Backend: Node.js + Express (Serverless/Cloud)              │
│  ├─ SQLite (better-sqlite3) - BD Persistència               │
│  ├─ JWT Authentication - Seguretat                          │
│  ├─ OpenAI API Integration - LLM                            │
│  └─ Rutas REST (/api/sync, /api/auth, /api/chat)          │
└─────────────────────────────────────────────────────────────┘
```

### Stack Tecnològic

**Frontend:**
- Nuxt 4 (Vue 3)
- TypeScript
- IndexedDB + Dexie.js
- Pinia + pinia-plugin-persistedstate
- Tailwind CSS
- Lucide Vue Icons
- Chart.js (gràfics)

**Backend:**
- Node.js + Express
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- Bcrypt (encriptació)
- CORS

**DevOps:**
- Docker + Docker Compose
- Service Worker (@vite-pwa/nuxt)

---

## 📦 Instal·lació

### Requisits Previs
- Node.js 18+
- npm/pnpm
- Docker & Docker Compose (opcional)

### Opció 1: Instal·lació Local

#### 1. Clonar el repositori
```bash
git clone https://github.com/a23izadelesp/zentrack.git
cd zentrack
```

#### 2. Instalar dependències Frontend
```bash
cd nuxt
npm install
```

#### 3. Instalar dependències Backend
```bash
cd ../backend
npm install
```

#### 4. Configurar variables d'entorn

**Backend** (`backend/.env`):
```env
PORT=4000
OPENAI_API_KEY=sk-your-key-here
JWT_SECRET=your-secret-key
NODE_ENV=development
```

#### 5. Executar en mode de desenvolupament

**Terminal 1 - Frontend:**
```bash
cd nuxt
npm run dev
```
La app estarà disponible en `http://localhost:3000`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
El servidor estarà disponible en `http://localhost:4000`

### Opció 2: Docker Compose (Recomanat)

```bash
docker-compose up
```

La app estarà disponible en `http://localhost:3000`  
El backend estarà disponible en `http://localhost:4000`

---

## 🚀 Ús

### 1. Registrar un Ànimo

1. Abre l'aplicació a `http://localhost:3000`
2. Selecciona un nivell d'ànimo (1-5) amb el selector visual
3. Escriu una nota opcional explicant com et sents
4. Feu clic en "Guardar"

**Nota:** Funciona completament offline. Els dades es guarden en IndexedDB del teu navegador.

### 2. Veure l'Historial

- Baixa a la secció "Historial de Ànimo"
- Veure tots els registres ordenats cronològicament
- Filtra per data o nivell d'ànimo
- Veure indicador de sincronització (sincronitzat/pendent)

### 3. Xatar amb Zen

1. Navega a la pestanya "Chat"
2. Escriu un missatge (ex: "¿Cómo me ves hoy?")
3. L'assistent analitzarà els teus últims registres i respondré amb consells personalitzats

**Nota:** Requereix connexió a internet i una clau API d'OpenAI configurada.

### 4. Sincronizar a la Nube

1. Navega a "Ajustes" > "Compte Remota"
2. Fes clic en "Crear Compte" i registra-t
3. Una vegada autentificat, pots fer clic en:
   - **"Subir a la Nube"**: Carrega els teus dades locals al servidor
   - **"Bajar de la Nube"**: Descarrega els dades del servidor als teus dades locals

### 5. Veure Estadístiques

- Navega a la pestanya "Estadístiques"
- Visualitza gràfics de tendència del teu ànimo
- Exporting de dades en JSON

---

## 📚 Documentació

La documentació completa del projecte es troba en la carpeta `.specify/memory/`:

- **`constitution.md`** - Principis arquitectònics i constraints tècnics
- **`spec.md`** - Especificació detallada de funcionalitats i casos de prova
- **`plan.md`** - Pla tècnic d'implementació
- **`data-model.md`** - Model de datos (IndexedDB + SQLite)
- **`status.md`** - Estat actual del projecte
- **`tasks/`** - Desglose de tasques per fase

### Metodologia: Spec-Driven Development (SDD)

ZenTrack segueix una metodologia de desenvolupament guiat per especificacions:

1. **Foundations** (Constitució) - Principis i constraints
2. **Specification** - Especificació funcional amb casos de prova
3. **Planning** - Pla tècnic i desglose de tasques

---

## 🤝 Contribucions

Les contribucions són benvingudes! Per a més informació, consulta les nostres directrius:

1. Fork el repositori
2. Crea una branca de feature (`git checkout -b feature/MiFeature`)
3. Fes commits descriptius
4. Push a la branca (`git push origin feature/MiFeature`)
5. Abre un Pull Request

---

## 📄 Llicència

MIT License - Veure `LICENSE` per a més detalls.

---

## 👨‍💻 Autor

**Izán de la Espada Fernández**  
GitHub: [@a23izadelesp](https://github.com/a23izadelesp)

---

## 🙏 Agraïments

- **Nuxt & Vue Community** per les eines increïbles
- **OpenAI/Anthropic** per la integració d'IA
- **Dexie.js** per la gestió senzilla de IndexedDB

---

## 📞 Contacte & Suport

Per a preguntes, errors o suggestions:
- 🐛 Abre un issue en GitHub
- 💬 Discussió en el repositori
- 📧 Contacta directament

---

**Made with ❤️ for mental wellness**
