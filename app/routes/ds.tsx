/**
 * Design System - Living Style Guide
 *
 * Documentación visual interactiva de todos los componentes UI.
 * Organizado con metodología Atomic Design.
 *
 * Estructura:
 * - Atoms: Badge, Button, Heading, IconButton, Input, Textarea, Select, Spinner, Skeleton, Image
 * - Molecules: Card, Modal, Tooltip, Toast, Breadcrumb, Pagination, EmptyState, SectionHeader, ProductCard, NewsCard
 * - Organisms: Header, Footer
 */

import type { MetaFunction } from '@remix-run/node'
import { useState } from 'react'

// Atoms
import {
  Badge,
  Button,
  Heading,
  IconButton,
  Input,
  Textarea,
  Select,
  Spinner,
  Skeleton,
  Image,
} from '~/components/ui/atoms'

// Molecules
import {
  Card,
  LanguageSelector,
  Modal,
  useModal,
  Tooltip,
  ToastProvider,
  useToast,
  Breadcrumb,
  Pagination,
  EmptyState,
  SectionHeader,
  ProductCard,
  NewsCard,
} from '~/components/ui/molecules'

// Organisms
import { Footer } from '~/components/ui/organisms'

import { StarField } from '~/components/effects/StarField'
import {
  HomeIcon,
  ArrowRightIcon,
  HeartIcon,
  BellIcon,
  CogIcon,
  ShareIcon,
  FolderIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

export const meta: MetaFunction = () => {
  return [
    { title: 'Design System - Chasqui II' },
    { name: 'description', content: 'Biblioteca de componentes UI - Atomic Design' },
    { name: 'robots', content: 'noindex, nofollow' },
  ]
}

export default function DesignSystemPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-black text-white">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0">
          <StarField starCount={80} parallaxEnabled={false} />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
          {/* Header */}
          <header className="mb-16 text-center">
            <Badge className="mb-4">Design System v2.0</Badge>
            <Heading level="h1" size="xl">
              Chasqui II UI
            </Heading>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Biblioteca visual de componentes basada en{' '}
              <span className="text-brand">Atomic Design</span>. Incluye{' '}
              <span className="text-white">20+ componentes</span> con soporte para
              accesibilidad, i18n y reduced-motion.
            </p>
          </header>

          {/* Stats */}
          <div className="mb-16 grid gap-4 sm:grid-cols-4">
            <StatCard number="10" label="Atoms" color="brand" />
            <StatCard number="10" label="Molecules" color="blue" />
            <StatCard number="2" label="Organisms" color="green" />
            <StatCard number="2" label="Hooks" color="purple" />
          </div>

          {/* Architecture Overview */}
          <ArchitectureSection />

          {/* Table of Contents */}
          <TableOfContents />

          {/* ATOMS */}
          <div id="atoms" className="mb-20 scroll-mt-8">
            <CategoryHeader
              letter="A"
              title="Atoms"
              description="Los bloques más básicos. No pueden dividirse más sin perder significado."
              color="brand"
            />
            <div className="space-y-16">
              <BadgeSection />
              <HeadingSection />
              <ButtonSection />
              <IconButtonSection />
              <InputSection />
              <TextareaSection />
              <SelectSection />
              <SpinnerSection />
              <SkeletonSection />
              <ImageSection />
            </div>
          </div>

          {/* MOLECULES */}
          <div id="molecules" className="mb-20 scroll-mt-8">
            <CategoryHeader
              letter="M"
              title="Molecules"
              description="Combinaciones de átomos trabajando juntos como unidad."
              color="blue"
            />
            <div className="space-y-16">
              <CardSection />
              <ModalSection />
              <TooltipSection />
              <ToastSection />
              <BreadcrumbSection />
              <PaginationSection />
              <EmptyStateSection />
              <SectionHeaderSection />
              <LanguageSelectorSection />
              <ProductCardSection />
              <NewsCardSection />
            </div>
          </div>

          {/* ORGANISMS */}
          <div id="organisms" className="mb-20 scroll-mt-8">
            <CategoryHeader
              letter="O"
              title="Organisms"
              description="Componentes complejos que forman secciones distintas de la interfaz."
              color="green"
            />
            <div className="space-y-16">
              <HeaderSection />
              <FooterSection />
            </div>
          </div>

          {/* TOKENS */}
          <div id="tokens" className="mb-20 scroll-mt-8">
            <CategoryHeader
              letter="T"
              title="Design Tokens"
              description="Valores fundamentales de diseño: colores, tipografía, espaciado."
              color="purple"
            />
            <div className="space-y-16">
              <ColorsSection />
              <TypographySection />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>Chasqui II Design System - Atomic Design Architecture</p>
            <p className="mt-2">
              Última actualización: Febrero 2026 | 20+ componentes | WCAG AA
            </p>
          </footer>
        </div>
      </div>
    </ToastProvider>
  )
}

/* ============================================
   HELPER COMPONENTS
   ============================================ */

