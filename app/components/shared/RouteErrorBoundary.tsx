/**
 * Reusable ErrorBoundary for route modules
 * Catches loader/action/render errors and displays ErrorPage
 */

import { useRouteError, isRouteErrorResponse } from '@remix-run/react'
import { ErrorPage } from './ErrorPage'

export function RouteErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return <ErrorPage status={error.status} />
  }

  console.error('Unexpected error:', error)
  return <ErrorPage status={500} />
}
