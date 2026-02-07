import '@testing-library/jest-dom'
import { vi } from 'vitest'

// jsdom doesn't implement matchMedia — provide a default mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'es', changeLanguage: vi.fn() },
  }),
}))

// Mock @remix-run/react
vi.mock('@remix-run/react', () => ({
  useParams: () => ({ lang: 'es' }),
  useLocation: () => ({ pathname: '/es', search: '', hash: '' }),
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => children,
}))
