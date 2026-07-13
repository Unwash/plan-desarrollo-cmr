# Entradas — Funcionalidad, CRUD y Bot de Issues

Aplicación web para la gestión de tareas llamadas "Entradas". Cada `Entrada` representa un requerimiento o tarea a realizar por el equipo. El repositorio contiene la API, modelos y rutas necesarias para crear, consultar, actualizar y eliminar Entradas, además del módulo que automatiza el análisis de Issues en GitHub.

## Funcionalidad principal

- Gestión completa de Entradas: creación, consulta, actualización, eliminación y listado.
- Control de estados de cada Entrada para reflejar el avance del trabajo.
- Integración con GitHub: cuando se crea un Issue relacionado, un workflow automatizado envía la información a la API y publica un comentario con el análisis generado por modelos de IA.

## CRUD de Entradas (resumen técnico)

Cada `Entrada` almacena al menos los siguientes campos:

- `title` — Título breve de la tarea.
- `description` — Descripción detallada.
- `createdAt` — Fecha de creación.
- `state` — Estado actual (`Pendiente`, `En proceso`, `Terminado`).

Rutas principales (ejemplos):

| Método | Ruta | Descripción |
|---:|---|---|
| POST | `/api/entry` | Crear una nueva Entrada (payload: title, description, state opcional). |
| GET | `/api/entry` | Listar todas las Entradas. |
| GET | `/api/entry/:id` | Obtener una Entrada por ID. |
| PUT | `/api/entry/:id` | Actualizar campos de una Entrada (incluye cambio de `state`). |
| DELETE | `/api/entry/:id` | Eliminar una Entrada. |

La implementación de controladores y rutas se encuentra en `controllers/` y `routes/`.

## Estados de las Entradas

- Pendiente
- En proceso
- Terminado

## Bot de Issues (resumen del módulo de IA)

- Trigger: un workflow de GitHub Actions se dispara cuando se crea un Issue (evento `issues` con tipo `opened`).
- Flujo: el workflow envía el título y la descripción del Issue a un endpoint de la API (por ejemplo `/api/github/issue-review`).
- Análisis: la API interactúa con GitHub Models (o el servicio de modelos configurado) para generar un informe técnico estructurado.
- Publicación: el resultado se publica como comentario en el mismo Issue mediante la API de GitHub.

El workflow de referencia está en `.github/workflows/ai-issue-review.yml` y la lógica de análisis principal está en `services/githubModel.js`.

## Tecnologías utilizadas

| Capa | Tecnologías |
|---|---:|
| Plataforma | Node.js, Express |
| Persistencia | MongoDB |
| Cliente HTTP | Axios |
| CI/CD | GitHub Actions, Azure Pipelines, Render |
| Modelos de IA | GitHub Models |
| Testing | Jest |
| Linter | ESLint |

---

