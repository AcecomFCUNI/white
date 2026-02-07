import { cn } from '~/lib/utils'
import { Image } from '../atoms/Image'

interface TeamMemberCardProps {
  name: string
  role: string
  quote?: string
  photoUrl?: string
  email?: string
  linkedin?: string
  className?: string
}

/**
 * TeamMemberCard - Card for leadership/team member display
 *
 * Features:
 * - Circular photo with brand border on hover
 * - Name and role
 * - Motivational quote
 * - LinkedIn and email icon links
 * - Glass variant styling
 */
export function TeamMemberCard({
  name,
  role,
  quote,
  photoUrl,
  email,
  linkedin,
  className,
}: TeamMemberCardProps) {
  return (
    <div
      className={cn(
        'group flex h-full flex-col items-center rounded-xl border border-white/10 bg-black/40 p-6 text-center backdrop-blur-xl transition-all hover:border-brand/50 hover:bg-black/50',
        className
      )}
    >
      {/* Photo */}
      <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-white/10 transition-colors group-hover:border-brand/50">
        <Image
          src={photoUrl}
          alt={name}
          fallbackText="Foto"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name & Role */}
      <h3 className="mb-1 font-montserrat text-lg font-semibold text-white">
        {name}
      </h3>
      <p className="mb-3 text-sm text-brand">{role}</p>

      {/* Quote */}
      {quote && (
        <p className="mb-4 flex-1 text-sm italic text-gray-400">
          &ldquo;{quote}&rdquo;
        </p>
      )}

      {/* Social Links */}
      {(linkedin || email) && (
        <div className="flex gap-3">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-brand/50 hover:text-white"
              aria-label={`LinkedIn de ${name}`}
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-brand/50 hover:text-white"
              aria-label={`Email de ${name}`}
            >
              <EmailIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}
