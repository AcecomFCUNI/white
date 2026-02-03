/**
 * Global Constants
 *
 * Centralized configuration for the Chasqui II project.
 * All "magic values" should be defined here.
 */

// Contact Information
// TODO: Reemplazar valores placeholder antes de producción
export const CONTACT = {
  email: 'contacto@chasqui2.pe',
  phone: '+51999999999', // TODO: Reemplazar
  whatsappGroup: 'https://chat.whatsapp.com/REPLACE_BEFORE_PROD', // TODO: Reemplazar
  instagram: 'https://www.instagram.com/chasqui2_unsa/',
  linkedin: 'https://www.linkedin.com/company/chasqui-ii',
  facebook: 'https://www.facebook.com/chasqui2unsa',
} as const

// Site Configuration
export const SITE = {
  name: 'Chasqui II',
  url: 'https://chasqui2.pe',
  description: 'Primer CubeSat Peruano',
} as const

// Globe Component Configuration
export const GLOBE_CONFIG = {
  // Optimized cap version (current)
  cap: {
    width: 2000,
    height: 450,
    visibleCapHeight: 266,
  },
  // Original full globe (legacy)
  full: {
    width: 4800,
    height: 4800,
  },
  // Animation settings
  animation: {
    rotationSpeed: 0.05,
    satelliteOrbitSpeed: 0.05,
  },
  // Styling
  style: {
    strokeColor: 'rgba(255, 255, 255, 0.3)',
    strokeWidth: 0.5,
    fillColor: 'rgba(255, 255, 255, 0.1)',
    oceanColor: 'rgba(255, 255, 255, 0.05)',
  },
} as const

/**
 * Color Tokens (reference only)
 *
 * SOURCE OF TRUTH: tailwind.config.ts
 * Use Tailwind classes (bg-brand, text-whatsapp) instead of these values.
 * These are exported for edge cases where Tailwind classes aren't available
 * (e.g., D3.js, canvas, inline styles).
 */
export const COLORS = {
  brand: {
    DEFAULT: '#db013a',
    dark: '#6f001c',
    light: '#ff1a4f',
  },
  whatsapp: {
    DEFAULT: '#25D366',
    dark: '#128C7E',
  },
  surface: {
    DEFAULT: '#0a0a0a',
    elevated: '#141414',
  },
} as const

// Animation Defaults
export const ANIMATION = {
  fadeIn: {
    duration: 0.6,
    delay: 0.1,
  },
  stagger: {
    delay: 0.1,
  },
} as const

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const
