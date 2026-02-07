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
    category,
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

export const NEWS_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    category,
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
// PRODUCTS QUERIES
// ============================================

export const HOME_PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && showOnHome == true] | order(order asc) [0...3] {
    _id,
    name,
    price,
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

// ============================================
// TEAM QUERIES
// ============================================

export const TEAM_LEADERSHIP_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember" && isLeadership == true] | order(order asc) {
    _id,
    name,
    slug,
    role,
    quote,
    photo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    email,
    linkedin
  }
`)

export const TEAM_MEMBERS_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember" && isLeadership != true] | order(area asc, order asc) {
    _id,
    name,
    role,
    area,
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
