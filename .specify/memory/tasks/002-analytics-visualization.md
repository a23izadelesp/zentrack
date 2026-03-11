# Tasks: ZenTrack Analysis & Visualization

**Input**: Design documents from `.specify/memory/`
**Prerequisites**: plan.md, spec.md, constitution.md, 001-zentrack-core.md

**Organization**: Tareas enfocadas en transformar los datos crudos de IndexedDB en información visual y analítica para el usuario.

## Phase 7: User Story 4 - Visualización de Tendencias (Priority: P2)

**Goal**: Mostrar al usuario la evolución de su estado de ánimo mediante gráficos interactivos.

**Independent Test**: Acceder a la sección de estadísticas y ver un gráfico de líneas con los datos registrados en la última semana.

- [x] T024 [P] [US4] Instalar librería de visualización: `uv pip install chart.js vue-chartjs`
- [x] T025 [US4] Crear composable `src/composables/useAnalytics.ts` para extraer y promediar datos de Dexie
- [x] T026 [US4] Desarrollar componente de gráfico de líneas `src/components/MoodTrendChart.vue`
- [x] T027 [US4] Crear página de estadísticas `src/pages/stats.vue`
- [x] T028 [US4] Implementar filtros de tiempo (semanal, mensual) en la vista de analítica

**Checkpoint**: El usuario ya puede ver patrones visuales de su bienestar emocional.

---

## Phase 8: Insights & Patterns

- [x] T029 [US2] Ampliar la lógica del chatbot para que pueda generar un "Resumen Semanal" basado en los datos de la Phase 7