function StatCard({
  number,
  label,
  color,
}: {
  number: string
  label: string
  color: 'brand' | 'blue' | 'green' | 'purple'
}) {
  const colors = {
    brand: 'bg-brand/20 text-brand',
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
  }

  return (
    <Card variant="solid" hover={false} padding="md" className="text-center">
      <div
        className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full ${colors[color]}`}
      >
        <span className="text-xl font-bold">{number}</span>
      </div>
      <p className="text-sm text-gray-400">{label}</p>
    </Card>
  )
}

function CategoryHeader({
  letter,
  title,
  description,
  color,
}: {
  letter: string
  title: string
  description: string
  color: 'brand' | 'blue' | 'green' | 'purple'
}) {
  const colors = {
    brand: 'bg-brand/20 text-brand',
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
  }

  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${colors[color]}`}
        >
          {letter}
        </span>
        <Heading level="h2" size="lg">
          {title}
        </Heading>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function SectionWrapper({
  id,
  title,
  description,
  children,
}: {
  id?: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="mb-6">
        <Heading level="h3" size="sm" className="mb-2">
          {title}
        </Heading>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

function ComponentRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="w-36 flex-shrink-0">
        <span className="font-mono text-xs text-gray-500">{label}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function PropsTable({
  props,
}: {
  props: Array<{
    name: string
    type: string
    default?: string
    description: string
  }>
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-800 bg-gray-900/80">
          <tr>
            <th className="px-4 py-2 font-mono text-xs font-medium text-gray-400">Prop</th>
            <th className="px-4 py-2 font-mono text-xs font-medium text-gray-400">Type</th>
            <th className="px-4 py-2 font-mono text-xs font-medium text-gray-400">Default</th>
            <th className="px-4 py-2 text-xs font-medium text-gray-400">Descripcion</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-4 py-2 font-mono text-xs text-brand">{prop.name}</td>
              <td className="px-4 py-2 font-mono text-xs text-blue-400">{prop.type}</td>
              <td className="px-4 py-2 font-mono text-xs text-gray-500">
                {prop.default || '—'}
              </td>
              <td className="px-4 py-2 text-xs text-gray-300">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-900 p-4">
        <code className="font-mono text-sm text-gray-300">{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded bg-gray-800 px-2 py-1 text-xs transition-colors hover:bg-gray-700"
      >
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
    </div>
  )
}

function TableOfContents() {
  return (
    <Card variant="solid" hover={false} padding="lg" className="mb-16">
      <Heading level="h3" size="sm" className="mb-4">
        Índice de Componentes
      </Heading>
      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <h4 className="mb-2 font-semibold text-brand">Atoms</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a href="#badge" className="hover:text-white">
                Badge
              </a>
            </li>
            <li>
              <a href="#heading" className="hover:text-white">
                Heading
              </a>
            </li>
            <li>
              <a href="#button" className="hover:text-white">
                Button
              </a>
            </li>
            <li>
              <a href="#iconbutton" className="hover:text-white">
                IconButton
              </a>
            </li>
            <li>
              <a href="#input" className="hover:text-white">
                Input
              </a>
            </li>
            <li>
              <a href="#textarea" className="hover:text-white">
                Textarea
              </a>
            </li>
            <li>
              <a href="#select" className="hover:text-white">
                Select
              </a>
            </li>
            <li>
              <a href="#spinner" className="hover:text-white">
                Spinner
              </a>
            </li>
            <li>
              <a href="#skeleton" className="hover:text-white">
                Skeleton
              </a>
            </li>
            <li>
              <a href="#image" className="hover:text-white">
                Image
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-blue-400">Molecules</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a href="#card" className="hover:text-white">
                Card
              </a>
            </li>
            <li>
              <a href="#modal" className="hover:text-white">
                Modal
              </a>
            </li>
            <li>
              <a href="#tooltip" className="hover:text-white">
                Tooltip
              </a>
            </li>
            <li>
              <a href="#toast" className="hover:text-white">
                Toast
              </a>
            </li>
            <li>
              <a href="#breadcrumb" className="hover:text-white">
                Breadcrumb
              </a>
            </li>
            <li>
              <a href="#pagination" className="hover:text-white">
                Pagination
              </a>
            </li>
            <li>
              <a href="#emptystate" className="hover:text-white">
                EmptyState
              </a>
            </li>
            <li>
              <a href="#sectionheader" className="hover:text-white">
                SectionHeader
              </a>
            </li>
            <li>
              <a href="#productcard" className="hover:text-white">
                ProductCard
              </a>
            </li>
            <li>
              <a href="#newscard" className="hover:text-white">
                NewsCard
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-green-400">Organisms</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a href="#header" className="hover:text-white">
                Header
              </a>
            </li>
            <li>
              <a href="#footer" className="hover:text-white">
                Footer
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-purple-400">Tokens</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a href="#colors" className="hover:text-white">
                Colors
              </a>
            </li>
            <li>
              <a href="#typography" className="hover:text-white">
                Typography
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}

function ArchitectureSection() {
  return (
    <section className="mb-16">
      <Card variant="solid" hover={false} padding="lg">
        <Heading level="h2" size="md" className="mb-4">
          Arquitectura Atomic Design
        </Heading>
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 text-2xl">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 leading-10 text-brand">
                A
              </span>
            </div>
            <h3 className="font-semibold text-white">Atoms</h3>
            <p className="mt-1 text-xs text-gray-400">
              Button, Input, Badge, Heading, Spinner, Skeleton, Image
            </p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-2xl">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 leading-10 text-blue-400">
                M
              </span>
            </div>
            <h3 className="font-semibold text-white">Molecules</h3>
            <p className="mt-1 text-xs text-gray-400">
              Card, Modal, Toast, Tooltip, Pagination
            </p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-2xl">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 leading-10 text-green-400">
                O
              </span>
            </div>
            <h3 className="font-semibold text-white">Organisms</h3>
            <p className="mt-1 text-xs text-gray-400">Header, Footer</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-2xl">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 leading-10 text-purple-400">
                T
              </span>
            </div>
            <h3 className="font-semibold text-white">Templates</h3>
            <p className="mt-1 text-xs text-gray-400">PageLayout (futuro)</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4">
          <CodeBlock>{`// Importar desde barrel exports
import { Badge, Button, Input } from '~/components/ui/atoms'
import { Card, Modal, Toast } from '~/components/ui/molecules'
import { Header, Footer } from '~/components/ui/organisms'`}</CodeBlock>
        </div>
      </Card>
    </section>
  )
}

/* ============================================
   ATOMS SECTIONS
   ============================================ */

function BadgeSection() {
  return (
    <SectionWrapper
      id="badge"
      title="Badge"
      description="Etiquetas para categorías, secciones y tags con diferentes estilos."
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
        </ComponentRow>
      </Card>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Contenido del badge' },
          {
            name: 'variant',
            type: "'section' | 'category' | 'skill'",
            default: "'section'",
            description: 'Estilo visual del badge',
          },
          { name: 'className', type: 'string', description: 'Clases CSS adicionales' },
        ]}
      />
      <CodeBlock>{`<Badge variant="section">Sección</Badge>
<Badge variant="category">Categoría</Badge>
<Badge variant="skill">Skill</Badge>`}</CodeBlock>
    </SectionWrapper>
  )
}

function HeadingSection() {
  return (
    <SectionWrapper
      id="heading"
      title="Heading"
      description="Títulos con Montserrat y soporte para highlight de texto."
    >
      <Card variant="solid" hover={false}>
        <div className="space-y-4">
          <div>
            <span className="mb-1 block font-mono text-xs text-gray-500">size='xl'</span>
            <Heading level="h1" size="xl">
              Título Extra Grande
            </Heading>
          </div>
          <div>
            <span className="mb-1 block font-mono text-xs text-gray-500">size='lg'</span>
            <Heading level="h2" size="lg">
              Título Grande
            </Heading>
          </div>
          <div>
            <span className="mb-1 block font-mono text-xs text-gray-500">size='md'</span>
            <Heading level="h3" size="md">
              Título Mediano
            </Heading>
          </div>
          <div>
            <span className="mb-1 block font-mono text-xs text-gray-500">size='sm'</span>
            <Heading level="h4" size="sm">
              Título Pequeño
            </Heading>
          </div>
          <div className="border-t border-gray-800 pt-4">
            <span className="mb-1 block font-mono text-xs text-gray-500">
              con highlight
            </span>
            <Heading level="h2" size="lg" highlight="Chasqui">
              Proyecto Chasqui II
            </Heading>
          </div>
        </div>
      </Card>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Texto del titulo' },
          {
            name: 'level',
            type: "'h1' | 'h2' | 'h3' | 'h4'",
            default: "'h2'",
            description: 'Etiqueta HTML semantica',
          },
          {
            name: 'size',
            type: "'xl' | 'lg' | 'md' | 'sm'",
            default: "'lg'",
            description: 'Tamano visual del texto',
          },
          {
            name: 'highlight',
            type: 'string',
            description: 'Texto a resaltar en color brand',
          },
          { name: 'className', type: 'string', description: 'Clases CSS adicionales' },
        ]}
      />
      <CodeBlock>{`<Heading level="h1" size="xl">Título</Heading>
<Heading level="h2" size="lg" highlight="Chasqui">
  Proyecto Chasqui II
</Heading>`}</CodeBlock>
    </SectionWrapper>
  )
}

function ButtonSection() {
  return (
    <SectionWrapper
      id="button"
      title="Button"
      description="Botones con variantes primary, outline, ghost y whatsapp."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="variant='primary'">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </ComponentRow>
        <div className="my-4 border-t border-gray-800" />
        <ComponentRow label="variant='outline'">
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="outline" size="md">
            Medium
          </Button>
          <Button variant="outline" size="lg">
            Large
          </Button>
        </ComponentRow>
        <div className="my-4 border-t border-gray-800" />
        <ComponentRow label="variant='ghost'">
          <Button variant="ghost" size="sm">
            Small
          </Button>
          <Button variant="ghost" size="md">
            Medium
          </Button>
          <Button variant="ghost" size="lg">
            Large
          </Button>
        </ComponentRow>
        <div className="my-4 border-t border-gray-800" />
        <ComponentRow label="variant='whatsapp'">
          <Button variant="whatsapp" size="md">
            WhatsApp
          </Button>
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
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </ComponentRow>
      </Card>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Contenido del boton (texto, iconos)' },
          {
            name: 'variant',
            type: "'primary' | 'outline' | 'ghost' | 'whatsapp'",
            default: "'primary'",
            description: 'Estilo visual',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Tamano del boton',
          },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el boton' },
          { name: 'className', type: 'string', description: 'Clases CSS adicionales' },
          { name: '...rest', type: 'ButtonHTMLAttributes', description: 'Props nativas de <button>' },
        ]}
      />
      <CodeBlock>{`<Button variant="primary" size="md">Click</Button>
<Button variant="outline">
  Ver más <ArrowRightIcon className="h-4 w-4" />
</Button>
<Button variant="whatsapp">WhatsApp</Button>`}</CodeBlock>
    </SectionWrapper>
  )
}

