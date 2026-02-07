import type { PortableTextBlock } from '@portabletext/react'

// Base types

export interface LocalizedString {
  es: string
  en: string
}

export interface LocalizedOptionalString {
  es?: string
  en?: string
}

export interface SanityImage {
  asset: {
    _id: string
    url: string
  }
}

export interface SanitySlug {
  current: string
}

// Document types

export interface SanityNews {
  _id: string
  title: LocalizedOptionalString
  slug: SanitySlug
  excerpt: LocalizedOptionalString
  publishedAt: string
  featured: boolean
  category?: string
  image?: SanityImage
}

export interface SanityNewsDetail extends SanityNews {
  body: {
    es?: PortableTextBlock[]
    en?: PortableTextBlock[]
  }
}

export interface SanityProduct {
  _id: string
  name: LocalizedString
  slug: SanitySlug
  description: LocalizedString
  price: number
  inStock: boolean
  featured: boolean
  image?: SanityImage
  gallery?: SanityImage[]
}

export interface HomeProduct {
  _id: string
  name: LocalizedString
  price: number
  image?: SanityImage
  gallery?: SanityImage[]
}

export interface SanityTeamLeader {
  name: string
  role: LocalizedString
  quote?: LocalizedString
  photo?: SanityImage
  email?: string
  linkedin?: string
}

export interface SanityTeamMember {
  name: string
  role: LocalizedString
  area: string
  photo?: SanityImage
  linkedin?: string
}
