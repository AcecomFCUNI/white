import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const subsystem = defineType({
  name: 'subsystem',
  title: 'Subsystem',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'localizedText',
      description: 'Brief description for cards',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'localizedRichText',
      description: 'Detailed description for the subsystem page',
    }),
    defineField({
      name: 'details',
      title: 'Technical Details',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localizedString',
            }),
          ],
          preview: {
            select: {
              title: 'label.es',
            },
          },
        }),
      ],
      description: 'Key technical specifications (shown as bullet points)',
    }),
    defineField({
      name: 'status',
      title: 'Development Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'In Development', value: 'development' },
          { title: 'Testing', value: 'testing' },
          { title: 'Complete', value: 'complete' },
        ],
        layout: 'radio',
      },
      initialValue: 'development',
    }),
    defineField({
      name: 'progress',
      title: 'Progress (%)',
      type: 'number',
      validation: (rule) => rule.min(0).max(100),
      initialValue: 0,
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'localizedString',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in the subsystems list',
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
      title: 'name.es',
      status: 'status',
      progress: 'progress',
    },
    prepare({ title, status, progress }) {
      const statusLabels: Record<string, string> = {
        planning: '📋 Planning',
        development: '🔧 Development',
        testing: '🧪 Testing',
        complete: '✅ Complete',
      }
      return {
        title,
        subtitle: `${statusLabels[status] || status} • ${progress}%`,
      }
    },
  },
})
