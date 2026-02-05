import { defineQuery } from 'groq'

// ============================================
// NEWS QUERIES
// ============================================

export const NEWS_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    category->{
      _id,
      title,
      slug,
      color
    }
  }
`)

export const NEWS_FEATURED_QUERY = defineQuery(/* groq */ `
  *[_type == "news" && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    category->{
      _id,
      title,
      slug,
      color
    }
  }
`)

export const NEWS_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    category->{
      _id,
      title,
      slug,
      color
    }
  }
`)

export const NEWS_CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "newsCategory"] | order(title.es asc) {
    _id,
    title,
    slug,
    color
  }
`)

// ============================================
// PRODUCTS QUERIES
// ============================================

export const PRODUCTS_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "product"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    price,
    inStock,
    featured,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    gallery[] {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    }
  }
`)

export const PRODUCT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    price,
    inStock,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    }
  }
`)

// ============================================
// SUBSYSTEMS QUERIES
// ============================================

export const SUBSYSTEMS_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "subsystem"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    status,
    progress,
    details[] {
      label
    }
  }
`)

export const SUBSYSTEM_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "subsystem" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    fullDescription,
    icon,
    status,
    progress,
    details[] {
      label
    },
    gallery[] {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      caption
    }
  }
`)

// ============================================
// PARTNERS QUERIES
// ============================================

export const PARTNERS_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    type,
    website,
    featured,
    logo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`)

export const PARTNERS_FEATURED_QUERY = defineQuery(/* groq */ `
  *[_type == "partner" && featured == true] | order(order asc) {
    _id,
    name,
    slug,
    description,
    type,
    website,
    logo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`)

// ============================================
// TEAM QUERIES
// ============================================

export const TEAM_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    slug,
    role,
    area,
    bio,
    isLeadership,
    photo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    linkedin
  }
`)

export const TEAM_LEADERSHIP_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember" && isLeadership == true] | order(order asc) {
    _id,
    name,
    slug,
    role,
    area,
    bio,
    photo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    linkedin
  }
`)

export const TEAM_BY_AREA_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember" && area == $area] | order(order asc) {
    _id,
    name,
    slug,
    role,
    bio,
    photo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    linkedin
  }
`)