function IconButtonSection() {
  return (
    <SectionWrapper
      id="iconbutton"
      title="IconButton"
      description="Botones de solo icono para acciones compactas."
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
        </ComponentRow>
        <div className="my-4 border-t border-gray-800" />
        <ComponentRow label="variant='solid'">
          <IconButton variant="solid" size="sm" aria-label="Home">
            <HomeIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="solid" size="md" aria-label="Settings">
            <CogIcon className="h-5 w-5" />
          </IconButton>
        </ComponentRow>
      </Card>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Icono del boton' },
          {
            name: 'variant',
            type: "'ghost' | 'outline' | 'solid' | 'social'",
            default: "'ghost'",
            description: 'Estilo visual',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Tamano (h-8, h-10, h-12)',
          },
          {
            name: 'aria-label',
            type: 'string',
            description: 'Requerido para accesibilidad',
          },
        ]}
      />
      <CodeBlock>{`<IconButton variant="ghost" aria-label="Settings">
  <CogIcon className="h-5 w-5" />
</IconButton>`}</CodeBlock>
    </SectionWrapper>
  )
}

function InputSection() {
  const [value, setValue] = useState('')

  return (
    <SectionWrapper
      id="input"
      title="Input"
      description="Campo de texto con label, placeholder y estados de error/success."
    >
      <Card variant="solid" hover={false}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Default"
            placeholder="Escribe algo..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Input
            label="Con error"
            placeholder="Email"
            error="El email no es válido"
            defaultValue="invalid-email"
          />
          <Input label="Disabled" placeholder="No editable" disabled />
          <Input type="password" label="Password" placeholder="••••••••" />
        </div>
      </Card>
      <PropsTable
        props={[
          {
            name: 'variant',
            type: "'default' | 'error' | 'success'",
            default: "'default'",
            description: 'Estado visual del campo',
          },
          { name: 'label', type: 'string', description: 'Label del campo' },
          { name: 'error', type: 'string', description: 'Mensaje de error (activa variant error)' },
          { name: 'helperText', type: 'string', description: 'Texto de ayuda debajo del campo' },
          { name: '...rest', type: 'InputHTMLAttributes', description: 'Props nativas de <input>' },
        ]}
      />
      <CodeBlock>{`<Input
  label="Email"
  placeholder="tu@email.com"
  error="El email no es válido"
/>
<Input type="password" label="Contraseña" />`}</CodeBlock>
    </SectionWrapper>
  )
}

