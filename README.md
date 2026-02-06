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
│   ├── pages/               # Componentes de pagina
│   ├── routes/              # Rutas de Remix (file-based routing)
│   ├── sanity/lib/          # Cliente Sanity, queries GROQ
│   └── sections/            # Secciones de la landing (story/)
├── public/                  # Archivos estaticos
├── schemaTypes/             # Schemas de Sanity Studio
├── sanity.config.ts         # Configuracion de Sanity Studio
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

Para desplegar cambios de schema:
```bash
npx sanity@latest schema deploy
```

## Design System

El Design System esta en `app/components/ui/` organizado en:

- **Atoms**: Badge, Button/LinkButton
- **Molecules**: SectionHeader, SectionBackground, ProductCard, NewsCard
- **Organisms**: (en desarrollo)

Documentacion visual disponible en `/ds` (ruta de desarrollo).
