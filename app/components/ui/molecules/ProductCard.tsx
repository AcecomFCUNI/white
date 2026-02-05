import { useState } from 'react'
import { cn } from '~/lib/utils'
import { LinkButton } from '../atoms/Button'

interface ProductCardProps {
  name: string
  description?: string
  price: number
  /** Main product image */
  imageUrl?: string
  /** Additional gallery images for carousel */
  gallery?: string[]
  inStock?: boolean
  buyLink?: string
  buyLabel?: string
  outOfStockLabel?: string
  className?: string
}

/**
 * ProductCard - Card component for shop products
 *
 * Features:
 * - Image carousel when multiple images available
 * - Square image with hover zoom effect
 * - Product name and description
 * - Price display
 * - WhatsApp buy button or out of stock badge
 */
export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  gallery = [],
  inStock = true,
  buyLink,
  buyLabel = 'Comprar',
  outOfStockLabel = 'Agotado',
  className,
}: ProductCardProps) {
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%231f2937' width='300' height='300'/%3E%3Ctext fill='%236b7280' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='14'%3EImage not available%3C/text%3E%3C/svg%3E"

  // Combine main image with gallery
  const allImages = [imageUrl, ...gallery].filter(Boolean) as string[]
  const hasMultipleImages = allImages.length > 1

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-brand/50',
        className
      )}
    >
      {/* Image Carousel */}
      <div className="relative aspect-square overflow-hidden bg-gray-800">
        <img
          src={allImages[currentIndex] || placeholderImage}
          alt={`${name} - ${currentIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage
          }}
        />

        {/* Navigation arrows - only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); goToPrev() }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); goToNext() }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.preventDefault(); setCurrentIndex(index) }}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-brand w-3'
                      : 'bg-white/50 hover:bg-white/70'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 font-montserrat text-lg font-semibold text-white">
          {name}
        </h3>
        {description && (
          <p className="mb-3 flex-1 text-sm text-gray-400">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-brand">
            S/. {price.toFixed(2)}
          </span>
          {inStock ? (
            buyLink && (
              <LinkButton
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {buyLabel}
              </LinkButton>
            )
          ) : (
            <span className="rounded-full bg-gray-700 px-4 py-2 text-sm text-gray-400">
              {outOfStockLabel}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