function TextareaSection() {
  return (
    <SectionWrapper
      id="textarea"
      title="Textarea"
      description="Área de texto multilínea con las mismas variantes que Input."
    >
      <Card variant="solid" hover={false}>
        <div className="grid gap-4 md:grid-cols-2">
          <Textarea label="Mensaje" placeholder="Escribe tu mensaje..." rows={3} />
          <Textarea
            label="Con error"
            placeholder="Descripción"
            error="Mínimo 10 caracteres"
            rows={3}
          />
        </div>
      </Card>
      <PropsTable
        props={[
          {
            name: 'variant',
            type: "'default' | 'error' | 'success'",
            default: "'default'",
            description: 'Estado visual del campo',
          },
          { name: 'label', type: 'string', description: 'Label del campo' },
          { name: 'error', type: 'string', description: 'Mensaje de error' },
          { name: 'helperText', type: 'string', description: 'Texto de ayuda' },
          { name: '...rest', type: 'TextareaHTMLAttributes', description: 'Props nativas de <textarea>' },
        ]}
      />
      <CodeBlock>{`<Textarea
  label="Mensaje"
  placeholder="Escribe tu mensaje..."
  rows={4}
  error="Mínimo 10 caracteres"
/>`}</CodeBlock>
    </SectionWrapper>
  )
}

function SelectSection() {
  const options = [
    { value: 'general', label: 'Consulta general' },
    { value: 'support', label: 'Soporte técnico' },
    { value: 'other', label: 'Otro' },
  ]

  return (
    <SectionWrapper
      id="select"
      title="Select"
      description="Selector desplegable con opciones configurables."
    >
      <Card variant="solid" hover={false}>
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Asunto" placeholder="Selecciona un asunto" options={options} />
          <Select
            label="Con error"
            placeholder="Selecciona"
            options={options}
            error="Selecciona una opción"
          />
        </div>
      </Card>
      <PropsTable
        props={[
          {
            name: 'options',
            type: '{ value: string; label: string; disabled?: boolean }[]',
            description: 'Lista de opciones del selector',
          },
          { name: 'placeholder', type: 'string', description: 'Texto placeholder' },
          {
            name: 'variant',
            type: "'default' | 'error' | 'success'",
            default: "'default'",
            description: 'Estado visual',
          },
          { name: 'label', type: 'string', description: 'Label del campo' },
          { name: 'error', type: 'string', description: 'Mensaje de error' },
        ]}
      />
      <CodeBlock>{`<Select
  label="Asunto"
  placeholder="Selecciona"
  options={[
    { value: 'general', label: 'Consulta general' },
    { value: 'support', label: 'Soporte técnico' },
  ]}
/>`}</CodeBlock>
    </SectionWrapper>
  )
}

function SpinnerSection() {
  return (
    <SectionWrapper
      id="spinner"
      title="Spinner"
      description="Indicador de carga animado en 3 tamaños."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="sizes">
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs text-gray-500">sm</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner size="md" />
            <span className="text-xs text-gray-500">md</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs text-gray-500">lg</span>
          </div>
        </ComponentRow>
        <div className="my-4 border-t border-gray-800" />
        <ComponentRow label="en botón">
          <Button variant="primary" disabled>
            <Spinner size="sm" />
            Cargando...
          </Button>
        </ComponentRow>
      </Card>
      <PropsTable
        props={[
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Tamano del spinner (h-4, h-8, h-12)',
          },
          { name: 'label', type: 'string', description: 'Texto accesible para screen readers' },
          { name: 'className', type: 'string', description: 'Clases CSS adicionales' },
        ]}
      />
      <CodeBlock>{`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

<Button disabled>
  <Spinner size="sm" /> Cargando...
</Button>`}</CodeBlock>
    </SectionWrapper>
  )
}

