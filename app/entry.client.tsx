/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18nConfig from './i18n'
import { resources } from './lib/translations'

async function hydrate() {
  await i18next
    .use(initReactI18next)
    .init({
      ...i18nConfig,
      ns: ['common'],
      // Use bundled translations for instant language switching
      resources,
      // Detect language from HTML tag (set by server)
      lng: document.documentElement.lang || 'es',
      interpolation: {
        escapeValue: false
      }
    })

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>
      </StrictMode>
    )
  })
}

hydrate()
