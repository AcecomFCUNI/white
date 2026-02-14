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
  instagram: 'https://www.instagram.com/chasqui.ll.peru/',
  linkedin: 'https://www.linkedin.com/company/chasqui-2/',
  facebook: 'https://www.facebook.com/CHASQUI2UNI/',
  youtube: 'https://www.youtube.com/@chasqui2peru',
  tiktok: 'https://www.tiktok.com/@chasqui2peru',
  kick: 'https://kick.com/chasqui2peru',
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

/**
 * Animation Configuration
 *
 * Centralized animation settings used across the project.
 * Ensures consistent timing and behavior.
 */
export const ANIMATION = {
  // Duration presets (in seconds for Framer Motion)
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    slower: 1.0,
  },
  // Stagger settings for sequential animations
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
  // FPS settings for canvas animations
  fps: {
    target: 30,
    interval: 1000 / 30, // ~33.33ms
  },
  // Spring physics for Framer Motion
  spring: {
    stiffness: 500,
    damping: 30,
    mass: 1,
  },
  // Ease presets (CSS timing functions)
  ease: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // FadeInView defaults
  fadeIn: {
    duration: 0.6,
    delay: 0.1,
    distance: 20,
  },
} as const

/**
 * NebulaOrb Presets
 *
 * Reusable configurations for the NebulaOrb effect component.
 * Position must be set per-usage since it depends on layout context.
 */
export const NEBULA_PRESETS = {
  brandSubtle: { color: 'rgba(219, 1, 58, 0.15)', size: 500, blur: 100 },
  brandFaint: { color: 'rgba(219, 1, 58, 0.08)', size: 500, blur: 100 },
  blueSubtle: { color: 'rgba(59, 130, 246, 0.15)', size: 600, blur: 120 },
  purpleSubtle: { color: 'rgba(139, 92, 246, 0.1)', size: 600, blur: 120 },
  purpleMedium: { color: 'rgba(139, 92, 246, 0.2)', size: 500, blur: 100 },
} as const

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const
