import { type ComponentType } from 'react'
import { cn } from '~/lib/utils'

interface SubsystemCardProps {
  name: string
  description: string
  icon: ComponentType<{ className?: string }>
  className?: string
}

/**
 * SubsystemCard - Card for CubeSat subsystem display
 *
 * Uses the Card glass variant pattern:
 * - Glass background with backdrop blur
 * - Brand color hover on border
 * - Icon with brand tint background
 * - Compact layout (p-4)
 */
export function SubsystemCard({
  name,
  description,
  icon: Icon,
  className,
}: SubsystemCardProps) {
  return (
    <div
      className={cn(
        'group flex h-full flex-col rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl transition-all hover:border-brand/50 hover:bg-black/50',
        className
      )}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 transition-colors group-hover:bg-brand/20">
        <Icon className="h-5 w-5 text-brand" />
      </div>
      <h3 className="mb-1 font-montserrat text-sm font-semibold text-white">
        {name}
      </h3>
      <p className="mt-auto text-xs text-gray-300">{description}</p>
    </div>
  )
}
