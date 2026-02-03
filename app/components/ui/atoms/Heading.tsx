import { cn } from '~/lib/utils'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

interface HeadingProps {
  children: React.ReactNode
  level?: HeadingLevel
  size?: 'xl' | 'lg' | 'md' | 'sm'
  className?: string
  highlight?: string
}

/**
 * Heading - Section heading component with consistent typography
 *
 * Sizes:
 * - xl: text-4xl/5xl (main hero titles)
 * - lg: text-3xl/4xl (section titles)
 * - md: text-2xl/3xl (subsection titles)
 * - sm: text-xl/2xl (card titles)
 *
 * Use `highlight` prop to wrap part of text in brand color:
 * <Heading highlight="Chasqui">Proyecto Chasqui II</Heading>
 */
export function Heading({
  children,
  level = 'h2',
  size = 'lg',
  className,
  highlight,
}: HeadingProps) {
  const Component = level

  const sizes = {
    xl: 'text-4xl font-bold md:text-5xl',
    lg: 'text-3xl font-bold md:text-4xl',
    md: 'text-2xl font-bold md:text-3xl',
    sm: 'text-xl font-semibold md:text-2xl',
  }

  const baseStyles = 'font-montserrat text-white'

  const renderContent = () => {
    if (!highlight || typeof children !== 'string') {
      return children
    }

    const parts = children.split(highlight)
    if (parts.length === 1) {
      return children
    }

    return (
      <>
        {parts[0]}
        <span className="text-brand">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    )
  }

  return (
    <Component className={cn(baseStyles, sizes[size], className)}>
      {renderContent()}
    </Component>
  )
}
