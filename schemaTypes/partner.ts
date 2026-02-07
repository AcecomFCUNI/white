import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const partner = defineType({
  name: 'partner',
  title: 'Partner / Alliance',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedString',
      description: 'Short description of the partnership',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'type',
      title: 'Partnership Type',
      type: 'string',
      options: {
        list: [
          { title: 'Strategic Alliance', value: 'alliance' },
          { title: 'Sponsor', value: 'sponsor' },
          { title: 'Academic Partner', value: 'academic' },
          { title: 'Technical Partner', value: 'technical' },
        ],
        layout: 'radio',
      },
      initialValue: 'alliance',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Partner',
      type: 'boolean',
      description: 'Show prominently on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      media: 'logo',
    },
    prepare({ title, type, media }) {
      const typeLabels: Record<string, string> = {
        alliance: 'Alianza',
        sponsor: 'Sponsor',
        academic: 'Académico',
        technical: 'Técnico',
      }
      return {
        title,
        subtitle: typeLabels[type] || type,
        media,
      }
    },
  },
})
