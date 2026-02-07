# Chasqui II - Landing Page

Landing page del proyecto Chasqui II, el primer CubeSat peruano diseñado y construido por estudiantes de la Universidad Nacional de Ingenieria.

## Requisitos

- [Node.js >= 20](https://nodejs.org/en)
- [pnpm >= 9](https://pnpm.io/installation)

## Comandos

| Comando | Accion |
| :--- | :--- |
| `pnpm install` | Instalar dependencias |
| `pnpm run dev` | Iniciar servidor de desarrollo en `localhost:5173` |
| `pnpm run build` | Build de produccion |
| `pnpm run start` | Ejecutar servidor de produccion |
| `pnpm run lint` | Ejecutar ESLint |
| `pnpm run typecheck` | Verificar tipos TypeScript |
| `pnpm run test` | Ejecutar unit tests (Vitest) |
| `pnpm run test:watch` | Unit tests en modo watch |
| `pnpm run test:e2e` | Ejecutar E2E tests (Playwright) |
| `pnpm sanity` | CLI de Sanity Studio |
| `pnpm sanity:dev` | Iniciar Sanity Studio local |
| `pnpm sanity:deploy` | Desplegar Sanity Studio |
| `pnpm sanity:schema:deploy` | Desplegar cambios de schema al cloud |

## Tech Stack

- **Framework**: [Remix](https://remix.run/) 2.12 con Vite
- **UI**: React 18 + Tailwind CSS
- **CMS**: [Sanity](https://www.sanity.io/) (noticias, productos, contenido)
- **Animaciones**: Motion (Framer Motion) + AOS
- **i18n**: react-i18next (ES/EN)
- **Package Manager**: pnpm

## Estructura del Proyecto

```
White/
├── app/
│   ├── assets/css/          # Estilos globales
│   ├── components/
│   │   ├── animations/      # FadeInView, ScrollProgress
│   │   ├── effects/         # StarField, NebulaOrb
│   │   └── ui/              # Design System (atoms, molecules, organisms)
│   ├── lib/                 # Utilidades (i18n-routes, utils)
│   ├── types/               # Tipos centralizados (interfaces Sanity)
│   ├── __tests__/           # Unit tests (Vitest + Testing Library)
│   ├── pages/               # Componentes de pagina
│   ├── routes/              # Rutas de Remix (file-based routing)
│   ├── sanity/lib/          # Cliente Sanity, queries GROQ
│   └── sections/            # Secciones de la landing (story/)
├── public/                  # Archivos estaticos
├── schemaTypes/             # Schemas de Sanity Studio (source of truth)
├── sanity.config.ts         # Configuracion de Sanity Studio
├── sanity.cli.ts            # Configuracion del CLI de Sanity
├── .env.example             # Template de variables de entorno
└── docs/                    # Documentacion del proyecto
    ├── auditorias/
    ├── todos/
    └── decisiones-tecnicas/
```

## Rutas

| Ruta | Descripcion |
| :--- | :--- |
| `/:lang` | Landing principal (scrollytelling) |
| `/:lang/nosotros` | Pagina del equipo |
| `/:lang/proyecto` | Detalles del proyecto |
| `/:lang/noticias` | Lista de noticias (Sanity) |
| `/:lang/noticias/:slug` | Detalle de noticia |
| `/:lang/tienda` | Tienda de merchandise (Sanity) |

## Sanity CMS

El contenido se gestiona desde [Sanity Studio](https://www.sanity.io/manage).

**Tipos de contenido:**
- `news` / `newsCategory` - Noticias con categorias
- `product` - Productos de la tienda (con galeria de imagenes)
- `partner` - Aliados del proyecto
- `teamMember` - Miembros del equipo
- `subsystem` - Subsistemas del CubeSat

**Configuracion:**
- Project ID: `oh7nanvc`
- Dataset: `production`

**Setup:**

1. Copiar `.env.example` a `.env` y completar las variables:
```bash
cp .env.example .env
```

2. Los schemas locales en `schemaTypes/` son el source of truth. Para desplegar cambios al cloud:
```bash
pnpm sanity:schema:deploy
```

3. Para levantar Sanity Studio en local:
```bash
pnpm sanity:dev
```

## Design System

El Design System esta en `app/components/ui/` organizado en:

- **Atoms**: Badge, Button/LinkButton
- **Molecules**: SectionHeader, SectionBackground, ProductCard, NewsCard
- **Organisms**: (en desarrollo)

Documentacion visual disponible en `/ds` (ruta de desarrollo).
