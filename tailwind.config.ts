import type { Config } from 'tailwindcss'

/**
 * Design Tokens - Tailwind Configuration
 *
 * All design tokens are defined here as the single source of truth.
 * Use these tokens via Tailwind classes: bg-brand, text-whatsapp, etc.
 */
export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand color
        brand: {
          DEFAULT: '#db013a',
          dark: '#6f001c',
          light: '#ff1a4f',
        },
        // Social/Action colors
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
        },
        // Team area colors
        team: {
          design: '#ec4899',     // pink-500
          management: '#3b82f6', // blue-500
          stem: '#22c55e',       // green-500
        },
        // Neutral palette extensions
        surface: {
          DEFAULT: '#0a0a0a',
          elevated: '#141414',
          overlay: 'rgba(0, 0, 0, 0.4)',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config
