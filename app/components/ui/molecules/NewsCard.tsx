import { Link } from '@remix-run/react'
import { cn } from '~/lib/utils'

interface NewsCardProps {
  title: string
  excerpt?: string
  imageUrl?: string
  href: string
  category?: {
    name: string
    color?: 'purple' | 'blue' | 'green' | 'yellow' | 'red'
  }
  publishedAt?: string
  readMoreLabel?: string
  className?: string
  /** Featured variant: larger layout with side-by-side content */
  featured?: boolean
}

// Color styles for category badges (only affects color, not size)
const categoryColors: Record<string, string> = {
  purple: 'bg-purple-500/45 text-purple-400',
  blue: 'bg-blue-500/45 text-blue-400',
  green: 'bg-green-500/45 text-green-400',
  yellow: 'bg-yellow-500/45 text-yellow-400',
  red: 'bg-red-500/45 text-red-400',
}

/**
 * NewsCard - Card component for news articles
 *
 * Features:
 * - Image with hover zoom effect
 * - Category badge with color positioned at top-right
 * - Title and excerpt
 * - Formatted date
 * - Read more link
 * - Featured variant for highlighted articles
 */
export function NewsCard({
  title,
  excerpt,
  imageUrl,
  href,
  category,
  publishedAt,
  readMoreLabel = 'Leer más',
  className,
  featured = false,
}: NewsCardProps) {
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect fill='%231f2937' width='400' height='225'/%3E%3Ctext fill='%236b7280' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='14'%3EImage not available%3C/text%3E%3C/svg%3E"

  const badgeColorClass = category?.color ? categoryColors[category.color] : categoryColors.purple

  if (featured) {
    return (
      <Link
        to={href}
        className={cn(
          'group block overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-brand/50',
          className
        )}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-video overflow-hidden bg-gray-800 md:aspect-auto md:h-full">
            <img
              src={imageUrl || placeholderImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = placeholderImage
              }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            {category && (
              <span
                className={cn(
                  'mb-4 w-fit rounded-full px-3 py-1 text-xs font-semibold',
                  badgeColorClass
                )}
              >
                {category.name}
              </span>
            )}
            <h2 className="mb-3 font-montserrat text-2xl font-bold text-white md:text-3xl">
              {title}
            </h2>
            {excerpt && (
              <p className="mb-4 text-gray-400">
                {excerpt}
              </p>
            )}
            <div className="flex items-center justify-between">
              {publishedAt && (
                <time className="text-sm text-gray-500">
                  {publishedAt}
                </time>
              )}
              <span className="text-brand transition-colors group-hover:text-brand-light">
                {readMoreLabel} &rarr;
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={href}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-brand/50',
        className
      )}
    >
      {/* Image with badge */}
      <div className="relative aspect-video overflow-hidden bg-gray-800">
        <img
          src={imageUrl || placeholderImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage
          }}
        />
        {category && (
          <span
            className={cn(
              'absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold',
              badgeColorClass
            )}
          >
            {category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 font-montserrat text-lg font-semibold text-white line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="mb-3 flex-1 text-sm text-gray-400 line-clamp-3">
            {excerpt}
          </p>
        )}
        <div className="flex items-center justify-between">
          {publishedAt && (
            <time className="text-xs text-gray-500">
              {publishedAt}
            </time>
          )}
          <span className="text-sm text-brand transition-colors group-hover:text-brand-light">
            {readMoreLabel} &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