function SkeletonSection() {
  return (
    <SectionWrapper
      id="skeleton"
      title="Skeleton"
      description="Placeholder de carga con variantes rectangular, circular y texto."
    >
      <Card variant="solid" hover={false}>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <span className="mb-2 block font-mono text-xs text-gray-500">rectangular</span>
            <Skeleton variant="rectangular" className="h-32 w-full" />
          </div>
          <div>
            <span className="mb-2 block font-mono text-xs text-gray-500">circular</span>
            <Skeleton variant="circular" className="h-16 w-16" />
          </div>
          <div>
            <span className="mb-2 block font-mono text-xs text-gray-500">text</span>
            <div className="space-y-2">
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-3/4" />
              <Skeleton variant="text" className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </Card>
      <PropsTable
        props={[
          {
            name: 'variant',
            type: "'rectangular' | 'circular' | 'text'",
            default: "'rectangular'",
            description: 'Forma del placeholder',
          },
          { name: 'lines', type: 'number', description: 'Cantidad de lineas (solo variant text)' },
          { name: 'className', type: 'string', description: 'Controla tamano con h-* w-*' },
        ]}
      />
      <CodeBlock>{`<Skeleton variant="rectangular" className="h-32 w-full" />
<Skeleton variant="circular" className="h-16 w-16" />
<Skeleton variant="text" className="h-4 w-full" />`}</CodeBlock>
    </SectionWrapper>
  )
}

function ImageSection() {
  return (
    <SectionWrapper
      id="image"
      title="Image"
      description="Imagen con fallback SVG, Sanity CDN transforms y lazy loading."
    >
      <Card variant="solid" hover={false}>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <span className="mb-2 block font-mono text-xs text-gray-500">con src</span>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/assets/img/logo.png"
                alt="Logo Chasqui II"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div>
            <span className="mb-2 block font-mono text-xs text-gray-500">sin src (fallback)</span>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                alt="Sin imagen"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <span className="mb-2 block font-mono text-xs text-gray-500">fallbackText custom</span>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                alt="Foto de equipo"
                fallbackText="Foto"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Card>
      <PropsTable
        props={[
          { name: 'src', type: 'string', description: 'URL de la imagen (auto-detecta Sanity CDN)' },
          { name: 'alt', type: 'string', description: 'Texto alternativo (requerido)' },
          { name: 'width', type: 'number', description: 'Ancho para Sanity CDN transform (?w=)' },
          { name: 'quality', type: 'number', default: '80', description: 'Calidad para Sanity CDN (?q=)' },
          { name: 'fallbackText', type: 'string', default: "'Image not available'", description: 'Texto del placeholder SVG' },
          { name: 'loading', type: "'lazy' | 'eager'", default: "'lazy'", description: 'Estrategia de carga' },
          { name: 'className', type: 'string', description: 'Clases CSS adicionales' },
        ]}
      />
      <CodeBlock>{`<Image
  src="https://cdn.sanity.io/images/.../image.jpg"
  alt="Producto"
  width={400}
  quality={80}
/>

{/* Sin src - muestra fallback SVG */}
<Image alt="Sin imagen" fallbackText="Foto" />`}</CodeBlock>
    </SectionWrapper>
  )
}

/* ============================================
   MOLECULES SECTIONS
   ============================================ */

function CardSection() {
  return (
    <SectionWrapper
      id="card"
      title="Card"
      description="Contenedores con efecto glassmorphism y variantes."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <span className="mb-2 block font-mono text-xs text-gray-500">
            variant='glass' (default)
          </span>
          <Card variant="glass">
            <Heading level="h4" size="sm" className="mb-2">
              Glass Card
            </Heading>
            <p className="text-sm text-gray-400">Efecto glassmorphism con blur.</p>
          </Card>
        </div>
        <div>
          <span className="mb-2 block font-mono text-xs text-gray-500">variant='solid'</span>
          <Card variant="solid">
            <Heading level="h4" size="sm" className="mb-2">
              Solid Card
            </Heading>
            <p className="text-sm text-gray-400">Fondo sólido gris oscuro.</p>
          </Card>
        </div>
      </div>
      <PropsTable
        props={[
          {
            name: 'variant',
            type: "'glass' | 'solid'",
            default: "'glass'",
            description: 'Glassmorphism o fondo solido',
          },
          { name: 'hover', type: 'boolean', default: 'true', description: 'Efecto hover con elevacion' },
          {
            name: 'padding',
            type: "'none' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Padding interno (0, p-4, p-6, p-8)',
          },
          { name: 'as', type: "'div' | 'article'", default: "'div'", description: 'Etiqueta HTML semantica' },
          { name: 'children', type: 'ReactNode', description: 'Contenido de la card' },
          { name: 'className', type: 'string', description: 'Clases CSS adicionales' },
        ]}
      />
      <CodeBlock>{`<Card variant="glass" hover={true} padding="md">
  <h3>Título</h3>
  <p>Contenido</p>
</Card>`}</CodeBlock>
    </SectionWrapper>
  )
}

