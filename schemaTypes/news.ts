import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Brief summary for cards and previews',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localizedRichText',
      description: 'Full article content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Lanzamiento', value: 'launch' },
          { title: 'Evento', value: 'event' },
          { title: 'Logro', value: 'achievement' },
          { title: 'Alianza', value: 'partnership' },
          { title: 'Técnico', value: 'technical' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Show this article prominently on the news page',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.es',
      category: 'category',
      media: 'image',
      date: 'publishedAt',
    },
    prepare({ title, category, media, date }) {
      const categoryLabels: Record<string, string> = {
        launch: 'Lanzamiento',
        event: 'Evento',
        achievement: 'Logro',
        partnership: 'Alianza',
        technical: 'Técnico',
      }
      const formattedDate = date
        ? new Date(date).toLocaleDateString('es-PE')
        : 'Sin fecha'
      return {
        title,
        subtitle: `${categoryLabels[category] || 'Sin categoría'} • ${formattedDate}`,
        media,
      }
    },
  },
})
