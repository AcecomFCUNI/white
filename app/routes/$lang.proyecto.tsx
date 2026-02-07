/**
 * Project Page Route - /es/proyecto | /en/proyecto
 * All content via i18n, no Sanity fetch needed
 */

import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { validateLang, routeMap } from '~/lib/i18n-routes'
import { ProjectPage } from '~/pages/ProjectPage'
import { RouteErrorBoundary } from '~/components/shared'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)
  return json({ lang })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return []

  const { lang } = data
  const title = lang === 'en' ? 'Project - Chasqui II' : 'Proyecto - Chasqui II'
  const description = lang === 'en'
    ? 'Discover the technical details of our space mission'
    : 'Descubre los detalles técnicos de nuestra misión espacial'

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { tagName: 'link', rel: 'alternate', hrefLang: 'es', href: `/es/${routeMap.project.es}` },
    { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: `/en/${routeMap.project.en}` },
  ]
}

export default function ProyectoRoute() {
  return <ProjectPage />
}

export { RouteErrorBoundary as ErrorBoundary }