function ModalSection() {
  const { isOpen, open, close } = useModal()

  return (
    <SectionWrapper
      id="modal"
      title="Modal"
      description="Diálogo modal con focus trap, escape para cerrar y accesibilidad."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="demo">
          <Button variant="primary" onClick={open}>
            Abrir Modal
          </Button>
        </ComponentRow>
      </Card>
      <Modal isOpen={isOpen} onClose={close} title="Modal de Ejemplo" size="md">
        <p className="text-gray-300">
          Este es el contenido del modal. Puedes presionar Escape o hacer click fuera
          para cerrar.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={close}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={close}>
            Confirmar
          </Button>
        </div>
      </Modal>
      <PropsTable
        props={[
          { name: 'isOpen', type: 'boolean', description: 'Controla visibilidad del modal' },
          { name: 'onClose', type: '() => void', description: 'Callback al cerrar' },
          { name: 'title', type: 'string', description: 'Titulo del modal' },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
            default: "'md'",
            description: 'Ancho del modal',
          },
          { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', description: 'Cerrar al click fuera' },
          { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Cerrar con Escape' },
          { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Mostrar boton X' },
          { name: 'children', type: 'ReactNode', description: 'Contenido del modal' },
        ]}
      />
      <CodeBlock>{`const { isOpen, open, close } = useModal()

<Button onClick={open}>Abrir</Button>

<Modal isOpen={isOpen} onClose={close} title="Título">
  <p>Contenido del modal</p>
</Modal>`}</CodeBlock>
    </SectionWrapper>
  )
}

function TooltipSection() {
  return (
    <SectionWrapper
      id="tooltip"
      title="Tooltip"
      description="Tooltips con 4 posiciones y soporte para reduced-motion."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="posiciones">
          <Tooltip content="Tooltip arriba" position="top">
            <Button variant="outline" size="sm">
              Top
            </Button>
          </Tooltip>
          <Tooltip content="Tooltip abajo" position="bottom">
            <Button variant="outline" size="sm">
              Bottom
            </Button>
          </Tooltip>
          <Tooltip content="Tooltip izquierda" position="left">
            <Button variant="outline" size="sm">
              Left
            </Button>
          </Tooltip>
          <Tooltip content="Tooltip derecha" position="right">
            <Button variant="outline" size="sm">
              Right
            </Button>
          </Tooltip>
        </ComponentRow>
      </Card>
      <PropsTable
        props={[
          { name: 'content', type: 'string', description: 'Texto del tooltip' },
          {
            name: 'position',
            type: "'top' | 'bottom' | 'left' | 'right'",
            default: "'top'",
            description: 'Posicion relativa al hijo',
          },
          { name: 'delay', type: 'number', default: '0', description: 'Delay antes de mostrar (ms)' },
          { name: 'children', type: 'ReactElement', description: 'Elemento que activa el tooltip' },
        ]}
      />
      <CodeBlock>{`<Tooltip content="Info útil" position="top">
  <Button>Hover me</Button>
</Tooltip>`}</CodeBlock>
    </SectionWrapper>
  )
}

function ToastSection() {
  const { addToast } = useToast()

  return (
    <SectionWrapper
      id="toast"
      title="Toast"
      description="Notificaciones con variantes success, error, warning e info."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="variantes">
          <Button
            variant="outline"
            size="sm"
            onClick={() => addToast({ message: 'Operación exitosa', variant: 'success' })}
          >
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            Success
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addToast({ message: 'Algo salió mal', variant: 'error' })}
          >
            <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
            Error
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addToast({ message: 'Ten cuidado', variant: 'warning' })}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addToast({ message: 'Información útil', variant: 'info' })}
          >
            Info
          </Button>
        </ComponentRow>
      </Card>
      <PropsTable
        props={[
          { name: 'message', type: 'string', description: 'Texto de la notificacion' },
          {
            name: 'variant',
            type: "'success' | 'error' | 'warning' | 'info'",
            description: 'Tipo de notificacion',
          },
          { name: 'duration', type: 'number', default: '5000', description: 'Duracion en ms antes de cerrar' },
        ]}
      />
      <CodeBlock>{`// En root.tsx o layout
<ToastProvider>
  <App />
</ToastProvider>

// En cualquier componente
const { addToast } = useToast()
addToast({ message: 'Guardado', variant: 'success' })`}</CodeBlock>
    </SectionWrapper>
  )
}

function BreadcrumbSection() {
  const items = [
    { label: 'Inicio', href: '/' },
    { label: 'Proyecto', href: '/proyecto' },
    { label: 'Subsistemas' },
  ]

  return (
    <SectionWrapper
      id="breadcrumb"
      title="Breadcrumb"
      description="Navegación de migas de pan con semántica HTML correcta."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="default">
          <Breadcrumb items={items} />
        </ComponentRow>
        <div className="my-4 border-t border-gray-800" />
        <ComponentRow label="showHomeIcon">
          <Breadcrumb items={items} showHomeIcon />
        </ComponentRow>
      </Card>
      <PropsTable
        props={[
          {
            name: 'items',
            type: '{ label: string; href?: string; icon?: ReactNode }[]',
            description: 'Lista de niveles de navegacion',
          },
          { name: 'separator', type: 'ReactNode', default: 'ChevronRight', description: 'Separador entre items' },
          { name: 'showHomeIcon', type: 'boolean', default: 'false', description: 'Mostrar icono home al inicio' },
        ]}
      />
      <CodeBlock>{`<Breadcrumb items={[
  { label: 'Inicio', href: '/' },
  { label: 'Proyecto', href: '/proyecto' },
  { label: 'Subsistemas' },
]} />`}</CodeBlock>
    </SectionWrapper>
  )
}

function PaginationSection() {
  const [page, setPage] = useState(1)

  return (
    <SectionWrapper
      id="pagination"
      title="Pagination"
      description="Paginación con ellipsis para muchas páginas."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="interactivo">
          <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
        </ComponentRow>
        <div className="my-4 border-t border-gray-800" />
        <ComponentRow label="pocas páginas">
          <Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />
        </ComponentRow>
      </Card>
      <PropsTable
        props={[
          { name: 'currentPage', type: 'number', description: 'Pagina activa actual' },
          { name: 'totalPages', type: 'number', description: 'Total de paginas' },
          { name: 'onPageChange', type: '(page: number) => void', description: 'Callback al cambiar pagina' },
          { name: 'siblingCount', type: 'number', default: '1', description: 'Paginas visibles a cada lado' },
          { name: 'showFirstLast', type: 'boolean', default: 'true', description: 'Mostrar botones primera/ultima' },
        ]}
      />
      <CodeBlock>{`<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={(p) => setPage(p)}
/>`}</CodeBlock>
    </SectionWrapper>
  )
}

