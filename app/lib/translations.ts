/**
 * Pre-bundled translations for instant language switching
 * Import this instead of using HTTP backend for faster performance
 */

import esCommon from '../../public/locales/es/common.json'
import enCommon from '../../public/locales/en/common.json'

export const resources = {
  es: {
    common: esCommon
  },
  en: {
    common: enCommon
  }
}
