/**
 * Error Page Component
 * Displays user-friendly error messages with consistent styling
 */

import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { LinkButton } from '~/components/ui'
import { HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface ErrorPageProps {
  status?: number
  title?: string
  message?: string
}

const errorMessages: Record<number, { title: { es: string; en: string }; message: { es: string; en: string } }> = {
  404: {
    title: {
      es: 'Página no encontrada',
      en: 'Page not found'
    },
    message: {
      es: 'La página que buscas no existe o ha sido movida.',
      en: 'The page you are looking for does not exist or has been moved.'
    }
  },
  500: {
    title: {
      es: 'Error del servidor',
      en: 'Server error'
    },
    message: {
      es: 'Algo salió mal en nuestro servidor. Por favor, intenta de nuevo más tarde.',
      en: 'Something went wrong on our server. Please try again later.'
    }
  },
  403: {
    title: {
      es: 'Acceso denegado',
      en: 'Access denied'
    },
    message: {
      es: 'No tienes permiso para acceder a esta página.',
      en: 'You do not have permission to access this page.'
    }
  }
}

export function ErrorPage({ status = 500, title, message }: ErrorPageProps) {
  const { i18n } = useTranslation()
  const lang = (i18n.language || 'es') as 'es' | 'en'

  const defaultError = errorMessages[status] || errorMessages[500]
  const displayTitle = title || defaultError.title[lang]
  const displayMessage = message || defaultError.message[lang]

  const homeText = lang === 'en' ? 'Go home' : 'Ir al inicio'
  const retryText = lang === 'en' ? 'Try again' : 'Reintentar'

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <StarField starCount={100} parallaxEnabled={false} />
        <NebulaOrb
          color="rgba(219, 1, 58, 0.15)"
          size={600}
          position={{ x: '50%', y: '50%' }}
          blur={150}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md text-center">
        {/* Status code */}
        <div className="mb-6">
          <span className="font-montserrat text-8xl font-bold text-brand/20 md:text-9xl">
            {status}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 font-montserrat text-2xl font-bold text-white md:text-3xl">
          {displayTitle}
        </h1>

        {/* Message */}
        <p className="mb-8 text-gray-400">
          {displayMessage}
        </p>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LinkButton href="/" variant="primary">
            <HomeIcon className="h-4 w-4" />
            {homeText}
          </LinkButton>
          <LinkButton
            href="#"
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              window.location.reload()
            }}
          >
            <ArrowPathIcon className="h-4 w-4" />
            {retryText}
          </LinkButton>
        </div>

        {/* Logo */}
        <div className="mt-12">
          <Link to="/" className="inline-block">
            <img
              src="/assets/img/logo.png"
              alt="Chasqui II"
              className="h-12 w-12 opacity-50 transition-opacity hover:opacity-100"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