function EmptyStateSection() {
  return (
    <SectionWrapper
      id="emptystate"
      title="EmptyState"
      description="Estado vacío con icono, título, descripción y acción."
    >
      <Card variant="solid" hover={false}>
        <EmptyState
          icon={<FolderIcon className="h-12 w-12" />}
          title="No hay proyectos"
          description="Crea tu primer proyecto para comenzar"
          action={{ label: 'Crear proyecto', onClick: () => {} }}
          size="md"
        />
      </Card>
      <PropsTable
        props={[
          { name: 'title', type: 'string', description: 'Texto principal' },
          { name: 'description', type: 'string', description: 'Texto descriptivo' },
          { name: 'icon', type: 'ReactNode', description: 'Icono personalizado' },
          {
            name: 'action',
            type: '{ label: string; onClick: () => void; variant?: ButtonVariant }',
            description: 'Boton de accion',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Tamano del componente',
          },
        ]}
      />
      <CodeBlock>{`<EmptyState
  icon={<FolderIcon className="h-12 w-12" />}
  title="No hay proyectos"
  description="Crea tu primer proyecto"
  action={{ label: 'Crear', onClick: () => {} }}
/>`}</CodeBlock>
    </SectionWrapper>
  )
}

function SectionHeaderSection() {
  return (
    <SectionWrapper
      id="sectionheader"
      title="SectionHeader"
      description="Encabezado de sección reutilizable con badge, título y descripción."
    >
      <Card variant="solid" hover={false} padding="lg">
        <SectionHeader
          badge="Noticias"
          title="Últimas"
          highlight="Actualizaciones"
          description="Mantente al día con los avances del proyecto."
          align="center"
        />
      </Card>
      <PropsTable
        props={[
          { name: 'badge', type: 'string', description: 'Texto del badge superior' },
          { name: 'title', type: 'string', description: 'Titulo de la seccion' },
          { name: 'highlight', type: 'string', description: 'Palabra a resaltar en color brand' },
          { name: 'description', type: 'string', description: 'Texto descriptivo' },
          {
            name: 'align',
            type: "'left' | 'center'",
            default: "'center'",
            description: 'Alineacion del texto',
          },
          { name: 'animated', type: 'boolean', default: 'true', description: 'Animacion FadeInView' },
        ]}
      />
      <CodeBlock>{`<SectionHeader
  badge="Noticias"
  title="Últimas"
  highlight="Actualizaciones"
  description="Mantente al día"
  align="center"
/>`}</CodeBlock>
    </SectionWrapper>
  )
}

function LanguageSelectorSection() {
  return (
    <SectionWrapper
      id="languageselector"
      title="LanguageSelector"
      description="Selector de idioma con dropdown y cambio de URL."
    >
      <Card variant="solid" hover={false}>
        <ComponentRow label="default">
          <div className="flex items-center gap-2 rounded-lg bg-gray-800 p-2">
            <LanguageSelector />
            <span className="text-xs text-gray-400">← Click para ver dropdown</span>
          </div>
        </ComponentRow>
      </Card>
      <CodeBlock>{`<LanguageSelector />
// Cambia URL automáticamente: /es/... ↔ /en/...`}</CodeBlock>
    </SectionWrapper>
  )
}

function ProductCardSection() {
  return (
    <SectionWrapper
      id="productcard"
      title="ProductCard"
      description="Card para productos de la tienda con imagen, precio y botón de WhatsApp."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <ProductCard
          name="Camiseta Chasqui II"
          description="Camiseta oficial del proyecto con logo bordado."
          price={45.00}
          inStock={true}
          buyLink="#"
          buyLabel="Comprar"
        />
        <ProductCard
          name="Producto Agotado"
          description="Este producto no está disponible."
          price={30.00}
          inStock={false}
          outOfStockLabel="Agotado"
        />
      </div>
      <PropsTable
        props={[
          { name: 'name', type: 'string', description: 'Nombre del producto' },
          { name: 'description', type: 'string', description: 'Descripcion del producto' },
          { name: 'price', type: 'number', description: 'Precio en soles (S/.)' },
          { name: 'imageUrl', type: 'string', description: 'URL de la imagen principal' },
          { name: 'gallery', type: 'string[]', description: 'URLs de imagenes para carousel' },
          { name: 'inStock', type: 'boolean', default: 'true', description: 'Disponibilidad' },
          { name: 'buyLink', type: 'string', description: 'URL del enlace de compra (WhatsApp)' },
          { name: 'buyLabel', type: 'string', description: 'Texto del boton de compra' },
          { name: 'outOfStockLabel', type: 'string', description: 'Texto cuando no hay stock' },
        ]}
      />
      <CodeBlock>{`<ProductCard
  name="Camiseta Chasqui II"
  description="Camiseta oficial del proyecto"
  price={45.00}
  imageUrl="/assets/img/product.jpg"
  gallery={["/img/2.jpg", "/img/3.jpg"]}
  inStock={true}
  buyLink="https://wa.me/..."
  buyLabel="Comprar"
/>`}</CodeBlock>
    </SectionWrapper>
  )
}

