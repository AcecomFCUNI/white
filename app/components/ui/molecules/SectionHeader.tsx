/**
 * SectionHeader Molecule
 *
 * Reusable header pattern for page sections.
 * Combines Badge, Heading with highlight, and optional description.
 *
 * Usage:
 * <SectionHeader
 *   badge="Our Team"
 *   title="Together we build the"
 *   highlight="future"
 *   description="Optional description text"
 * />
 */

import { Badge } from '../atoms'
import { FadeInView } from '~/components/animations/FadeInView'

interface SectionHeaderProps {
  /** Badge text shown above the title */
  badge?: string
  /** Main title text */
  title: string
  /** Highlighted word/phrase (shown in brand color) */
  highlight?: string
  /** Optional description below the title */
  description?: string
  /** Text alignment */
  align?: 'left' | 'center'
  /** Whether to animate the elements */
  animated?: boolean
  /** Custom class for the container */
  className?: string
}

export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  animated = true,
  className = ''
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const maxWidthClass = description && align === 'center' ? 'mx-auto max-w-2xl' : ''

  const content = (
    <div className={`${alignClass} ${className}`}>
      {badge && (
        <Wrapper animated={animated} delay={0}>
          <Badge className="mb-4">{badge}</Badge>
        </Wrapper>
      )}
      <Wrapper animated={animated} delay={0.1}>
        <h2 className="mb-6 font-montserrat text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {title}
          {highlight && (
            <>
              {' '}
              <span className="text-brand">{highlight}</span>
            </>
          )}
        </h2>
      </Wrapper>
      {description && (
        <Wrapper animated={animated} delay={0.2}>
          <p className={`text-gray-300 ${maxWidthClass}`}>{description}</p>
        </Wrapper>
      )}
    </div>
  )

  return content
}

interface WrapperProps {
  animated: boolean
  delay: number
  children: React.ReactNode
}

function Wrapper({ animated, delay, children }: WrapperProps) {
  if (!animated) {
    return <>{children}</>
  }
  return (
    <FadeInView direction="up" delay={delay}>
      {children}
    </FadeInView>
  )
}
