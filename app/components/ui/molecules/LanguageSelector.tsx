/**
 * Language Selector Component
 * URL-based language switching
 */

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useParams } from '@remix-run/react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { getAlternateLanguagePath, supportedLanguages, type Language } from '~/lib/i18n-routes'

const languages = [
  { code: 'es' as Language, name: 'Español', flag: '🇵🇪' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' }
]

export function LanguageSelector() {
  const { lang } = useParams<{ lang: string }>()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = (lang && supportedLanguages.includes(lang as Language) ? lang : 'es') as Language
  const currentLangData = languages.find(l => l.code === currentLang) || languages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Cambiar idioma"
      >
        <GlobeAltIcon className="h-5 w-5" />
        <span className="hidden sm:inline">{currentLangData.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-white/10 bg-black/90 backdrop-blur-xl">
          {languages.map((langOption) => {
            const targetPath = getAlternateLanguagePath(location.pathname, langOption.code)
            const isActive = langOption.code === currentLang

            return (
              <Link
                key={langOption.code}
                to={targetPath}
                onClick={() => setIsOpen(false)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/10 ${
                  isActive
                    ? 'bg-brand/20 text-white'
                    : 'text-gray-300'
                }`}
              >
                <span className="text-lg">{langOption.flag}</span>
                <span>{langOption.name}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
