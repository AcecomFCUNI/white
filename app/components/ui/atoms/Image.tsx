import { useState, useEffect, type ImgHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string
  alt: string
  width?: number
  quality?: number
  fallbackText?: string
}

const SANITY_CDN = 'cdn.sanity.io'

function getSanitySrc(src: string, width?: number, quality?: number): string {
  if (!src.includes(SANITY_CDN)) return src
  const params = new URLSearchParams()
  if (width) params.set('w', String(width))
  params.set('auto', 'format')
  if (quality) params.set('q', String(quality))
  const separator = src.includes('?') ? '&' : '?'
  return `${src}${separator}${params.toString()}`
}

function buildPlaceholder(w: number, h: number, text: string): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'%3E%3Crect fill='%231f2937' width='${w}' height='${h}'/%3E%3Ctext fill='%236b7280' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='14'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`
}

export function Image({
  src,
  alt,
  width,
  quality = 80,
  fallbackText = 'Image not available',
  className,
  loading = 'lazy',
  ...props
}: ImageProps) {
  const [hasError, setHasError] = useState(false)

  // Reset error state when src changes (e.g., carousel navigation)
  useEffect(() => {
    setHasError(false)
  }, [src])

  const placeholder = buildPlaceholder(width || 300, width || 300, fallbackText)
  const resolvedSrc = hasError || !src
    ? placeholder
    : getSanitySrc(src, width, quality)

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={cn(className)}
      loading={loading}
      onError={() => setHasError(true)}
      {...props}
    />
  )
}
