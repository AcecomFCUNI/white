/**
 * Header Organism
 *
 * Main navigation header with:
 * - Logo
 * - Desktop navigation
 * - Language selector (molecule)
 * - CTA button
 * - Mobile responsive menu
 *
 * Composed of atoms and molecules following Atomic Design.
 */

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Link as RemixLink, useLocation, useParams } from '@remix-run/react'
import { m, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Button } from '../atoms'
import { LanguageSelector } from '../molecules'
import { navigationRoutes, getLocalizedPath, type Language } from '~/lib/i18n-routes'

export function Header() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: Language }>()
  const currentLang = (lang || 'es') as Language
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-black/80 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <RemixLink
            to={getLocalizedPath('home', currentLang)}
            prefetch="intent"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src="/assets/img/logo.png" alt="Chasqui II" className="h-8 w-8 md:h-10 md:w-10" />
            <span className="font-montserrat text-lg font-bold text-white md:text-xl">
              CHASQUI II
            </span>
          </RemixLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navigationRoutes.map((item) => {
                const path = getLocalizedPath(item.routeKey, currentLang)
                return (
                  <li key={item.routeKey}>
                    <NavLink href={path} isActive={location.pathname === path}>
                      {t(item.labelKey)}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* CTA Button & Language Selector (Desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSelector />
            <RemixLink
              to={`${getLocalizedPath('home', currentLang)}#apoyanos`}
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30"
            >
              {t('nav.support')}
            </RemixLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-md md:hidden"
          >
            <nav className="mx-auto max-w-7xl px-4 py-6">
              <ul className="flex flex-col gap-4">
                {navigationRoutes.map((item) => {
                  const path = getLocalizedPath(item.routeKey, currentLang)
                  return (
                    <li key={item.routeKey}>
                      <RemixLink
                        to={path}
                        prefetch="intent"
                        className={`block py-2 text-lg font-medium transition-colors ${
                          location.pathname === path
                            ? 'text-brand'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {t(item.labelKey)}
                      </RemixLink>
                    </li>
                  )
                })}
                <li className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm text-gray-300">{t('nav.language')}</span>
                  <LanguageSelector />
                </li>
                <li className="pt-2">
                  <RemixLink
                    to={`${getLocalizedPath('home', currentLang)}#apoyanos`}
                    className="block w-full rounded-full bg-brand py-3 text-center font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    {t('nav.support')}
                  </RemixLink>
                </li>
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}

interface NavLinkProps {
  href: string
  isActive: boolean
  children: React.ReactNode
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <RemixLink
      to={href}
      prefetch="intent"
      className={`relative text-sm font-medium transition-colors ${
        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <m.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </RemixLink>
  )
}
