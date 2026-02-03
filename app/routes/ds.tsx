/**
 * Design System - Living Style Guide
 *
 * Esta página muestra todos los componentes del design system
 * organizados siguiendo la metodología Atomic Design:
 * - Atoms: Badge, Button, Heading, IconButton
 * - Molecules: Card, LanguageSelector
 * - Organisms: Header, Footer
 * - Templates: (futuro) PageLayout
 *
 * Los componentes se importan directamente de ~/components/ui/,
 * por lo que cualquier cambio se refleja automáticamente aquí
 * y en todo el proyecto.
 */

import type { MetaFunction } from '@remix-run/node'
import { useState } from 'react'

// Atomic Design imports
import { Badge, Button, Heading, IconButton, IconLink } from '~/components/ui/atoms'
import { Card, LanguageSelector } from '~/components/ui/molecules'
import { Footer } from '~/components/ui/organisms'

import { StarField } from '~/components/effects/StarField'
import {
  HomeIcon,
  ArrowRightIcon,
  HeartIcon,
  BellIcon,
  CogIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

export const meta: MetaFunction = () => {
  return [
    { title: 'Design System - Chasqui II' },
    { name: 'description', content: 'Biblioteca de componentes UI - Atomic Design' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <StarField starCount={100} parallaxEnabled={false} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <header className="mb-16 text-center">
          <Badge className="mb-4">Design System</Badge>
          <Heading level="h1" size="xl">
            Atomic Design UI
          </Heading>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Biblioteca visual de componentes basada en{' '}
            <span className="text-brand">Atomic Design</span>.
            Cualquier cambio en los componentes se refleja automáticamente aquí y en todo el proyecto.
          </p>
        </header>

        {/* Architecture Overview */}
        <section className="mb-16">
          <Card variant="solid" hover={false} padding="lg">
            <Heading level="h2" size="md" className="mb-4">Arquitectura</Heading>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl mb-2">
                  <span className="inline-block w-10 h-10 rounded-full bg-brand/20 text-brand leading-10">A</span>
                </div>
                <h3 className="font-semibold text-white">Atoms</h3>
                <p className="text-xs text-gray-400 mt-1">Badge, Button, Heading, IconButton</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">
                  <span className="inline-block w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 leading-10">M</span>
                </div>
                <h3 className="font-semibold text-white">Molecules</h3>
                <p className="text-xs text-gray-400 mt-1">Card, LanguageSelector</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">
                  <span className="inline-block w-10 h-10 rounded-full bg-green-500/20 text-green-400 leading-10">O</span>
                </div>
                <h3 className="font-semibold text-white">Organisms</h3>
                <p className="text-xs text-gray-400 mt-1">Header, Footer</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">
                  <span className="inline-block w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 leading-10">T</span>
                </div>
                <h3 className="font-semibold text-white">Templates</h3>
                <p className="text-xs text-gray-400 mt-1">PageLayout (futuro)</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <CodeBlock>{`// Importar todo desde un solo punto
import { Badge, Button, Card } from '~/components/ui'

// O importar por categoría atómica
import { Badge, Button } from '~/components/ui/atoms'
import { Card } from '~/components/ui/molecules'`}</CodeBlock>
            </div>
          </Card>
        </section>

        {/* ATOMS */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-8 h-8 rounded-full bg-brand/20 text-brand text-sm font-bold leading-8 text-center">A</span>
            <Heading level="h2" size="lg">Atoms</Heading>
          </div>
          <p className="text-gray-400 mb-8">
            Los bloques de construcción más básicos. No pueden dividirse más sin perder su significado.
          </p>
          <div className="space-y-16">
            <BadgeSection />
            <HeadingSection />
            <ButtonSection />
            <IconButtonSection />
          </div>
        </div>

        {/* MOLECULES */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold leading-8 text-center">M</span>
            <Heading level="h2" size="lg">Molecules</Heading>
          </div>
          <p className="text-gray-400 mb-8">
            Componentes simples formados por la combinación de átomos trabajando juntos.
          </p>
          <div className="space-y-16">
            <CardSection />
            <LanguageSelectorSection />
          </div>
        </div>

        {/* ORGANISMS */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-8 h-8 rounded-full bg-green-500/20 text-green-400 text-sm font-bold leading-8 text-center">O</span>
            <Heading level="h2" size="lg">Organisms</Heading>
          </div>
          <p className="text-gray-400 mb-8">
            Componentes complejos formados por grupos de moléculas y/o átomos. Forman secciones distintas de la interfaz.
          </p>
          <div className="space-y-16">
            <HeaderSection />
            <FooterSection />
          </div>
        </div>

        {/* TEMPLATES (placeholder) */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold leading-8 text-center">T</span>
            <Heading level="h2" size="lg">Templates</Heading>
            <Badge variant="skill" className="ml-2">Próximamente</Badge>
          </div>
          <p className="text-gray-400 mb-8">
            Layouts a nivel de página que colocan componentes en una estructura y articulan el diseño subyacente.
          </p>
          <Card variant="solid" hover={false} className="border-dashed">
            <p className="text-gray-500 text-center py-8">
              PageLayout, SectionLayout, y otros templates serán agregados aquí.
            </p>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>Chasqui II Design System - Atomic Design Architecture</p>
        </footer>
      </div>
    </div>
  )
}

/* ============================================
   HELPER COMPONENTS
   ============================================ */

function SectionWrapper({
  title,
  description,
  children
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-6">
        <Heading level="h3" size="sm" className="mb-2">{title}</Heading>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  )
}

function ComponentRow({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-32 flex-shrink-0">
        <span className="text-xs text-gray-500 font-mono">{label}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono">{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
      >
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
    </div>
  )
}

/* ============================================
   ATOMS SECTIONS
   ============================================ */

function BadgeSection() {
  return (
    <SectionWrapper
      title="Badge"
      description="Etiquetas y badges para categorías, secciones y tags."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="variant='section'">
          <Badge variant="section">Sección</Badge>
          <Badge variant="section">Noticias</Badge>
          <Badge variant="section">Proyecto</Badge>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="variant='category'">
          <Badge variant="category">Evento</Badge>
          <Badge variant="category">Técnico</Badge>
          <Badge variant="category">Equipo</Badge>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="variant='skill'">
          <Badge variant="skill">React</Badge>
          <Badge variant="skill">TypeScript</Badge>
          <Badge variant="skill">Tailwind</Badge>
          <Badge variant="skill">Remix</Badge>
        </ComponentRow>
      </Card>

      <CodeBlock>{`import { Badge } from '~/components/ui/atoms'

<Badge variant="section">Sección</Badge>
<Badge variant="category">Categoría</Badge>
<Badge variant="skill">Skill</Badge>`}</CodeBlock>
    </SectionWrapper>
  )
}

function HeadingSection() {
  return (
    <SectionWrapper
      title="Heading"
      description="Títulos con tipografía Montserrat y soporte para highlight de texto."
    >
      <Card variant="solid" hover={false}>
        <div className="space-y-6">
          <div>
            <span className="text-xs text-gray-500 font-mono mb-2 block">size='xl'</span>
            <Heading level="h1" size="xl">Título Extra Grande</Heading>
          </div>

          <div>
            <span className="text-xs text-gray-500 font-mono mb-2 block">size='lg'</span>
            <Heading level="h2" size="lg">Título Grande</Heading>
          </div>

          <div>
            <span className="text-xs text-gray-500 font-mono mb-2 block">size='md'</span>
            <Heading level="h3" size="md">Título Mediano</Heading>
          </div>

          <div>
            <span className="text-xs text-gray-500 font-mono mb-2 block">size='sm'</span>
            <Heading level="h4" size="sm">Título Pequeño</Heading>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <span className="text-xs text-gray-500 font-mono mb-2 block">con highlight</span>
            <Heading level="h2" size="lg" highlight="Chasqui">
              Proyecto Chasqui II
            </Heading>
          </div>
        </div>
      </Card>

      <CodeBlock>{`import { Heading } from '~/components/ui/atoms'

<Heading level="h1" size="xl">Título</Heading>
<Heading level="h2" size="lg" highlight="Chasqui">
  Proyecto Chasqui II
</Heading>`}</CodeBlock>
    </SectionWrapper>
  )
}

function ButtonSection() {
  const [clicked, setClicked] = useState('')

  return (
    <SectionWrapper
      title="Button"
      description="Botones interactivos con múltiples variantes y tamaños."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="variant='primary'">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="variant='outline'">
          <Button variant="outline" size="sm">Small</Button>
          <Button variant="outline" size="md">Medium</Button>
          <Button variant="outline" size="lg">Large</Button>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="variant='ghost'">
          <Button variant="ghost" size="sm">Small</Button>
          <Button variant="ghost" size="md">Medium</Button>
          <Button variant="ghost" size="lg">Large</Button>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="variant='whatsapp'">
          <Button variant="whatsapp" size="sm">WhatsApp</Button>
          <Button variant="whatsapp" size="md">WhatsApp</Button>
          <Button variant="whatsapp" size="lg">WhatsApp</Button>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="con iconos">
          <Button variant="primary">
            <HomeIcon className="h-4 w-4" />
            Inicio
          </Button>
          <Button variant="outline">
            Ver más
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="disabled">
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled</Button>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="interactivo">
          <Button
            variant="primary"
            onClick={() => setClicked('¡Clickeado!')}
          >
            Haz click
          </Button>
          {clicked && <span className="text-brand text-sm">{clicked}</span>}
        </ComponentRow>
      </Card>

      <CodeBlock>{`import { Button, LinkButton } from '~/components/ui/atoms'

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="outline">
  Ver más
  <ArrowRightIcon className="h-4 w-4" />
</Button>

<LinkButton href="/contacto" variant="primary">
  Contactar
</LinkButton>`}</CodeBlock>
    </SectionWrapper>
  )
}

function IconButtonSection() {
  return (
    <SectionWrapper
      title="IconButton"
      description="Botones con solo iconos para acciones compactas."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="variant='ghost'">
          <IconButton variant="ghost" size="sm" aria-label="Home">
            <HomeIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="ghost" size="md" aria-label="Settings">
            <CogIcon className="h-5 w-5" />
          </IconButton>
          <IconButton variant="ghost" size="lg" aria-label="Notifications">
            <BellIcon className="h-6 w-6" />
          </IconButton>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="variant='outline'">
          <IconButton variant="outline" size="sm" aria-label="Like">
            <HeartIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="outline" size="md" aria-label="Share">
            <ShareIcon className="h-5 w-5" />
          </IconButton>
          <IconButton variant="outline" size="lg" aria-label="Settings">
            <CogIcon className="h-6 w-6" />
          </IconButton>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="variant='solid'">
          <IconButton variant="solid" size="sm" aria-label="Home">
            <HomeIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="solid" size="md" aria-label="Settings">
            <CogIcon className="h-5 w-5" />
          </IconButton>
          <IconButton variant="solid" size="lg" aria-label="Notifications">
            <BellIcon className="h-6 w-6" />
          </IconButton>
        </ComponentRow>

        <div className="my-4 border-t border-gray-800" />

        <ComponentRow label="IconLink (social)">
          <IconLink href="#" variant="social" size="lg" aria-label="Facebook">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
            </svg>
          </IconLink>
          <IconLink href="#" variant="social" size="lg" aria-label="Instagram">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </IconLink>
          <IconLink href="#" variant="social" size="lg" aria-label="LinkedIn">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </IconLink>
        </ComponentRow>
      </Card>

      <CodeBlock>{`import { IconButton, IconLink } from '~/components/ui/atoms'

<IconButton variant="ghost" aria-label="Settings">
  <CogIcon className="h-5 w-5" />
</IconButton>

<IconLink href="#" variant="social" aria-label="Facebook">
  <FacebookIcon />
</IconLink>`}</CodeBlock>
    </SectionWrapper>
  )
}

/* ============================================
   MOLECULES SECTIONS
   ============================================ */

function CardSection() {
  return (
    <SectionWrapper
      title="Card"
      description="Contenedores con efecto glassmorphism y variantes."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <span className="text-xs text-gray-500 font-mono mb-2 block">variant='glass' (default)</span>
          <Card variant="glass">
            <Heading level="h4" size="sm" className="mb-2">Glass Card</Heading>
            <p className="text-sm text-gray-400">
              Efecto glassmorphism con borde sutil y blur de fondo.
            </p>
          </Card>
        </div>

        <div>
          <span className="text-xs text-gray-500 font-mono mb-2 block">variant='solid'</span>
          <Card variant="solid">
            <Heading level="h4" size="sm" className="mb-2">Solid Card</Heading>
            <p className="text-sm text-gray-400">
              Fondo sólido gris oscuro, más visible.
            </p>
          </Card>
        </div>

        <div>
          <span className="text-xs text-gray-500 font-mono mb-2 block">hover=false</span>
          <Card hover={false}>
            <Heading level="h4" size="sm" className="mb-2">Sin Hover</Heading>
            <p className="text-sm text-gray-400">
              Card estática sin efectos de hover.
            </p>
          </Card>
        </div>

        <div>
          <span className="text-xs text-gray-500 font-mono mb-2 block">padding='lg'</span>
          <Card padding="lg">
            <Heading level="h4" size="sm" className="mb-2">Padding Grande</Heading>
            <p className="text-sm text-gray-400">
              Más espacio interno con padding="lg".
            </p>
          </Card>
        </div>
      </div>

      <CodeBlock>{`import { Card } from '~/components/ui/molecules'

<Card variant="glass" hover={true} padding="md">
  <h3>Título</h3>
  <p>Contenido de la card</p>
</Card>

<Card variant="solid" hover={false} padding="lg">
  <h3>Card Estática</h3>
</Card>`}</CodeBlock>
    </SectionWrapper>
  )
}

function LanguageSelectorSection() {
  return (
    <SectionWrapper
      title="LanguageSelector"
      description="Selector de idioma con dropdown y cambio de URL."
    >
      <Card variant="solid" hover={false}>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500 font-mono">default</span>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
            <LanguageSelector />
            <span className="text-xs text-gray-400">← Haz click para ver el dropdown</span>
          </div>
        </div>
      </Card>

      <CodeBlock>{`import { LanguageSelector } from '~/components/ui/molecules'

<LanguageSelector />

// El selector cambia la URL automáticamente:
// /es/historia → /en/story
// /en/story → /es/historia`}</CodeBlock>
    </SectionWrapper>
  )
}

/* ============================================
   ORGANISMS SECTIONS
   ============================================ */

function HeaderSection() {
  return (
    <SectionWrapper
      title="Header"
      description="Navegación principal con logo, menú responsive, selector de idioma y CTA."
    >
      <Card variant="solid" hover={false} padding="none" className="overflow-hidden">
        {/* Header preview container */}
        <div className="relative h-20 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="absolute inset-x-0 top-0 bg-black/80 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4">
              <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <img src="/assets/img/logo.png" alt="Chasqui II" className="h-8 w-8" />
                  <span className="font-montserrat text-lg font-bold text-white">CHASQUI II</span>
                </div>

                {/* Nav items (desktop preview) */}
                <nav className="hidden md:flex items-center gap-6">
                  <span className="text-sm text-white">Inicio</span>
                  <span className="text-sm text-gray-400">Historia</span>
                  <span className="text-sm text-gray-400">Noticias</span>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <span className="text-xs text-gray-400">ES</span>
                  </div>
                  <Button variant="primary" size="sm">Apóyanos</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            Header con efecto glassmorphism, navegación responsive y scroll-aware.
          </p>
        </div>
      </Card>

      <CodeBlock>{`import { Header } from '~/components/ui/organisms'

// El Header incluye:
// - Logo con link al inicio
// - Navegación desktop
// - Menú móvil animado
// - LanguageSelector (molecule)
// - Botón CTA

<Header />`}</CodeBlock>
    </SectionWrapper>
  )
}

function FooterSection() {
  return (
    <SectionWrapper
      title="Footer"
      description="Pie de página con logo, redes sociales y copyright."
    >
      {/* Live Footer preview */}
      <div className="rounded-xl border border-gray-800 overflow-hidden bg-black">
        <Footer className="border-t-0" />
      </div>

      <CodeBlock>{`import { Footer } from '~/components/ui/organisms'

// El Footer incluye:
// - Logo y tagline
// - Links de redes sociales (IconLink atoms)
// - Copyright dinámico

<Footer />
<Footer className="bg-gray-900" />`}</CodeBlock>
    </SectionWrapper>
  )
}
