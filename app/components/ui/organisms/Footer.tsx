/**
 * Footer Organism
 *
 * Site footer with:
 * - Logo and tagline
 * - Social media links (using IconLink atoms)
 * - Copyright
 *
 * Composed of atoms following Atomic Design.
 */

import { useTranslation } from 'react-i18next'
import { IconLink } from '../atoms'
import { CONTACT, SITE } from '~/lib/constants'

interface FooterProps {
  className?: string
}

export function Footer({ className = '' }: FooterProps) {
  const { t } = useTranslation()

  return (
    <footer className={`border-t border-gray-800 py-12 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo and description */}
          <div className="text-center md:text-left">
            <div className="mb-2 flex items-center justify-center gap-3 md:justify-start">
              <img
                src="/assets/img/logo.png"
                alt={SITE.name}
                className="h-8 w-8"
              />
              <span className="font-montserrat text-lg font-bold text-white">
                {SITE.name.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-300">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <SocialLink
              href={CONTACT.facebook}
              label="Facebook"
              icon={<FacebookIcon />}
            />
            <SocialLink
              href={CONTACT.instagram}
              label="Instagram"
              icon={<InstagramIcon />}
            />
            <SocialLink
              href={CONTACT.linkedin}
              label="LinkedIn"
              icon={<LinkedInIcon />}
            />
            <SocialLink
              href={CONTACT.youtube}
              label="YouTube"
              icon={<YouTubeIcon />}
            />
            <SocialLink
              href={CONTACT.tiktok}
              label="TikTok"
              icon={<TikTokIcon />}
            />
            <SocialLink
              href={CONTACT.kick}
              label="Kick"
              icon={<KickIcon />}
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  label: string
  icon: React.ReactNode
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <IconLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      variant="outline"
      size="md"
    >
      {icon}
    </IconLink>
  )
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

function KickIcon() {
  return (
    <svg className="h-5 w-auto" viewBox="0 0 267 300" fill="currentColor">
      <path d="M0 0H100V66.6667H133.333V33.3333H166.667V0H266.667V100H233.333V133.333H200V166.667H233.333V200H266.667V300H166.667V266.667H133.333V233.333H100V300H0V0Z" />
    </svg>
  )
}