function NewsCardSection() {
  return (
    <SectionWrapper
      id="newscard"
      title="NewsCard"
      description="Card para artículos de noticias con imagen, categoría, fecha y enlace."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <NewsCard
          title="Chasqui II en FLIT 2024"
          excerpt="Nuestro equipo participó activamente presentando los avances del proyecto."
          href="#"
          category={{ name: 'Evento', color: 'purple' }}
          publishedAt="15 de noviembre, 2024"
          readMoreLabel="Leer más"
        />
        <NewsCard
          title="Avances en comunicaciones"
          excerpt="El equipo de COMMS completó pruebas de enlace exitosas."
          href="#"
          category={{ name: 'Técnico', color: 'blue' }}
          publishedAt="10 de octubre, 2024"
        />
      </div>
      <Card variant="solid" hover={false} padding="md" className="mt-6">
        <span className="mb-2 block font-mono text-xs text-gray-500">featured=true</span>
        <NewsCard
          featured
          title="Noticia Destacada"
          excerpt="Las noticias destacadas tienen un layout horizontal más prominente."
          href="#"
          category={{ name: 'Internacional', color: 'yellow' }}
          publishedAt="5 de febrero, 2026"
        />
      </Card>
      <PropsTable
        props={[
          { name: 'title', type: 'string', description: 'Titulo de la noticia' },
          { name: 'excerpt', type: 'string', description: 'Resumen del articulo' },
          { name: 'href', type: 'string', description: 'URL del articulo' },
          { name: 'imageUrl', type: 'string', description: 'URL de la imagen' },
          {
            name: 'category',
            type: "{ name: string; color?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' }",
            description: 'Categoria con color',
          },
          { name: 'publishedAt', type: 'string', description: 'Fecha de publicacion formateada' },
          { name: 'readMoreLabel', type: 'string', description: 'Texto del enlace leer mas' },
          { name: 'featured', type: 'boolean', default: 'false', description: 'Layout destacado horizontal' },
        ]}
      />
      <CodeBlock>{`<NewsCard
  title="Título de la noticia"
  excerpt="Resumen del artículo..."
  href="/es/noticias/slug"
  imageUrl="/assets/img/news.jpg"
  category={{ name: 'Evento', color: 'purple' }}
  publishedAt="15 de noviembre, 2024"
  readMoreLabel="Leer más"
  featured={false}
/>`}</CodeBlock>
    </SectionWrapper>
  )
}

/* ============================================
   ORGANISMS SECTIONS
   ============================================ */

function HeaderSection() {
  return (
    <SectionWrapper
      id="header"
      title="Header"
      description="Navegación principal con logo, menú responsive y selector de idioma."
    >
      <Card variant="solid" hover={false} padding="none" className="overflow-hidden">
        <div className="relative h-20 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="absolute inset-x-0 top-0 bg-black/80 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/assets/img/logo.png" alt="Chasqui II" className="h-8 w-8" />
                  <span className="font-montserrat text-lg font-bold text-white">
                    CHASQUI II
                  </span>
                </div>
                <nav className="hidden items-center gap-6 md:flex">
                  <span className="text-sm text-white">Inicio</span>
                  <span className="text-sm text-gray-400">Historia</span>
                  <span className="text-sm text-gray-400">Noticias</span>
                </nav>
                <div className="flex items-center gap-3">
                  <Button variant="primary" size="sm">
                    Apóyanos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 p-4">
          <p className="text-xs text-gray-500">
            Header con glassmorphism, menú responsive y scroll-aware.
          </p>
        </div>
      </Card>
      <CodeBlock>{`import { Header } from '~/components/ui/organisms'

<Header />
// Incluye: Logo, nav, mobile menu, LanguageSelector, CTA`}</CodeBlock>
    </SectionWrapper>
  )
}

function FooterSection() {
  return (
    <SectionWrapper
      id="footer"
      title="Footer"
      description="Pie de página con logo, redes sociales y copyright."
    >
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-black">
        <Footer className="border-t-0" />
      </div>
      <CodeBlock>{`import { Footer } from '~/components/ui/organisms'

<Footer />
// Incluye: Logo, tagline, social links, copyright`}</CodeBlock>
    </SectionWrapper>
  )
}

/* ============================================
   TOKENS SECTIONS
   ============================================ */

function ColorsSection() {
  const colors = [
    { name: 'brand', value: '#db013a', class: 'bg-brand' },
    { name: 'brand-dark', value: '#6f001c', class: 'bg-brand-dark' },
    { name: 'brand-light', value: '#ff1a4f', class: 'bg-brand-light' },
    { name: 'whatsapp', value: '#25D366', class: 'bg-whatsapp' },
    { name: 'surface', value: '#0a0a0a', class: 'bg-surface' },
    { name: 'surface-elevated', value: '#141414', class: 'bg-surface-elevated' },
  ]

  return (
    <SectionWrapper
      id="colors"
      title="Colors"
      description="Paleta de colores definida en Tailwind config."
    >
      <Card variant="solid" hover={false}>
        <div className="grid gap-4 sm:grid-cols-3">
          {colors.map((color) => (
            <div key={color.name} className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${color.class}`} />
              <div>
                <p className="text-sm font-medium text-white">{color.name}</p>
                <p className="font-mono text-xs text-gray-500">{color.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <CodeBlock>{`// tailwind.config.ts
colors: {
  brand: { DEFAULT: '#db013a', dark: '#6f001c', light: '#ff1a4f' },
  whatsapp: { DEFAULT: '#25D366', dark: '#128C7E' },
  surface: { DEFAULT: '#0a0a0a', elevated: '#141414' },
}

// Uso
<div className="bg-brand text-white">...</div>
<div className="hover:bg-brand-dark">...</div>`}</CodeBlock>
    </SectionWrapper>
  )
}

function TypographySection() {
  return (
    <SectionWrapper
      id="typography"
      title="Typography"
      description="Fuentes y escalas tipográficas."
    >
      <Card variant="solid" hover={false}>
        <div className="space-y-4">
          <div>
            <span className="mb-1 block font-mono text-xs text-gray-500">
              font-montserrat
            </span>
            <p className="font-montserrat text-2xl font-bold text-white">
              Montserrat Bold - Títulos
            </p>
          </div>
          <div>
            <span className="mb-1 block font-mono text-xs text-gray-500">font-opensans</span>
            <p className="font-opensans text-base text-gray-300">
              Open Sans Regular - Cuerpo de texto y descripciones.
            </p>
          </div>
        </div>
      </Card>
      <CodeBlock>{`// tailwind.config.ts
fontFamily: {
  montserrat: ['Montserrat', 'sans-serif'],
  opensans: ['Open Sans', 'sans-serif'],
}

// Uso
<h1 className="font-montserrat font-bold">Título</h1>
<p className="font-opensans">Texto</p>`}</CodeBlock>
    </SectionWrapper>
  )
}
